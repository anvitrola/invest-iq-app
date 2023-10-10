import styled from "styled-components";

export const HomepageContainer = styled.main`
  grid-area: main;
  justify-self: center;
  height: auto;
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 90vh auto;

  grid-template-areas:
    "appeal appeal appeal"
    "data data data";
  grid-gap: 2rem;

  @media (max-width: 768px) {
    display: flex;
    overflow: hidden;
    width: 90%;
    flex-direction: column;
    justify-content: center;
    grid-gap: 2.5rem;
  }
`;

export const DataSection = styled.section`
  grid-area: data;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  padding: 1rem 4rem;
`;
