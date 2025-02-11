import { ReactNode } from "react";
import styled from "styled-components";

interface TextProps {
  children: ReactNode;
  size?: string;
  color?: string;
  textDecoration?: string;
}

const TextComponent = styled.div<TextProps>`
  font-size: ${({ size = "medium" }) => size};
  color: ${({ color = "black" }) => color};
  text-decoration: ${({ textDecoration = "none" }) => textDecoration};
`;

const Text: React.FC<TextProps> = ({
  children,
  textDecoration = "none",
  size = "medium",
  color = "black",
}) => {
  return (
    <TextComponent color={color} size={size} textDecoration={textDecoration}>
      {children}
    </TextComponent>
  );
};

export default Text;
