import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import { useGeoLocation } from "../../hooks/useGeoLocation";
import { useDispatch, useSelector } from "react-redux";
import {
  getCitiesState,
  getCurrentCityState,
  selectCurrentPosition,
  setPosition,
} from "./citiesSlice";

export default function Map() {
  // const { cities, currentCity, isPositionShown, dispatch } = useSelector(getCitiesState);
  const cities = useSelector(getCitiesState);
  const currentCity = useSelector(getCurrentCityState);
  const { isShown: isPositionShown } = useSelector(selectCurrentPosition);

  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const [mapPostion, setMapPostion] = useState([40, 0]);
  // const [isPositionShown, setisPositionShown] = useState(false);
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    error: geoLocationError,
    getPosition,
  } = useGeoLocation();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  // console.log(lat, lng);

  useEffect(
    function () {
      if (lat && lng) {
        setMapPostion([lat, lng]);
      }
    },
    [lat, lng]
  );

  useEffect(
    function () {
      if (geoLocationPosition) {
        setMapPostion([geoLocationPosition.lat, geoLocationPosition.lng]);
        dispatch(setPosition(true));
      }
    },
    [geoLocationPosition]
  );

  // console.log(geoLocationPosition, mapPostion, currentCity, isPositionShown);
  // console.log(cities);
  console.log(mapPostion);
  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type={"position"} onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "get your position"}
        </Button>
      )}
      {geoLocationPosition &&
        Object.keys(currentCity).length > 0 &&
        !isPositionShown && (
          <Button
            type={"position"}
            onClick={() => {
              setMapPostion([geoLocationPosition.lat, geoLocationPosition.lng]);
              dispatch(setPosition(true));
            }}
          >
            go to your position
          </Button>
        )}

      <MapContainer
        center={mapPostion}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          const { position } = city;
          const [lat, lng] = position.split(",").map((el) => el.trim());

          return (
            <Marker key={city.id} position={[lat, lng]} riseOnHover>
              <Popup>
                <span>{city.emoji}</span>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPostion} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  // const { cityToUpdate, dispatch } = useCities();

  useMapEvent({
    click: (e) => {
      // if (Object.keys(cityToUpdate).length > 0) {
      //   dispatch({ type: "city/cancelUpdate" });
      // }

      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
