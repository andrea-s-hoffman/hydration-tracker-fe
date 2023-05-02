import { FormEvent, useContext, useState } from "react";
import "./UpdateProfileForm.css";
import AuthContext from "../../context/AuthContext";
import { getAllAccounts, updateAccount } from "../../services/accountInfoApi";
import { useNavigate } from "react-router-dom";

const UpdateProfileForm = () => {
  const navigate = useNavigate();
  const { account, setAccount } = useContext(AuthContext);
  const [un, setUn] = useState(account?.userName || "");
  const [goal, setGoal] = useState(account?.dailyGoalOz?.toString() || "");
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
      <button>Save</button>
      <span className="error">{err}</span>
    </form>
  );
};

export default UpdateProfileForm;
