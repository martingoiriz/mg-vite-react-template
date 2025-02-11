import { ReactNode } from "react";
import styled from "styled-components";

interface FormWrapperProps {
  children: ReactNode;
  onSubmit?: () => void;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  gap: 10px;
  & div {
    width: 100%;
  }
`;

const FormWrapper: React.FC<FormWrapperProps> = ({ children, onSubmit }) => {
  return <Form onSubmit={onSubmit}>{children}</Form>;
};

export default FormWrapper;
