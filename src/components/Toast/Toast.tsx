import { ReactNode, useCallback } from "react";
import styled from "styled-components";
import { useTimeout } from "Utils/hooks/useTimeout";

interface ToastProps {
  close: () => void;
  children: ReactNode;
  type?: ToastType;
}

export type ToastType = "ERROR" | "SUCCESS" | "WARNING" | "INFO" | "DEFAULT";

const TypeColor = Object.freeze({
  DEFAULT: "black",
  ERROR: "salmon",
  INFO: "lightseagreen",
  SUCCESS: "mediumseagreen",
  WARNING: "lightsalmon",
});

interface StyledProps {
  bgColor: string;
}

const ToastContainer = styled.div<StyledProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ bgColor }) => bgColor};
  width: 50%;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  left: 49vw;
  bottom: 5vh;
  position: fixed;

  // for cellphones and tablets
  @media only screen and (max-width: 600px) {
    width: 90%;
    left: 5vw;
  }
`;

const ToastText = styled.div`
  height: 100%;
  width: 85%;
  border-color: white;
  color: white;
  font-size: large;
  @media only screen and (max-width: 600px) {
    font-size: medium;
  }
`;

const ToastClose = styled.div<StyledProps>`
  display: flex;
  justify-content: flex-end;
  background-color: ${({ bgColor }) => bgColor};
  height: 100%;
  width: 15%;
`;

const ToastCloseButton = styled.button`
  background-color: transparent;
  border-color: white;
  color: white;
`;

const getTypeColor = (type: ToastType) => {
  return TypeColor[type] || TypeColor.DEFAULT;
};

export const Toast: React.FC<ToastProps> = ({ close, children, type = "DEFAULT" }) => {
  const messageColor = getTypeColor(type);

  useTimeout(close, 5000);

  const handleClose = useCallback(() => {
    close();
  }, [close]);

  return (
    <ToastContainer bgColor={messageColor}>
      <ToastText>{children}</ToastText>
      <ToastClose bgColor={messageColor}>
        <ToastCloseButton onClick={handleClose}>x</ToastCloseButton>
      </ToastClose>
    </ToastContainer>
  );
};
