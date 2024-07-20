import { CONTEXT_ACTIONS } from "constants";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "services/context";
import { localStorageRemove } from "utils";

const Home = () => {
  const { dispatch } = useAppContext();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({
      data: null,
      type: CONTEXT_ACTIONS.CLEAR_USER_DATA,
    });
    localStorageRemove("userData");
    navigate("/login");
  };

  return (
    <>
      <p>Home</p>
      <p>
        <button onClick={handleLogout}>Logout</button>
      </p>
    </>
  );
};

export default Home;
