import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  return (
    <>
      <header>
        <div className="header-text-container">
          {location.pathname === "/" && (
            <h1 className="main-title">Find your film</h1>
          )}
          {location.pathname === "/watchlist" && (
            <h1 className="main-title">You Watchlist</h1>
          )}

          <h4 className="header-link">
            {location.pathname === "/" && (
              <Link to="/watchlist">My Watchlist</Link>
            )}
            {location.pathname === "/watchlist" && (
              <Link to="/">Return to Search</Link>
            )}
          </h4>
        </div>
      </header>
    </>
  );
}
