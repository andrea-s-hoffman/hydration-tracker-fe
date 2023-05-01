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
            {account.streakCount > 0 && <p>{account.streakCount} 🔥</p>}
            <img className="avatar" src={account?.avatar} alt="avatar" />
          </div>
          <button onClick={signOuttaHere}>sign out</button>
        </div>
      )}
    </header>
  );
};

export default Header;
