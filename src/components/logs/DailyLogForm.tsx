import { FormEvent, useContext, useEffect, useState } from "react";
import "./DailyLogForm.css";
import AuthContext from "../../context/AuthContext";
import { updateAccount } from "../../services/accountInfoApi";
import { getPercent } from "../../services/helperFunctions";

const DailyLogForm = () => {
  const { account, setAccount, currentDay, currentDayIndex } = useContext(
    AuthContext
  );
  const [updateOz, setUpdateOz] = useState(0);
  const [saved, setSaved] = useState(true);
  const goal = account ? account.dailyGoalOz : 100;

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (account) {
      const copyOfAcct = { ...account };
      copyOfAcct.lastCheckIn = new Date();
      if (currentDayIndex > -1) {
        copyOfAcct.dailyReports[currentDayIndex].ounces = updateOz;
        copyOfAcct.dailyReports[currentDayIndex].goalMet =
          updateOz >= account.dailyGoalOz;
      } else {
        copyOfAcct.dailyReports.push({
          day: new Date(),
          ounces: updateOz,
          goalMet: updateOz >= account.dailyGoalOz,
        });
        copyOfAcct.streakCount++;
      }
      updateAccount(copyOfAcct).then((res) => setAccount(res));
    }
    setSaved(true);
  };

  useEffect(() => {
    // console.log(currentDay);

    if (currentDay && account) {
      setUpdateOz(currentDay.ounces);
    } else if (account && !currentDay) {
      setUpdateOz(0);
    }
  }, [currentDay, account]);

  return (
    <form className="DailyLogForm" onSubmit={submitHandler}>
      <div className="progress">
        <div
          className={`water ${saved ? "saved" : "unsaved"}`}
          style={{ height: getPercent(updateOz, goal) }}
        ></div>
        <div className="progress-p">
          <p className="oz-done">{updateOz}oz</p>
          <p className="oz-goal">of {goal}</p>
        </div>
      </div>
      <div className="add-8oz">
        <button
          type="button"
          onClick={() => {
            setSaved(false);
            setUpdateOz((prev) => prev + 8);
          }}
        >
          add 8oz
        </button>
        {!saved && (
          <button
            type="button"
            className="circle"
            onClick={() => {
              setSaved(true);
              setUpdateOz(currentDay?.ounces || 0);
            }}
          >
            <i className="fa-solid fa-rotate-right"></i>
          </button>
        )}
      </div>
      {!saved && <button>save!</button>}
    </form>
  );
};

export default DailyLogForm;
