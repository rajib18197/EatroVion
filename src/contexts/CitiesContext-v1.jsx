import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:9000";

function CitiesProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState({});
  const [cityToUpdate, setCityToUpdate] = useState({});
  const [hasPositionShown, setHasPositionShown] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        console.log(data);
        setCities(data);
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
        console.error(err);
        alert("error");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    try {
      setIsLoading(true);
      setError("");
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
      setHasPositionShown(false);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function createUpdateCity(newCity) {
    try {
      setIsLoading(true);
      setError("");
      if (Object.keys(cityToUpdate).length > 0) {
        const res = await fetch(`${BASE_URL}/cities/${cityToUpdate.id}`, {
          method: "PUT",
          body: JSON.stringify(newCity),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log(data);
        const dataUp = cities.map((city) =>
          city.id === data.id ? data : city
        );

        setCities(dataUp);
        setCurrentCity(data);
        setHasPositionShown(false);
        setCityToUpdate({});
        return;
      }

      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCities((cities) => [...cities, data]);
      setCurrentCity(data);
      setHasPositionShown(false);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function removeCity(id) {
    try {
      setIsLoading(true);
      setError("");
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (err) {
      setError(err);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        currentCity,
        cityToUpdate,
        setCityToUpdate,
        getCity,
        isLoading,
        error,
        createUpdateCity,
        removeCity,
        hasPositionShown,
        setHasPositionShown,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("context was used in outside of the provider!");
  return context;
}

export { CitiesProvider, useCities };
