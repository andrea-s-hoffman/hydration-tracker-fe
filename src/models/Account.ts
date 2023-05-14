import { Report } from "./Report";

export default interface Account {
  _id?: string;
  uid: string;
  initialSetUp: boolean;
  userName: string;
  email: string;
  password: string | null;
  avatar: string;
  accountCreated: Date;
  lastCheckIn: Date | null;
  dailyGoalOz: number;
  streakCount: number;
  dailyReports: Report[];
  friends: string[];
  notifications: Notification[];
}
