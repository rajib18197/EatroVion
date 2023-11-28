import { createContext, useContext, useEffect, useReducer } from "react";

const CitiesContext = createContext();

const initialState = {
  isLoading: false,
  error: "",
  cities: [],
  currentCity: {},
  cityToUpdate: {},
  isPositionShown: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true, error: "" };

    case "error":
      return { ...state, isLoading: false, error: action.payload };

    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
        isPositionShown: false,
      };

    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
        currentCity: action.payload,
        isPositionShown: false,
      };

    case "city/updated":
      const updatedCities = state.cities.map((city) =>
        city.id === action.payload.id ? action.payload : city
      );
      return {
        ...state,
        isLoading: false,
        cities: updatedCities,
        currentCity: action.payload,
        cityToUpdate: {},
        isPositionShown: false,
      };

    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false,
      };

    case "city/update":
      return { ...state, cityToUpdate: action.payload };

    case "city/cancelUpdate":
      return { ...state, cityToUpdate: {} };

    case "position/isShown":
      return { ...state, isPositionShown: action.payload };
  }
}

const BASE_URL = "https://restaurantlistings.onrender.com";

function CitiesProvider({ children }) {
  const [
    { isLoading, error, cities, currentCity, cityToUpdate, isPositionShown },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        // console.log(data);

        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        dispatch({ type: "error", payload: err.message });
        console.error(err);
      }
    }

    fetchCities();
  }, []);

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;

    dispatch({ type: "loading" });

    try {
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await response.json();

      dispatch({ type: "city/loaded", payload: data });
    } catch (err) {
      console.error(err);
      dispatch({ type: "error", payload: err.message });
    }
  }

  async function createUpdateCity(newCity) {
    dispatch({ type: "loading" });
    try {
      if (Object.keys(cityToUpdate).length > 0) {
        const response = await fetch(`${BASE_URL}/cities/${cityToUpdate.id}`, {
          method: "PUT",
          body: JSON.stringify(newCity),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        const dataUp = cities.map((city) =>
          city.id === data.id ? data : city
        );

        dispatch({ type: "city/updated", payload: data });
        return;
      }

      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      dispatch({ type: "city/created", payload: data });
    } catch (err) {
      console.error(err);
      dispatch({ type: "error", payload: err.message });
    }
  }

  async function removeCity(id) {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      dispatch({ type: "error", payload: err.message });
      console.error(err);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        currentCity,
        cityToUpdate,
        dispatch,
        getCity,
        isLoading,
        error,
        createUpdateCity,
        removeCity,
        isPositionShown,
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

// export const fetchCity = createAsyncThunk(
//   "cities/fetchCity",
//   async ({ requestName, requestFn, ...rest }, { dispatch }) => {
//     console.log(requestName);
//     dispatch(requestStarted(requestName));
//     try {
//       const data = await requestFn({ ...rest });
//       dispatch(requestSuccess(requestName));
//       return data;
//     } catch (err) {
//       dispatch(requestFailed(requestName));
//     }
//   }
// );

// 💨
// Thanks so much for giving my newsletter a chance. I'm super excited to welcome you aboard!

// The goal of artificial intelligence is to replace boring repetitive jobs, so humans can concentrate on doing what they do best: thinking, creating, and dreaming up new ideas
