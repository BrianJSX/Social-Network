import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "@firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Feed from "../components/Feed";
import MainLayout from "../components/layouts/main";
import { loginSuccess } from "../features/users/usersSlice";
import { db } from "../firebase";
import { useRouter } from "next/router";
import PostModal from "../components/PostModal";

export default function Home() {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const { openPost, postId } = router.query;
  const [data, setData] = useState(null);
  const [listImages, setListImages] = useState([]);

  useEffect(() => {
    if (session?.user?.uid) {
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

  useEffect(async () => {
    if (openPost && postId) {
      onSnapshot(collection(db, "posts", postId, "images"), (snapshot) => {
        setListImages([]);
        snapshot.docs.map((doc) => {
          setListImages((preState) => [...preState, doc.data()]);
        });
      });

      const q = query(collection(db, "posts"), where("post_id", "==", postId));
      const querySnapshot = await getDocs(q);
      querySnapshot.docs.map((doc) => {
        setData(doc.data());
      });

      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  }, [db, postId, openPost]);

  return (
    <div>
      {/* Feed */}
      <Feed></Feed>
      {/* Modal */}
      {openModal && (
        <PostModal post_id={postId} images={listImages} post={data}></PostModal>
      )}
    </div>
  );
}

Home.Layout = MainLayout;
