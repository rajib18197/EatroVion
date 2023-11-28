import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// https://stackoverflow.com/questions/65849464/react-and-redux-proper-way-to-store-loading-state-in-redux
// Not a good design
// const initialState = {
//   cities: {
//     result: [],
//     isLoading: false,
//     isError: false,
//     error: null,
//   },

//   currentCity: {
//     result: {},
//     isLoading: false,
//     isError: false,
//     error: null,
//   },

//   createCity: {
//     isLoading: false,
//     isError: false,
//     error: null,
//   },

//   // ... updateCity, deleteCity
// };

const initialState = {
  // { name: "fetchAllCities", inProgress: false, error: null }
  requests: [],

  cities: [],
  currentCity: {},
  cityToUpdate: null,
  currentPosition: {
    isShown: false,
  },
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    requestStarted(state, action) {
      state.requests.push({
        name: action.payload,
        inProgress: true,
        error: null,
      });
    },

    requestSuccess(state, action) {
      state.requests = state.requests.filter(
        (req) => req.name !== action.payload
      );
    },

    requestFailed(state, action) {
      const failedRequest = state.requests.find(
        (req) => req.name === action.payload.requestName
      );
      failedRequest.inProgress = false;
      failedRequest.error = action.payload.error;
    },

    updatingCity(state, action) {
      state.cityToUpdate = action.payload;
    },

    setPosition(state, action) {
      state.currentPosition.isShown = action.payload;
    },

    resetCurrentCity(state) {
      state.currentCity = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchCities.fulfilled, (state, action) => {
      state.cities = action.payload;
    });

    builder.addCase(fetchCity.fulfilled, (state, action) => {
      state.currentCity = action.payload;
      state.currentPosition.isShown = false;
    });

    builder.addCase(updateCity.fulfilled, (state, action) => {
      state.currentCity = action.payload;
      state.currentPosition.isShown = false;
      state.cityToUpdate = null;
    });

    builder.addCase(deleteCity.fulfilled, (state, action) => {
      // console.log(action);
      const cityToDeleteIndex = state.cities.findIndex(
        (city) => city.id === Number(action.meta.id)
      );
      state.cities.splice(cityToDeleteIndex, 1);
      state.currentPosition.isShown = false;
    });
  },
});

export const {
  requestStarted,
  requestSuccess,
  requestFailed,
  updatingCity,
  setPosition,
  resetCurrentCity,
} = citiesSlice.actions;

export default citiesSlice.reducer;

export const getCitiesState = (state) => state.cities.cities;
export const selectCityToUpdate = (state) => state.cities.cityToUpdate;
export const selectCurrentPosition = (state) => state.cities.currentPosition;

export const getCurrentCityState = (state) => state.cities.currentCity;

export const requestStatus = (state, requestName) => {
  const request = state.cities.requests.find((req) => req.name === requestName);
  return request || undefined;
};

// Async Thunks

export async function helperRequest(
  { requestName, requestFn, ...rest },
  { dispatch, rejectWithValue }
) {
  dispatch(requestStarted(requestName));

  try {
    const data = await requestFn({ ...rest });
    dispatch(requestSuccess(requestName));

    // console.log(data);
    return data;
  } catch (err) {
    dispatch(
      requestFailed({
        requestName,
        error: { message: err.message, code: err.code },
      })
    );

    // can not be dispatch with err object as it is non-serializable value;
    return rejectWithValue("error occured now");
  }
}

// prettier-ignore
export const fetchCities = createAsyncThunk("cities/fetchCities", helperRequest);

export const fetchCity = createAsyncThunk("cities/fetchCity", helperRequest);

// prettier-ignore
export const createNewCity = createAsyncThunk("cities/createNewCity", helperRequest);

export const updateCity = createAsyncThunk("cities/updateCity", helperRequest);

export const deleteCity = createAsyncThunk("cities/deleteCity", helperRequest);
