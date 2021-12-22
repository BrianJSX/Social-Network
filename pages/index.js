import Header from "../components/Header";
import Feed from "../components/Feed";
import MainLayout from "../components/layouts/main";
import { useDispatch, useSelector } from "react-redux";
import { isLoading } from "../features/loading/loadingSlice";


export default function Home() {
  return (
    <div>
      {/* Feed */}
      <Feed></Feed>
      {/* modal */}
    </div>
  );
}

Home.Layout = MainLayout;
