import React from "react";

import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { IconContext } from "react-icons";

import BlackLogo from "../../assets/images/BlackLogo.png";

import { FooterContainer, Lists, Signature } from "./Footer.styles";

function Footer() {
  return (
    <FooterContainer>
      <Signature>
        <img src={BlackLogo} />

        <p>Start tracking your performance for free</p>

        <section>
          <IconContext.Provider
            value={{ color: "var(--white)", size: "1.7rem" }}
          >
            <FaFacebook />
          </IconContext.Provider>
          <IconContext.Provider
            value={{ color: "var(--white)", size: "1.7rem" }}
          >
            <FaInstagram />
          </IconContext.Provider>
          <IconContext.Provider
            value={{ color: "var(--white)", size: "1.7rem" }}
          >
            <FaTwitter />
          </IconContext.Provider>
        </section>
      </Signature>

      <Lists>
        <ul>
          <h4 style={{ color: "whitesmoke" }}>Features</h4>
          <li>Performance</li>
          <li>Supported brokers</li>
          <li>Supported software</li>
          <li>Data security</li>
          <li>Tax reporting</li>
        </ul>

        <ul>
          <h4 style={{ color: "whitesmoke" }}>Legal</h4>
          <li>Brand assets</li>
          <li>Tax reporting</li>
        </ul>

        <ul>
          <h4 style={{ color: "whitesmoke" }}>About us</h4>
          <li>Our team</li>
          <li>investiqcs@gmail.com</li>
        </ul>
      </Lists>
    </FooterContainer>
  );
}

export default Footer;
