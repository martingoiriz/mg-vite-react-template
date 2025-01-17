import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CONTEXT_ACTIONS } from "constants";
import { ErrorPage, Home, Login, RecoverAccount, Root, SignUp } from "pages";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect, useReducer, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { AppContext, initialState, reducer } from "services/context";
import { localStorageGet } from "utils";

import { ToastProvider } from "./components/Toast/ToastProvider";

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
        <Route path="recover" element={<RecoverAccount />} index />
        <Route path="home" element={<Home />} index />
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
