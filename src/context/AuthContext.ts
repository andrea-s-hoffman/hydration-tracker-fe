import { User } from "firebase/auth";
import { createContext } from "react";
import Account from "../models/Account";
import { Report } from "../models/Report";

export interface AuthContextModel {
  user: User | null; // null when not logged in
  account: Account | null;
  currentDay: Report | null;
  currentDayIndex: number;
  loading: boolean;
  setAccount: (account: Account) => void;
  signOuttaHere: () => void;
  pullTrigger: () => void;
}

const defaultValue: AuthContextModel = {
  user: null,
  account: null,
  currentDay: null,
  currentDayIndex: -1,
  loading: true,
  setAccount: () => {},
  signOuttaHere: () => {},
  pullTrigger: () => {},
};

const AuthContext = createContext(defaultValue);
export default AuthContext;
