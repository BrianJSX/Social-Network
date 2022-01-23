import { collection, onSnapshot, query, where } from "@firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import Feed from "../components/Feed";
import PostModal from "../components/PostModal";
import MainLayout from "../components/layouts/main";
import { db } from "../firebase";
import { loginSuccess } from "../features/users/usersSlice";

export default function Home() {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (session) {
      const userRef = query(
        collection(db, "users"),
        where("uid", "==", session?.user.uid)
      );
      //snapshot
      onSnapshot(query(userRef), (snapshot) => {
        snapshot.docs.map((doc) => {
          dispatch(loginSuccess(doc.data()));
        });
      });
    }
  }, [db, session]);

  return (
    <div>
      {/* Feed */}
      <Feed></Feed>
    </div>
  );
}

Home.Layout = MainLayout;
