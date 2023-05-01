import { useContext, useState } from "react";
import "./App.css";
import Header from "./components/structure/Header";
import Main from "./components/structure/Main";
import AuthContext from "./context/AuthContext";
import SignInSignUp from "./components/structure/SignInSignUp";
import UpdateProfileForm from "./components/profiles/UpdateProfileForm";

function App() {
  const { account } = useContext(AuthContext);

  return (
    <div className="App">
      <Header />
      {account ? (
        account.initialSetUp ? (
          <Main />
        ) : (
          <UpdateProfileForm />
        )
      ) : (
        <SignInSignUp />
      )}
    </div>
  );
}

export default App;
