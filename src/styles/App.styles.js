import styled from "styled-components";

export const AppBody = styled.div`
  height: auto;
  grid-template-rows: 5rem auto 363px;
  background-color: whitesmoke;
  display: grid;
  grid-template-areas:
    "header header"
    "main main"
    "footer footer";

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`;
