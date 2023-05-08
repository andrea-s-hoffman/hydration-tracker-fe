import { ReactNode, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth, signOut } from "../firebaseConfig";
import AuthContext from "./AuthContext";
import { addAccount, lookForAccount } from "../services/accountInfoApi";
import Account from "../models/Account";
import { Report } from "../models/Report";
import { getRandomProfilePhoto } from "../services/profilePhotos";

function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [currentDay, setCurrentDay] = useState<Report | null>(null);
  const [currentDayIndex, setCurrentDayIndex] = useState(-1);
  const [trigger, setTrigger] = useState(false);
  const [loading, setLoading] = useState(true);

  const pullTrigger = () => {
    setTrigger((prev) => !prev);
  };

  const signOuttaHere = () => {
    signOut();
    setAccount(null);
    setCurrentDay(null);
    setCurrentDayIndex(-1);
    localStorage.setItem("sign-out", "true");
    setLoading(false);
  };

  useEffect(() => {
    if (account) {
      const today = new Date();
      const month = today.getMonth();
      const date = today.getDate();
      const year = today.getFullYear();

      const todaysReportLocation = account.dailyReports.findIndex(
        (report) =>
          new Date(report?.day).getDate() === date &&
          new Date(report?.day).getMonth() === month &&
          new Date(report?.day).getFullYear() === year
      );
      if (todaysReportLocation > -1)
        setCurrentDay(account.dailyReports[todaysReportLocation]);
      setCurrentDayIndex(todaysReportLocation);
    }
  }, [account]);

  useEffect(() => {
    // useEffect to only register once at start
    return auth.onAuthStateChanged((newUser) => {
      if (newUser) {
        setUser(newUser);
        lookForAccount(newUser.uid).then((res) => {
          if (res) {
            setAccount(() => {
              const copyOfAcct = { ...res };
              if (res.lastCheckIn) {
                const lastCheckIn = new Date(res.lastCheckIn);
                const today = new Date();
                let yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const msSpanned = today.getTime() - lastCheckIn.getTime();
                if (msSpanned > 172800000) {
                  copyOfAcct.streakCount = 0;
                } else if (
                  lastCheckIn.getDate() !== yesterday.getDate() &&
                  lastCheckIn.getDate() !== today.getDate()
                ) {
                  copyOfAcct.streakCount = 0;
                }
              }
              return copyOfAcct;
            });
            setLoading(false);
          } else {
            addAccount({
              uid: newUser.uid,
              userName:
                newUser.displayName?.replace(/\s/g, "-").toLowerCase() || "",
              email: newUser.email!,
              password: null,
              initialSetUp: false,
              avatar: newUser.photoURL || getRandomProfilePhoto(),
              accountCreated: new Date(),
              lastCheckIn: null,
              dailyGoalOz: 0,
              streakCount: 0,
              dailyReports: [],
              friends: [],
            }).then((res) => {
              setAccount(res);
            });
            setLoading(false);
          }
        });
      } else {
        const signOut = localStorage.getItem("sign-out");
        const uid = localStorage.getItem("uid");
        if (uid && signOut === "false") {
          lookForAccount(uid).then((res) => {
            if (res) {
              setAccount(() => {
                const copyOfAcct = { ...res };
                if (res.lastCheckIn) {
                  const lastCheckIn = new Date(res.lastCheckIn);
                  const today = new Date();
                  let yesterday = new Date();
                  yesterday.setDate(yesterday.getDate() - 1);
                  const msSpanned = today.getTime() - lastCheckIn.getTime();
                  if (msSpanned > 172800000) {
                    copyOfAcct.streakCount = 0;
                  } else if (
                    lastCheckIn.getDate() !== yesterday.getDate() &&
                    lastCheckIn.getDate() !== today.getDate()
                  ) {
                    copyOfAcct.streakCount = 0;
                  }
                }
                return copyOfAcct;
              });
              setLoading(false);
            } else {
              setUser(null);
              setAccount(null);
              setLoading(false);
            }
          });
        } else {
          setUser(null);
          setAccount(null);
          setLoading(false);
        }
      }
    });
  }, [trigger]);

  return (
    <AuthContext.Provider
      value={{
        user,
        account,
        currentDay,
        currentDayIndex,
        loading,
        setAccount,
        signOuttaHere,
        pullTrigger,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContextProvider;
