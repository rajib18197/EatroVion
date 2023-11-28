import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const url = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function useGeoCoding({
  isUpdateSession,
  setCityName,
  setCountry,
  setEmoji,
}) {
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState("");

  const [searchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  useEffect(
    function () {
      if (isUpdateSession) return;

      async function getCityDetails() {
        try {
          setIsLoadingGeoCoding(true);
          setGeoCodingError("");
          const res = await fetch(`${url}?latitude=${lat}&longitude=${lng}`);
          const data = await res.json();
          console.log(data);

          if (!data.countryCode) {
            throw new Error(
              "That does not seem to be a city. Click somewhere else"
            );
          }

          setCityName(data.city);
          setEmoji(data.countryCode);
          setCountry(data.countryName);
        } catch (err) {
          console.error(err);
          setGeoCodingError(err.message);
        } finally {
          setIsLoadingGeoCoding(false);
        }
      }

      getCityDetails();
    },
    [lat, lng]
  );

  return { isLoadingGeoCoding, geoCodingError, lat, lng };
}
