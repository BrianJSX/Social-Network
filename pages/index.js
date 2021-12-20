import Header from "../components/Header";
import Feed from "../components/Feed";
import MainLayout from "../components/layouts/main";

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
