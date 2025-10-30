import { AuthProvider } from "@/context/AuthContext";
import Login from "@/pages/auth/Login";
import ProtectedRoute from "@/pages/auth/ProtectedRoute";
import Signup from "@/pages/auth/Signup";
import Dashboard from "@/pages/Dashboard";
import Landingpage from "@/pages/Landingpage";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landingpage />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};

export default App;
