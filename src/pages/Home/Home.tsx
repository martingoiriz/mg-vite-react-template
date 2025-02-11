import { useMutation } from "@tanstack/react-query";
import { logoutUser, random } from "api";
import { useToast } from "components";
import { CONTEXT_ACTIONS } from "constants";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "services/context";
import { localStorageRemove } from "utils";
import { getErrorMessage } from "utils";

const Home = () => {
  const { dispatch } = useAppContext();

  const navigate = useNavigate();
  const { displayToast } = useToast();

  const logoutQuery = useMutation({
    mutationFn: logoutUser,
    mutationKey: ["logoutUser"],
    onError: (error) => {
      const message = getErrorMessage(error);
      displayToast({ content: message, type: "ERROR" });
    },
    onSuccess: () => {
      dispatch({
        data: null,
        type: CONTEXT_ACTIONS.CLEAR_USER_DATA,
      });
      localStorageRemove("userData");
      navigate("/login");
    },
  });

  const randomQuery = useMutation({
    mutationFn: random,
    mutationKey: ["randomQuery"],
    onError: (error) => {
      const message = getErrorMessage(error);
      displayToast({ content: message, type: "ERROR" });
    },
    onSuccess: () => {
      console.log("success");
    },
  });

  const handleLogout = () => {
    logoutQuery.mutate();
  };

  const handleCallRandom = () => {
    randomQuery.mutate();
  };

  return (
    <>
      <p>Home</p>
      <p>
        <button onClick={handleLogout}>Logout</button>
      </p>
      <p>
        <button onClick={handleCallRandom}>Call Random</button>
      </p>
    </>
  );
};

export default Home;
