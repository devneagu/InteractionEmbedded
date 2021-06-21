import Search from "./Search";

import styled from "styled-components";
import "./../styled/CreateView.css";
import { useEffect, useReducer, useState } from "react";
const InteractionBlock = styled.div`
  background: #fdfeff;
  position: absolute;
  width: 85%;
  height: 85%;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const InteractionBlockContainer: HTMLElement = styled.div`
  margin: 0;
  padding: 0;
  position: relative;
  height: 100%;
  width: 100%;
`;

const InteractionBlockHeader: HTMLElement = styled.div`
  position: aboslute;
  top: 0em;
  height: 1em;
`;
const InteractionBlockTitle: HTMLElement = styled.h5`
  padding: 0;
  margin: 0;
  position: absolute;
  top: 0;
  left: 1em;
  top: 0.5em;
`;
const InteractionBlockClose: HTMLElement = styled.div`
  position: absolute;
  right: 1em;
  top: 0.5em;
  padding: 0;
  margin: 0;
`;

const InteractionBlockContent: HTMLElement = styled.div`
  margin-top: 1em;
  width: 100%;
  height: calc(100% - 2em);
  position: relative;
  overflow: hidden;
`;
const FlexContainer: HTMLElement = styled.div`
  width: 100%;
  display: flex;
  margin: 0;
  padding: 0;
  height: 100%;
`;
const InteractionBlockContentLeft: HTMLElement = styled.div`
  flex: 2;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;
const InteractionBlockContentRight: HTMLElement = styled.div`
  flex: 5;
  width: 100%;
  height: 100%;
  background: #dadcdf;
  overflow-y: auto;
`;
const ComponentItem: HTMLElement = styled.div`
  background: white;
  display: inline-block;
  width: 45%;
  padding: 2% 1%;
  margin-left: 2%;
  margin-bottom: 2%;
  border: 1px solid gray;
  position: relative;
`;

const ComponentItemLabel: HTMLElement = styled.label`
  margin-left: 1em;
  width: 80%;
  padding: 4.5%;
  top: 0;
  left: 0.5em;
  -webkit-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -ms-user-select: none;
  display: inline-block;
  position: absolute;
`;
const Btn = styled.button`
  background: blue;
  border: none;
  position: absolute;
  bottom: 2em;
  right: 2em;
  padding: 1em 2em;
  color: white;
  border-radius: 1em;
  background: rgb(95, 123, 223);
  font-weight: 800;
  cursor: pointer;
  background: rgb(159, 72, 217);
  background: -moz-linear-gradient(
    90deg,
    rgba(159, 72, 217, 1) 0%,
    rgba(29, 94, 253, 1) 50%,
    rgba(244, 69, 252, 1) 100%
  );
  background: -webkit-linear-gradient(
    90deg,
    rgba(159, 72, 217, 1) 0%,
    rgba(29, 94, 253, 1) 50%,
    rgba(244, 69, 252, 1) 100%
  );
  background: linear-gradient(
    90deg,
    rgba(159, 72, 217, 1) 0%,
    rgba(29, 94, 253, 1) 50%,
    rgba(244, 69, 252, 1) 100%
  );
  z-index: 100;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#9f48d9",endColorstr="#f445fc",GradientType=1);
  &:hover {
    -webkit-box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.38);
    box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.38);
  }
`;
function reducerCreateView(state, action) {
  switch (action.type) {
    case "search":
      return { ...state, search: action.value };
    case "filteredComponents":
      var filteredComponents = JSON.parse(
        JSON.stringify(
          state.components.filter(
            (el: string) =>
              new RegExp(state.search, "gi").test(el.name) !== false
          )
        )
      );
      return {
        ...state,
        filteredComponents: filteredComponents
      };
    case "selectedComponent":
      const components = state.components.map((el) => {
        if (el.name === action.value.name) {
          el.selected = true;
          return el;
        }
        el.selected = false;
        return el;
      });
      return {
        ...state,
        components: components,
        selectedComponent: action.value
      };
    case "changeView":
      return { ...state, view: state.selectedComponent };
    default:
      return { ...state };
  }
}
const ComponentsDisplay = [
  { name: "Slideshow", selected: true },
  { name: "Quiz", selected: false },
  { name: "Sketchboard", selected: false }
];
function CreateView() {
  const [data, dispatch] = useReducer(reducerCreateView, {
    components: ComponentsDisplay,
    filteredComponents: ComponentsDisplay,
    selectedComponent: ComponentsDisplay[0],
    view: "InteractionBlock"
  });
  const checkBoxSelectedComponent = (item) => {
    dispatch({ type: "selectedComponent", value: item });
  };
  useEffect(() => {
    dispatch({ type: "filteredComponents" });
  }, [data.search]);
  return (
    <InteractionBlock>
      <InteractionBlockContainer>
        <InteractionBlockHeader>
          <InteractionBlockTitle>Configure Interaction</InteractionBlockTitle>
          <InteractionBlockClose>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </InteractionBlockClose>
        </InteractionBlockHeader>
        <InteractionBlockContent>
          <FlexContainer>
            <InteractionBlockContentLeft className="bg-w">
              {data.view === "InteractionBlock" && (
                <>
                  <p>Here are the components configured</p>
                </>
              )}
            </InteractionBlockContentLeft>
            <InteractionBlockContentRight>
              {data.view === "InteractionBlock" && (
                <>
                  <Search dispatch={dispatch} />

                  {data.filteredComponents.map((item) => (
                    <ComponentItem key={item.name}>
                      <input
                        defaultChecked={
                          item.name === data.selectedComponent.name
                        }
                        onChange={() => checkBoxSelectedComponent(item)}
                        id={item.name}
                        type="radio"
                        name="component"
                        value={item.name}
                      />
                      <ComponentItemLabel htmlFor={item.name}>
                        {item.name}
                      </ComponentItemLabel>
                    </ComponentItem>
                  ))}
                </>
              )}
            </InteractionBlockContentRight>
          </FlexContainer>
          {data.view === "InteractionBlock" && (
            <Btn onClick={() => dispatch({ type: "changeView" })}>Select</Btn>
          )}
        </InteractionBlockContent>
      </InteractionBlockContainer>
    </InteractionBlock>
  );
}
export default CreateView;
