import { ReactNode, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth, signOut } from "../firebaseConfig";
import AuthContext from "./AuthContext";
import {
  addAccount,
  lookForAccount,
  updateAccount,
} from "../services/accountInfoApi";
import Account from "../models/Account";
import { Report } from "../models/Report";
import { getRandomProfilePhoto } from "../services/profilePhotos";

function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [currentDay, setCurrentDay] = useState<Report | null>(null);
  const [currentDayIndex, setCurrentDayIndex] = useState(-1);

  const signOuttaHere = () => {
    signOut();
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
              const lastCheckIn = new Date(res?.lastCheckIn!);
              let yesterday = new Date();
              yesterday.setDate(yesterday.getDate() - 1);
              const copyOfAcct = { ...res };
              if (
                lastCheckIn &&
                lastCheckIn.getDate() !== yesterday.getDate()
              ) {
                copyOfAcct.streakCount = 0;
              }
              return copyOfAcct;
            });
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
          }
        });
      } else {
        const uid = localStorage.getItem("uid");
        if (uid) {
          lookForAccount(uid).then((res) => {
            if (res) {
              setAccount(() => {
                const lastCheckIn = new Date(res?.lastCheckIn!);
                let yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const copyOfAcct = { ...res };
                if (
                  lastCheckIn &&
                  lastCheckIn.getDate() !== yesterday.getDate()
                ) {
                  copyOfAcct.streakCount = 0;
                }
                return copyOfAcct;
              });
            } else {
              setUser(null);
              setAccount(null);
            }
          });
        }
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        account,
        setAccount,
        signOuttaHere,
        currentDay,
        currentDayIndex,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContextProvider;
