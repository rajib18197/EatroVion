import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  requests: [],

  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },

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
  },

  extraReducers: (builder) => {
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.user = action.payload.user.user_metadata;
      state.user.user_id = action.payload.user.id;
      state.isAuthenticated = true;
    });
    // 4782da47-6204-4dab-9b95-1778575b83bf

    builder.addCase(logoutUser.fulfilled, (state, action) => {
      console.log(action);
      state.user = null;
      state.isAuthenticated = false;
    });

    builder.addCase(getUser.fulfilled, (state, action) => {
      console.log(action.payload);
      console.log(state.isAuthenticated);
      if (action.payload === "not-authorized-user") {
        state.user = null;
        state.isAuthenticated = "not-authorized-user";
      } else {
        state.user = action.payload.user_metadata;
        state.user.user_id = action.payload.id;
        state.isAuthenticated = true;
      }
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log(action);
      state.user = action.payload.user.user_metadata;
      state.user.user_id = action.payload.user.id;
      state.isAuthenticated = true;
    });
  },
});

export const { login, logout, requestStarted, requestSuccess, requestFailed } =
  authSlice.actions;

export default authSlice.reducer;

export const authState = (state) => state.auth;

export const getAuthRequestStatus = (state, requestName) => {
  const request = state.auth.requests.find((req) => req.name === requestName);
  return request || {};
};

export async function helperRequest(
  { requestName, requestFn, ...rest },
  { dispatch, rejectWithValue }
) {
  dispatch(requestStarted(requestName));

  try {
    const data = await requestFn({ ...rest });
    dispatch(requestSuccess(requestName));
    return data;
  } catch (err) {
    console.log(err);
    requestFailed({
      requestName,
      error: { message: err.message },
    });

    return rejectWithValue("error auth");
  }
}

export const signUpUser = createAsyncThunk("auth/signUpUser", helperRequest);
export const loginUser = createAsyncThunk("auth/loginUser", helperRequest);
export const logoutUser = createAsyncThunk("auth/logoutUser", helperRequest);
export const getUser = createAsyncThunk("auth/getUser", helperRequest);
