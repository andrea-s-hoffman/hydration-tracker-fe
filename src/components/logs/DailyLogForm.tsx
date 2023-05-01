import { FormEvent, useContext, useEffect, useState } from "react";
import "./DailyLogForm.css";
import AuthContext from "../../context/AuthContext";
import { updateAccount } from "../../services/accountInfoApi";

const DailyLogForm = () => {
  const { account, setAccount } = useContext(AuthContext);
  const [updateOz, setUpdateOz] = useState(0);
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
      }
      updateAccount(copyOfAcct).then((res) => setAccount(res));
    }
    setSaved(true);
  };

  useEffect(() => {
    const today = new Date();
    const month = today.getMonth();
    const date = today.getDate();
    const year = today.getFullYear();
    let todaysReport = null;
    if (account) {
      todaysReport = account.dailyReports.find(
        (report) =>
          new Date(report?.day).getDate() === date &&
          new Date(report?.day).getMonth() === month &&
          new Date(report?.day).getFullYear() === year
      );
    }
    const todaysProgress: number =
      todaysReport && account ? todaysReport.ounces : 0;
    setUpdateOz(todaysProgress);
  }, [account]);

  return (
    <form className="DailyLogForm" onSubmit={submitHandler}>
      <div className="progress">
        <p className="progress-p">
          {updateOz}oz of {goal}
        </p>
        <div
          className={`water ${saved ? "saved" : "unsaved"}`}
          style={{ height: getPercent(updateOz) }}
        ></div>
      </div>
      <button
        type="button"
        onClick={() => {
          setSaved(false);
          setUpdateOz((prev) => prev + 8);
        }}
      >
        add 8oz
      </button>
      <button>add dat agua!</button>
    </form>
  );
};

export default DailyLogForm;
