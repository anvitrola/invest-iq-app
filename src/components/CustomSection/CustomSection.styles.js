import styled from "styled-components";

export const AnimatedSection = styled.section`
  grid-area: ${(props) => (props.gridArea ? props.gridArea : "none")};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  padding: 4rem 4rem;
  animation-timeline: auto;
  animation-range-start: normal;
  animation-range-end: normal;
  background: radial-gradient(
      circle at 50% 50%,
      rgba(255, 214, 102, 0.5),
      rgba(254, 173, 129, 0.5),
      rgba(246, 167, 162, 0.5),
      rgba(147, 156, 235, 0.5)
    )
    0% 0% / 400% 100%;
  animation: 25s ease 0s infinite normal none running ioFRzz;
`;
