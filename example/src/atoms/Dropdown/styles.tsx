import styled from "styled-components";
import { greynew, grey7, grey8, black } from "../../colors";


export const DropdownStyled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
`;

export const DropdownInputWrapper = styled.div<{ showList: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  flex-grow: 1;
  border: 1px solid ${props => props.showList ? greynew : "#828282"};
  border-radius: 3px;

  &:hover {
    border 1px solid ${greynew};
  }

  &:active {
    border: 1px solid ${greynew};
    outline: none;
  }
`;

export const InputStyled = styled.input<{ showList: boolean }>`
  display: inline-block;
  width: 100%;
  font-size: ${props => props.theme?.fontSize || "12px"};
  font-family: "Inter-regular", sans-serif;
  font-weight: 400;
  color: ${black};
  background-color: transparent;
  padding-left: 5px;
  cursor: pointer;
  border: unset;

  &:focus {
    outline: none;
  }
`;

export const CaretStyled = styled.div<{ showList: boolean }>`
  height: 20px;
  display: flex;
  transform: ${props => props.showList && "rotate(180deg)"};
  cursor: pointer;
`;

export const ULStyled = styled.ul<{ width: any, maxHeight: any }>`
  position: absolute;
  top: 110%;
  right: 0;
  padding: 0;
  margin: 0;
  border: 1px solid ${greynew};
  border-radius: 3px;
  width: 100%;
  max-height: ${props => props.maxHeight ? `${props.maxHeight}px` : "310px"};
  z-index: 100;
  overflow-y: auto;
  box-sizing: border-box;
`;

export const LIStyled = styled.li<{ backgroundColor?: string, selected?: boolean }>`
  font-size: ${props => props.theme?.fontSize || "12px"};
  color: ${black};
  ${props => props.backgroundColor ? `background-color: ${props.backgroundColor}` : null};

  font-family: "Inter-regular", sans-serif !important;
  display: flex;
  align-items: center;
  padding: 2px 5px;
  z-index: 10;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
  cursor: pointer;
  
  &:hover {
    background-color: ${grey8};
  }
  
  &:nth-of-type(1) {
    border: unset;
  }
`;