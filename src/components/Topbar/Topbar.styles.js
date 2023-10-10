import styled from "styled-components";

export const TopbarContainer = styled.header`
  grid-area: header;
  padding: 0.3rem 1rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

  background-color: var(--white);

  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 767px) {
    align-items: space-around;
    flex-direction: column;
  }
`;

export const Logo = styled.h1`
  color: white;

  img {
    width: 125px;
  }

  @media (max-width: 767px) {
    width: 100px;
  }
`;

export const Navbar = styled.ul`
  display: flex;
  color: black;

  li {
    margin: 5px;
    font-weight: 600;
    letter-spacing: 0.05rem;
  }
`;
