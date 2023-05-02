import { useContext, useEffect, useState } from "react";
import "./App.css";
import Header from "./components/structure/Header";
import Main from "./components/structure/Main";
import AuthContext from "./context/AuthContext";
import SignInSignUp from "./components/structure/SignInSignUp";
import UpdateProfileForm from "./components/profiles/UpdateProfileForm";
import Footer from "./components/structure/Footer";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Profile from "./components/profiles/Profile";

function App() {
  const { account } = useContext(AuthContext);
  const [todaysGoalMet, setTodaysGoalMet] = useState(false);
  useEffect(() => {
    const today = new Date();
    const month = today.getMonth();
    const date = today.getDate();
    const year = today.getFullYear();
    let todaysReport = null;
    if (account) {
      todaysReport = account.dailyReports.find(
        (report) =>
          new Date(report?.day).getDate() === date &&
          new Date(report?.day).getMonth() === month &&
          new Date(report?.day).getFullYear() === year
      );
    }
    if (todaysReport?.goalMet) {
      setTodaysGoalMet(true);
    }
  }, [account]);
  return (
    <div className={`App${todaysGoalMet ? " done" : ""}`}>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              account ? (
                account.initialSetUp ? (
                  <Main />
                ) : (
                  <UpdateProfileForm />
                )
              ) : (
                <SignInSignUp />
              )
            }
          />
          <Route path="/my-profile" element={<UpdateProfileForm />} />
          <Route path="/profile/:uid" element={<Profile />} />
        </Routes>
        {account && <Footer />}
      </Router>
    </div>
  );
}

export default App;
