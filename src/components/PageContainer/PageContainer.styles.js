import styled from "styled-components";

export const DashboardContainer = styled.main`
  grid-area: main;
  background-color: rgb(255, 255, 255);
  width: 80%;
  justify-self: center;
  height: auto;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 80vh repeat(4, auto);

  grid-template-areas:
    "title title form"
    "table table table"
    "map map map"
    "cards cards cards";
  grid-gap: 5rem;

  @media (max-width: 768px) {
    display: flex;
    overflow: hidden;
    width: 90%;
    flex-direction: column;
    justify-content: center;
    grid-gap: 2.5rem;
  }
`;