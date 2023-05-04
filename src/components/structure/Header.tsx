import { useContext } from "react";
import "./Header.css";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { account, signOuttaHere, currentDay } = useContext(AuthContext);
  return (
    <header className="Header">
      <h1>
        <Link to="/">hydrate / dye</Link>
      </h1>
      {account && (
        <div className="account-stuff">
          <div className="pic-streak">
            <p className={!currentDay ? "nope" : ""}>
              {currentDay && account.streakCount > 0
                ? `${account.streakCount}🔥`
                : "💀"}
            </p>
            <Link to={"/my-profile"} className="avatar">
              <img src={account?.avatar} alt="avatar" />
            </Link>
          </div>
          <button onClick={signOuttaHere}>sign out</button>
        </div>
      )}
    </header>
  );
};

export default Header;
