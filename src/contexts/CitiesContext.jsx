import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:9000";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState({});
  const [cityToUpdate, setCityToUpdate] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasCityCreated, setHasCityCreated] = useState(false);

  // const isFormUpdated = Object.keys(formData).length > 0;
  // console.log(isFormUpdated);
  // console.log(formData);

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
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateCity(id) {
    try {
      setIsLoading(true);
    } catch (err) {}
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
        setCities,
        currentCity,
        setCurrentCity,
        cityToUpdate,
        setCityToUpdate,
        getCity,
        isLoading,
        setIsLoading,
        createUpdateCity,
        removeCity,
        hasCityCreated,
        setHasCityCreated,
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
