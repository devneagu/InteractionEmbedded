import { useEffect, useState } from "react";
import styled from "styled-components";

const SvgIcon = styled.svg`
  position: absolute;
  left: 0;
  z-index: 100;
  top: 0.45em;
  cursor: pointer;
`;
function SearchIcon() {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
    </SvgIcon>
  );
}

const InputContainer = styled.div`
  position: relative;
  margin-left: 1em;
`;
const InputStyle = styled.input`
  border: 0;
  background: transparent;
  border-radius: 0.75em;
  width: 80%;
  color: black;
  display: block;
  font-size: 1em;
  padding: 0.5em 1em;
  padding-left: 1.5em;
  margin: 1em 0;

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: gray;
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: red;
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: red;
  }
`;

function Search({ dispatch }) {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    dispatch({ type: "search", value: searchInput });
  }, [searchInput]);
  return (
    <>
      <InputContainer>
        <SearchIcon />
        <InputStyle
          placeholder="Search.."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </InputContainer>
    </>
  );
}

export default Search;
