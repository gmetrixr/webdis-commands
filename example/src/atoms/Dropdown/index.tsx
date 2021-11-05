import React, { useState, useEffect, useRef } from "react";
import { find } from "lodash-es";
import { DropdownStyled, DropdownInputWrapper, CaretStyled, InputStyled, ULStyled, LIStyled } from "./styles";

type Props = {
  data: any,
  label?: string,
  defaultValue?: any,
  width?: number,
  height?: number,
  listWidth?: number,
  onChange?: (val: any) => void,
  tooltip?: string,
}

const Dropdown = ({ data, defaultValue, width, height = 310, listWidth, label, onChange }: Props) => {
  const [showList, setShowList] = useState(false);
  const [currentSelected, setCurrentSelected] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(defaultValue) {
      const selectedOption = find(data, (d) => d.value === defaultValue) || {};
      setCurrentSelected(selectedOption.name);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousedown", onMouseDown);

    return () => {
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, [showList]);

  function onMouseDown(e: any) {
    if (showList && wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setShowList(false);
    }
  }

  const selectedOption = find(data, (d) => d.value === defaultValue) || {};

  function toggleSelectList() {
    setShowList(!showList);
  }

  function onSelectValue(data: any) {
    toggleSelectList();

    if(data) {
      onChange && onChange(data.value);
      setCurrentSelected(data.name);
    }
  }

  return (
    <DropdownStyled ref={wrapperRef}>

      <div style={{ flexGrow: 1 }}>
        <DropdownInputWrapper
          showList={showList}
          onClick={toggleSelectList}
        >
          <InputStyled
            type="text"
            value={ currentSelected ? currentSelected : (selectedOption && selectedOption.name) ? selectedOption.name : "None"}
            onChange={toggleSelectList}
            readOnly
            showList={showList}
          >
          </InputStyled>
          
          <CaretStyled showList={showList}>
            {">"}
          </CaretStyled>
        </DropdownInputWrapper>
        
        {
          showList && <ULStyled width={listWidth || width} maxHeight={height}>
          {
            data.length !== 0 ? (
              data.map((data: any, i: number) => {
                return (
                  <LIStyled
                    key={i}
                    onClick={() => onSelectValue(data)}
                    selected={currentSelected === data.name}
                    backgroundColor={currentSelected === data.name ? "#d6d6d6": "white"}
                  >
                    {data.name}
                  </LIStyled>
                )
              })
            ) : <LIStyled onClick={toggleSelectList}>Empty..</LIStyled>
          }
          </ULStyled>
        }
      </div>
    </DropdownStyled>
  );
}

export default Dropdown;
