import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import AppLayout from "./ui/AppLayout";
import { CitiesProvider } from "./contexts/CitiesContext";
import CountryList from "./features/countries/CountryList";
import CityDetails from "./features/cityDetails/CityDetails";

import Signup from "./features/authentication/Signup";
import Login from "./features/authentication/Login";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./ui/ProtectedRoute";
import Cities from "./pages/Cities";
import CreateCityForm from "./features/cities/CreateCityForm";
import UpdateCity from "./pages/UpdateCity";
import Stats from "./features/stats/Stats";

export default function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="cities" replace />} />
              <Route path="cities" element={<Cities />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="cities/:cityId" element={<CityDetails />} />
              <Route path="cities/:id/update" element={<UpdateCity />} />
              <Route path="form" element={<CreateCityForm />} />
              <Route path="stats" element={<Stats />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}
