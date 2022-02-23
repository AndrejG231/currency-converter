import styled, { DefaultTheme } from "styled-components"
import { SelectType } from "./types"

// Map all styles of react-dropwdown and change colors
export const selectStyles = (theme: DefaultTheme) =>
  [
    "clearIndicator",
    "container",
    "control",
    "dropdownIndicator",
    "group",
    "groupHeading",
    "indicatorsContainer",
    "indicatorSeparator",
    "input",
    "loadingIndicator",
    "loadingMessage",
    "menu",
    "menuList",
    "menuPortal",
    "multiValue",
    "multiValueLabel",
    "multiValueRemove",
    "noOptionsMessage",
    "option",
    "placeholder",
    "singleValue",
    "valueContainer",
  ].reduce(
    (acc, val) => ({
      ...acc,
      [val]: (provided: object) => {
        if (val === "input") {
          return {
            ...provided,
            color: theme.colors.white,
          }
        }
        return {
          ...provided,
          background: theme.colors.gray,
          color: theme.colors.white,
        }
      },
    }),
    {}
  )

export const Wrapper = styled.div<{ type: SelectType }>`
  width: 100%;
  height: 100%;
  display: grid;
  position: static;
  color: black;
  grid-template-rows: auto 1fr;
  padding: 10px;
`
