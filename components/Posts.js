import {
  collection, getDocs, limit,
  onSnapshot,
  orderBy,
  query,
  startAfter
} from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { db } from "../firebase";
import Post from "./Post";


function Posts() {
  const [posts, setPost] = useState([]);
  const [lastDoc, setLastDoc] = useState(0);
  const [stopLoadmore, setStopLoadmore] = useState(null);

  useEffect(() => {
    const postsRef = query(
      collection(db, "posts"),
      orderBy("timestamp", "desc"),
      limit(10)
    );
    const queryPost = onSnapshot(query(postsRef), (snapshot) => {
      setPost(snapshot.docs);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      setStopLoadmore(null)
    });
    return () => queryPost();
  }, [db]);

  const handleLoadmore = async () => {
    const postsRef = query(
      collection(db, "posts"),
      orderBy("timestamp", "desc"),
      startAfter(lastDoc),
      limit(10)
    );
    const documentSnapshots = await getDocs(postsRef);
    const length = documentSnapshots.docs.length;
    if (length !== 0) {
      documentSnapshots.docs.map((post) => {
        posts.push(post);
      });
      setLastDoc(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
    } else {
      toast.success('Bạn đã xem hết tin !', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      setStopLoadmore(true);
    }
  };

  return (
    <div>
      {/* POST */}
      {posts?.map((post, index) => {
        return <Post key={index} post={post.data()}></Post>;
      })}
      {/* LOAD MORE */}
      {!stopLoadmore && (
        <div className="flex justify-center mt-5">
          <button  onClick={handleLoadmore} class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Xem thêm
          </button>
        </div>
      )}
    </div>
  );
}

export default Posts;
