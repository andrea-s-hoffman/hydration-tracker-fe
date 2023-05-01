import { useContext } from "react";
import "./Header.css";
import AuthContext from "../../context/AuthContext";

const Header = () => {
  const { account, signOuttaHere } = useContext(AuthContext);
  return (
    <header className="Header">
      <h1>hydrate / dye</h1>
      {account && (
        <div className="account-stuff">
          <div className="pic-streak">
            <p>{account.streakCount > 0 ? `${account.streakCount}🔥` : "💀"}</p>
            <img className="avatar" src={account?.avatar} alt="avatar" />
          </div>
          <button onClick={signOuttaHere}>sign out</button>
        </div>
      )}
    </header>
  );
};

export default Header;
