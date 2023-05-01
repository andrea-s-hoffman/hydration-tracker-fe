import { FormEvent, useContext, useState } from "react";
import "./UpdateProfileForm.css";
import AuthContext from "../../context/AuthContext";
import { updateAccount } from "../../services/accountInfoApi";

const UpdateProfileForm = () => {
  const { account, setAccount } = useContext(AuthContext);
  const [un, setUn] = useState(account?.userName || "");
  const [goal, setGoal] = useState(account?.dailyGoalOz?.toString() || "0");
  console.log(account);

  const submitHandler = (e: FormEvent): void => {
    e.preventDefault();
    if (account) {
      console.log("cat");

      const copy = { ...account };
      copy.userName = un;
      copy.dailyGoalOz = +goal;
      copy.initialSetUp = true;
      updateAccount(copy).then((res) => setAccount(res));
    } else {
      console.log("dog");
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
        step={10}
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />
      <button>Save</button>
    </form>
  );
};

export default UpdateProfileForm;
