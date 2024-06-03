import styled from "styled-components";
import { useTimeout } from "utils/hooks/useTimeout";

export type ToastType = "ERROR" | "SUCCESS" | "WARNING" | "INFO" | "DEFAULT";

const TypeColor = Object.freeze({
  DEFAULT: "black",
  ERROR: "salmon",
  INFO: "lightseagreen",
  SUCCESS: "mediumseagreen",
  WARNING: "lightsalmon",
});

const ToastContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  background-color: ${({ bgColor }) => bgColor};
  width: 50%;
  border-radius: 10px;
  padding: 10px;
  left: 49vw;
  bottom: 5vh;
  position: fixed;
`;

const ToastText = styled.div`
  height: 100%;
  width: 90%;
  border-color: white;
  color: white;
  font-size: 18px;
`;

const ToastClose = styled.div`
  background-color: ${({ bgColor }) => bgColor};
  height: 100%;
  width: 10%;
`;

const ToastCloseButton = styled.button`
  background-color: transparent;
  border-color: white;
  color: white;
`;

const getTypeColor = (type: ToastType) => {
  return TypeColor[type] || TypeColor.DEFAULT;
};

export const Toast = ({ close, children, type }) => {
  const messageColor = getTypeColor(type);
  useTimeout(close, 5000);
  return (
    <ToastContainer bgColor={messageColor}>
      <ToastText>{children}</ToastText>
      <ToastClose>
        <ToastCloseButton onClick={close}>x</ToastCloseButton>
      </ToastClose>
    </ToastContainer>
  );
};
