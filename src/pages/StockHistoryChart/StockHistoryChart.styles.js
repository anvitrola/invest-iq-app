import styled from "styled-components";

export const StockHistoryChartContainer = styled.main`
  grid-area: main;
  justify-self: center;
  height: auto;
  width: 100%;
  display: grid;
  padding-top: 3rem;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto auto;

  grid-template-areas:
    "title chart"
    "table table";
  grid-gap: 3rem;
`;