import styled, { keyframes } from "styled-components";

interface SpinnerProps {
  size?: string;
}

const prixClipFix = keyframes`
  0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const Spinner = styled.span<SpinnerProps>`
  width: ${({ size = "1.5em" }) => size};
  height: ${({ size = "1.5em" }) => size};
  border: 5px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${prixClipFix} 1s linear infinite;
`;

export default Spinner;
