import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CONTEXT_ACTIONS } from "Constants";
import { ErrorPage, Home, LeftMenu, Login, Preferences, RecoverAccount, Root, SignUp } from "Pages";
import { useEffect, useReducer, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { AppContext, initialState, reducer } from "Services/context";
import { localStorageGet } from "Utils";

import { ToastProvider } from "./Components/Toast/ToastProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const buildBrowserRouter = (redirectPath: string) =>
  createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
        <Route element={<Navigate replace to={redirectPath} />} index />
        <Route path="login" element={<Login />} index />
        <Route path="signup" element={<SignUp />} index />
        <Route path="reset-password" element={<RecoverAccount />} index />
        <Route
          path="home"
          element={
            <LeftMenu>
              <Home />
            </LeftMenu>
          }
          index
        />
        <Route
          path="preferences"
          element={
            <LeftMenu>
              <Preferences />
            </LeftMenu>
          }
          index
        />
      </Route>
    )
  );

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const userData = localStorageGet("userData");
    if (userData) {
      dispatch({ payload: userData, type: CONTEXT_ACTIONS.SET_USER_DATA });
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const router = buildBrowserRouter(isLoggedIn ? "/home" : "/login");

  if (isLoggedIn === null) return null;

  return (
    <GoogleOAuthProvider clientId="849588346288-mour2m1tmci3b6ktqb39dg9k8oi2951j.apps.googleusercontent.com">
      <AppContext.Provider value={{ dispatch, state }}>
        <ToastProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </ToastProvider>
      </AppContext.Provider>
    </GoogleOAuthProvider>
  );
};

export default App;
