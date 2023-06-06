import React from "react";
import "../styles/footer.css";
import { Link } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { useStoreContext } from "../context/storeContext";
const Footer = () => {
  const {
    store: { sideBar },
  } = useStoreContext();

  return (
    <div className={sideBar ? "footer disabledFooter" : "footer"}>
      <section className="footerIcons">
        <Link to="https://github.com/yuvraj1905">
          <AiFillGithub size={32} color="black" />
        </Link>
        <Link to="https://twitter.com/yuvrajt1905">
          <AiFillTwitterCircle size={32} color="black" />
        </Link>
        <Link to="https://www.linkedin.com/in/yuvraj1905/">
          <AiFillLinkedin size={32} color="black" />
        </Link>
      </section>
      <h3>Yuvraj {`  `}@neogcamp</h3>
    </div>
  );
};

export default Footer;
