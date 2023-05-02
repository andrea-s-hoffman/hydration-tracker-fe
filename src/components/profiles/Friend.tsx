import { useEffect, useState } from "react";
import Account from "../../models/Account";
import "./Friend.css";
import { getPercent } from "../../services/helperFunctions";
import { Link } from "react-router-dom";

interface Props {
  friend: Account;
}

const Friend = ({ friend }: Props) => {
  const [todaysProgress, setTodaysProgress] = useState(0);

  useEffect(() => {
    const today = new Date();
    const month = today.getMonth();
    const date = today.getDate();
    const year = today.getFullYear();

    const todaysReport = friend.dailyReports.find(
      (report) =>
        new Date(report?.day).getDate() === date &&
        new Date(report?.day).getMonth() === month &&
        new Date(report?.day).getFullYear() === year
    );
    if (todaysReport) {
      setTodaysProgress(todaysReport.ounces);
    }
  }, []);
  return (
    <Link to={`/profile/${friend.uid}`}>
      <li className="Friend">
        <img className="avatar" src={friend.avatar} alt="avatar" />
        <div className="details">
          <p className="streak">
            {todaysProgress && friend.streakCount > 0
              ? `${friend.streakCount}🔥`
              : "💀"}
          </p>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ height: getPercent(todaysProgress, friend.dailyGoalOz) }}
            ></div>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default Friend;
