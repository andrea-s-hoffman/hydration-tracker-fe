import axios from "axios";
import Account from "../models/Account";
import LogInCreds from "../models/LogInCreds";

const baseUrl: string = process.env.REACT_APP_API_URL || "";

export const lookForAccount = (uid: string): Promise<Account | null> => {
  return axios
    .get(`${baseUrl}/accounts/check/${uid}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const signInWithCreds = (creds: LogInCreds): Promise<Account> => {
  return axios
    .get(`${baseUrl}/accounts/login`, {
      params: {
        email: creds.email,
        password: creds.password,
        userName: creds.userName,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const addAccount = (account: Account): Promise<Account> => {
  return axios
    .post(`${baseUrl}/accounts`, account)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const updateAccount = (account: Account): Promise<Account> => {
  return axios
    .put(`${baseUrl}/accounts/${account.uid}`, account)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
