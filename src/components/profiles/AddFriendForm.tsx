import { useContext, useEffect, useState } from "react";
import "./AddFriendForm.css";
import Account from "../../models/Account";
import { getAllAccounts, updateAccount } from "../../services/accountInfoApi";
import AuthContext from "../../context/AuthContext";

interface Props {
  close: () => void;
}

const AddFriendForm = ({ close }: Props) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const { account, setAccount } = useContext(AuthContext);

  const areTheyAFriend = (uiddd: string): boolean => {
    if (account) {
      return account.friends.some((uid) => uid === uiddd);
    } else {
      return false;
    }
  };

  const addFriend = (uid: string): void => {
    if (account) {
      const copyOfAcct = { ...account };
      copyOfAcct.friends.push(uid);
      updateAccount(copyOfAcct).then((res) => setAccount(res));
    }
  };

  useEffect(() => {
    getAllAccounts().then((res) => setAccounts(res));
  }, []);
  return (
    <div className="AddFriendForm">
      <div>
        <h2>Add a friend:</h2>
        <button className="close" onClick={close}>
          x
        </button>
        <ul>
          {" "}
          {accounts.map((profile) => {
            if (profile.uid !== account?.uid) {
              return (
                <li key={profile._id}>
                  <p>{profile.userName}</p>
                  {areTheyAFriend(profile.uid) ? (
                    <p>✓</p>
                  ) : (
                    <button onClick={() => addFriend(profile.uid)}>add</button>
                  )}
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default AddFriendForm;
