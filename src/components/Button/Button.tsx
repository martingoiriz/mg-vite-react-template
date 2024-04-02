import styled from "styled-components";

const BaseButton = styled.button`
  font-size: 1.5em;
  text-align: center;
  color: #bf4f74;
  padding: 10px;
  border: 1px solid grey;
`;

const Button = ({ children }) => {
  return <BaseButton>{children}</BaseButton>;
};

export default Button;
