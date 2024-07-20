import { ReactNode } from "react";
import styled from "styled-components";

import Spinner from "../Spinner";

interface ButtonProps {
  type?: string;
  isLoading?: boolean;
  children: ReactNode;
  onClick?: () => void;
}

const BaseButton = styled.button<ButtonProps>`
  width: 100%;
  font-size: 1.6em;
  text-align: center;
  color: white;
  padding: 1rem;
  border: 1px solid grey;
  font-size: 1rem;
`;

const Button: React.FC<ButtonProps> = ({ children, type = "button", isLoading = false }) => {
  if (isLoading) {
    return (
      <BaseButton disabled>
        <Spinner size="1.2em" />
      </BaseButton>
    );
  }

  return <BaseButton type={type}>{children}</BaseButton>;
};

export default Button;
