import { setupApi } from "Api";
import { useToast } from "Components";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Root = () => {
  const { displayToast } = useToast();
  setupApi(displayToast);

  return (
    <Page>
      <Outlet />
    </Page>
  );
};

export default Root;

// https://reactrouter.com/en/main/start/tutorial
