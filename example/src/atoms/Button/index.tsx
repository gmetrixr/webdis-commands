import React from "react";
import {
  StyledButton
} from "./styles";

type Props = {
  children: React.ReactNode,
  onClick?: () => void,
}

export default function Button(
  {
    children,
    onClick = () => {},
  }: Props) {

  return (
    <>
      <StyledButton onClick={onClick}>
        {children}
      </StyledButton>
    </>
  );
}
