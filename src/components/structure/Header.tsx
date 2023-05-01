import { useContext } from "react";
import "./Header.css";
import AuthContext from "../../context/AuthContext";

const Header = () => {
  const { account, signOuttaHere } = useContext(AuthContext);
  return (
    <header className="Header">
      <h1>hydrate / dye</h1>
      {account && (
        <>
          <img src={account?.avatar} alt="avatar" />
          <p>welcome, {account?.userName}</p>
          <button onClick={signOuttaHere}>sign out</button>
        </>
      )}
    </header>
  );
};

export default Header;
