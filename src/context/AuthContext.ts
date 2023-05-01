import { User } from "firebase/auth";
import { createContext } from "react";
import Account from "../models/Account";
import { Report } from "../models/Report";

export interface AuthContextModel {
  user: User | null; // null when not logged in
  account: Account | null;
  currentDay: Report | null;
  setAccount: (account: Account) => void;
  signOuttaHere: () => void;
}

const defaultValue: AuthContextModel = {
  user: null,
  account: null,
  currentDay: null,
  setAccount: () => {},
  signOuttaHere: () => {},
};

const AuthContext = createContext(defaultValue);
export default AuthContext;
