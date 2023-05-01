import { FormEvent, useContext, useEffect, useState } from "react";
import "./DailyLogForm.css";
import AuthContext from "../../context/AuthContext";
import { updateAccount } from "../../services/accountInfoApi";

const DailyLogForm = () => {
  const { account, setAccount, currentDay } = useContext(AuthContext);
  const [updateOz, setUpdateOz] = useState(0);
  let startingValue = 0;
  const [saved, setSaved] = useState(true);
  const goal = account ? account.dailyGoalOz : 100;
  const getPercent = (numberAsString: number): string => {
    let percent = (numberAsString / +goal) * 100;
    if (percent >= 100) {
      return "100%";
    } else {
      return percent + "%";
    }
  };
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (account) {
      const today = new Date();
      const month = today.getMonth();
      const date = today.getDate();
      const year = today.getFullYear();
      let todaysReportLocation = -1;
      if (account) {
        todaysReportLocation = account.dailyReports.findIndex(
          (report) =>
            new Date(report?.day).getDate() === date &&
            new Date(report?.day).getMonth() === month &&
            new Date(report?.day).getFullYear() === year
        );
      }
      const copyOfAcct = { ...account };

      if (todaysReportLocation > -1) {
        copyOfAcct.dailyReports[todaysReportLocation].ounces = updateOz;
        copyOfAcct.dailyReports[todaysReportLocation].goalMet =
          updateOz >= account.dailyGoalOz;
      } else {
        copyOfAcct.dailyReports.push({
          day: today,
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
    const todaysProgress: number =
      currentDay && account ? currentDay.ounces : 0;
    startingValue = todaysProgress;
    setUpdateOz(todaysProgress);
  }, [account]);

  return (
    <form className="DailyLogForm" onSubmit={submitHandler}>
      <div className="progress">
        <div className="progress-p">
          <p className="oz-done">{updateOz}oz</p>
          <p className="oz-goal">of {goal}</p>
        </div>
        <div
          className={`water ${saved ? "saved" : "unsaved"}`}
          style={{ height: getPercent(updateOz) }}
        ></div>
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
