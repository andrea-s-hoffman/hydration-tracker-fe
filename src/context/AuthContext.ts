import { User } from "firebase/auth";
import { createContext } from "react";
import Account from "../models/Account";

export interface AuthContextModel {
  user: User | null; // null when not logged in
  account: Account | null;
  setAccount: (account: Account) => void;
  signOuttaHere: () => void;
}

const defaultValue: AuthContextModel = {
  user: null,
  account: null,
  setAccount: () => {},
  signOuttaHere: () => {},
};

const AuthContext = createContext(defaultValue);
export default AuthContext;
