import styled from "styled-components";

export const DashboardContainer = styled.main`
  grid-area: main;
  background-color: rgb(255, 255, 255);
  justify-self: center;
  height: auto;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;

  grid-template-areas:
    "form form form"
    "table table table";
  grid-gap: 3rem;

  @media (max-width: 768px) {
    display: flex;
    overflow: hidden;
    width: 90%;
    flex-direction: column;
    justify-content: center;
    grid-gap: 2.5rem;
  }
`;

export const NewEntryForm = styled.div`
  height: auto;
  display: flex;
`;