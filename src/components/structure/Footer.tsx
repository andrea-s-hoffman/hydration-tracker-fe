import { useContext, useEffect, useState } from "react";
import "./Footer.css";
import AuthContext from "../../context/AuthContext";
import Account from "../../models/Account";
import { getAllAccounts } from "../../services/accountInfoApi";
import Friend from "../profiles/Friend";
import AddFriendForm from "../profiles/AddFriendForm";

const Footer = () => {
  const { account } = useContext(AuthContext);
  const [friends, setFriends] = useState<Account[]>([]);
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    if (account) {
      getAllAccounts().then((res) => {
        const filtered = res.filter((person) => {
          if (account.friends.includes(person.uid)) {
            return person;
          }
        });
        setFriends(filtered);
      });
    }
  }, [account]);
  return (
    <footer className="Footer">
      {account && (
        <>
          <div className="menu">
            <h3>Friends:</h3>
            <button className="show-form" onClick={() => setShowForm(true)}>
              add
            </button>
          </div>
          {friends.length > 0 ? (
            <ul className="friends">
              {friends.map((friend) => (
                <Friend key={friend._id} friend={friend} />
              ))}
            </ul>
          ) : (
            <p className="no-friends">No friends yet 😥</p>
          )}
          {showForm && <AddFriendForm close={() => setShowForm(false)} />}
        </>
      )}
    </footer>
  );
};

export default Footer;
