import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "@firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MainLayout from "../../components/layouts/main";
import PostModal from "../../components/PostModal";
import { db } from "../../firebase";

export default function Posts() {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState(null);
  const [listImages, setListImages] = useState([]);

  useEffect(async () => {
    //image
    if (id) {
      onSnapshot(collection(db, "posts", id, "images"), (snapshot) => {
        setListImages([]);
        snapshot.docs.map((doc) => {
          setListImages((preState) => [...preState, doc.data()]);
        });
      });

      const q = query(collection(db, "posts"), where("post_id", "==", id));
      const querySnapshot = await getDocs(q);
      querySnapshot.docs.map((doc) => {
        setData(doc.data());
      });

    } else {
      return router.back();
    }
  }, [db, id]);


  return (
    <div className="post overflow-y-hidden">
      <PostModal post_id={id} images={listImages} post={data}></PostModal>
    </div>
  );
}

Posts.Layout = MainLayout;
