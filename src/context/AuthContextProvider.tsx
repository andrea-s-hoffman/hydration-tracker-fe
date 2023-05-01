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

function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [currentDay, setCurrentDay] = useState<Report | null>(null);

  const signOuttaHere = () => {
    signOut();
  };

  useEffect(() => {
    const today = new Date();
    const month = today.getMonth();
    const date = today.getDate();
    const year = today.getFullYear();
    if (account) {
      const todaysReport = account.dailyReports.find(
        (report) =>
          new Date(report?.day).getDate() === date &&
          new Date(report?.day).getMonth() === month &&
          new Date(report?.day).getFullYear() === year
      );
      if (todaysReport) setCurrentDay(todaysReport);
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
              const daysSpanned = new Date().getDate() - lastCheckIn.getDate();
              const copyOfAcct = { ...res };
              if (daysSpanned > 1) {
                copyOfAcct.streakCount = 0;
                updateAccount(copyOfAcct).then(() => {});
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
              avatar: newUser.photoURL || "",
              accountCreated: new Date(),
              lastCheckIn: null,
              dailyGoalOz: 0,
              streakCount: 0,
              dailyReports: [],
            }).then((res) => {
              setAccount(res);
            });
          }
        });
      } else {
        setUser(null);
        setAccount(null);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, account, setAccount, signOuttaHere, currentDay }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContextProvider;
