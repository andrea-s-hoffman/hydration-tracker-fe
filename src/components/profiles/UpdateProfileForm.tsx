import { FormEvent, useContext, useEffect, useState } from "react";
import "./UpdateProfileForm.css";
import AuthContext from "../../context/AuthContext";
import { getAllAccounts, updateAccount } from "../../services/accountInfoApi";
import { useNavigate } from "react-router-dom";
import {
  getRandomProfilePhoto,
  profilePhotos,
} from "../../services/profilePhotos";
const { generateUsername } = require("friendly-username-generator");

const UpdateProfileForm = () => {
  const navigate = useNavigate();
  const { account, setAccount } = useContext(AuthContext);
  const [un, setUn] = useState(account?.userName || generateUsername());
  const [goal, setGoal] = useState(account?.dailyGoalOz || "");
  const [photo, setPhoto] = useState(getRandomProfilePhoto());
  const [selected, setSelected] = useState(false);

  const [err, setErr] = useState("");
  console.log(account);

  const submitHandler = (e: FormEvent): void => {
    e.preventDefault();
    if (account) {
      if (un && goal) {
        getAllAccounts().then((res) => {
          const unTaken = res.some(
            (acc) => acc.userName === un && acc.uid !== account.uid
          );
          if (!unTaken) {
            const copy = { ...account };
            copy.userName = un;
            copy.dailyGoalOz = +goal;
            copy.initialSetUp = true;
            copy.avatar = photo;
            updateAccount(copy).then((res) => setAccount(res));
            navigate("/");
            setErr("");
          } else {
            setErr("username taken");
          }
        });
      } else if (un && !goal) {
        setErr("please choose a goal");
      } else if (!un && goal) {
        setErr("please choose a username");
      } else {
        setErr("please choose a username and goal");
      }
    }
  };

  useEffect(() => {
    if (account) {
      setPhoto(account.avatar);
    }
  }, [account]);

  return (
    <form className="UpdateProfileForm" onSubmit={submitHandler}>
      <label htmlFor="username">username:</label>
      <input
        type="text"
        name="username"
        id="username"
        value={un}
        onChange={(e) => setUn(e.target.value)}
      />
      <label htmlFor="dailyGoal">daily goal (ounces):</label>
      <input
        type="number"
        name="dailyGoal"
        id="dailyGoal"
        min={0}
        placeholder="64"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />
      <label>choose a profile image:</label>
      <div className="images">
        {profilePhotos
          .sort((a) => {
            if (a === photo && !selected) {
              return -1;
            } else {
              return 1;
            }
          })
          .map((pic) => (
            <img
              key={pic}
              src={pic}
              className={pic === photo ? "selected" : ""}
              onClick={() => {
                setSelected(true);
                setPhoto(pic);
              }}
            />
          ))}
      </div>
      <button>Save</button>
      <span className="error">{err}</span>
    </form>
  );
};

export default UpdateProfileForm;
