import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

export default function Placeholder({ text }) {
  const location = useLocation();

  return (
    <section id="placeholder" className="placeholder">
      {location.pathname === "/" && <i className="fa-solid fa-film fa-5x"></i>}
      <p className="placeholder-text">{text}</p>
      {location.pathname === "/watchlist" && (
        <Link to="/">
          <p className="placeholder-watchlist-link">
            <FontAwesomeIcon
              className="star-icon"
              icon={faCirclePlus}
              color="white"
            />
            Let's add some movies!
          </p>
        </Link>
      )}
    </section>
  );
}
