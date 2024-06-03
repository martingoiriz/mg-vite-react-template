import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorPage, Login, Root, SignUp } from "pages";
import { useReducer } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { AppContext, initialState, reducer } from "services/context";

import { ToastProvider } from "./components/Toast/ToastProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route element={<Navigate replace to="/login" />} index />
      <Route path="login" element={<Login />} index />
      <Route path="signup" element={<SignUp />} index />
    </Route>
  )
);

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ dispatch, state }}>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ToastProvider>
    </AppContext.Provider>
  );
};

export default App;
