import { useParams } from "react-router-dom";
import "./Profile.css";
import { useEffect, useState } from "react";
import Account from "../../models/Account";
import { lookForAccount } from "../../services/accountInfoApi";
import { getPercent } from "../../services/helperFunctions";
import { Link } from "react-router-dom";

const Profile = () => {
  const uid: string = useParams().uid || "";
  const [todaysProgress, setTodaysProgress] = useState(0);
  const [friend, setFriend] = useState<Account | null>(null);

  useEffect(() => {
    if (uid) {
      lookForAccount(uid).then((res) => {
        if (res) {
          const today = new Date();
          const month = today.getMonth();
          const date = today.getDate();
          const year = today.getFullYear();

          const todaysReport = res.dailyReports.find(
            (report) =>
              new Date(report?.day).getDate() === date &&
              new Date(report?.day).getMonth() === month &&
              new Date(report?.day).getFullYear() === year
          );
          if (todaysReport) {
            setTodaysProgress(todaysReport.ounces);
          } else {
            setTodaysProgress(0);
          }
          setFriend(res);
        }
      });
    }
  }, [uid]);

  return (
    <section className="Profile">
      {friend ? (
        <>
          <div className="friend-info">
            <img src={friend.avatar} alt="avatar" />
            <div className="descriptions">
              <h3>{friend.userName}</h3>
              <p>Daily Goal: {friend.dailyGoalOz}oz</p>
              <p
                className={`streak ${
                  todaysProgress && friend.streakCount > 0 ? `good` : "bad"
                }`}
              >
                {todaysProgress && friend.streakCount > 0
                  ? `${friend.streakCount}🔥`
                  : "💀"}
              </p>
            </div>
          </div>
          <div className="friend-progress">
            <div className="progress">
              <div
                className={`water`}
                style={{
                  height: getPercent(todaysProgress, friend.dailyGoalOz),
                }}
              ></div>
              <div className="progress-p">
                <p className="oz-done">{todaysProgress}oz</p>
                <p className="oz-goal">of {friend.dailyGoalOz}</p>
              </div>
            </div>
            <Link to={`/`}>
              <p className="go-home">go back home</p>
            </Link>
          </div>
        </>
      ) : (
        <p>...looking</p>
      )}
    </section>
  );
};

export default Profile;
