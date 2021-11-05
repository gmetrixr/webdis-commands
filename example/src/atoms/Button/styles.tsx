import styled from "styled-components";
import { primary, white } from "../../colors";

type BaseProps = {
  block?: boolean
};

export const StyledButton = styled.button<BaseProps>`
  line-height: 19px;
  position: relative;
  padding: 5px 10px;
  font-size: 10px;
  
  display: ${props => props.block? "block": "inline"};
  width: ${props => props.block? "100%": "auto"};
  cursor: pointer;
  border: none;
  background: ${primary};
  color: ${white};
  
  &:focus {
    outline: none;
  }
`;