import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Root = () => {
  return (
    <Page id="main">
      <Outlet />
    </Page>
  );
};

export default Root;

// https://reactrouter.com/en/main/start/tutorial
