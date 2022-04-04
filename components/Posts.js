import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from "@firebase/firestore";
import React, { useEffect, useState, useMemo } from "react";
import { db } from "../firebase";
import Post from "./Post";
import InfiniteScroll from "react-infinite-scroll-component";
import { css } from "@emotion/react";
import MyLoading from "./MyLoading";
import router from "next/router";

function Posts() {
  const [posts, setPost] = useState([]);
  const [lastDoc, setLastDoc] = useState(0);
  const [stopLoadmore, setStopLoadmore] = useState(null);

  const override = css`
    display: flex;
    flex: 1;
    justify-content: center;
    margin: 20px;
  `;

  useEffect(() => {
    const postsRef = query(
      collection(db, "posts"),
      orderBy("timestamp", "desc"),
      limit(10)
    );

    const queryPost = onSnapshot(query(postsRef), (snapshot) => {
      setPost(snapshot.docs);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      setStopLoadmore(null);
    });
    return () => queryPost();
  }, [db]);

  const handleLoadmore = async () => {
    if (posts.length > 0) {
      const postsRef = query(
        collection(db, "posts"),
        orderBy("timestamp", "desc"),
        startAfter(lastDoc),
        limit(5)
      );
      const documentSnapshots = await getDocs(postsRef);
      const length = documentSnapshots.docs.length;

      if (length > 0) {
        setStopLoadmore(null);
        documentSnapshots.docs.map((post) => {
          posts.push(post);
        });
        setLastDoc(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
      } else {
        setStopLoadmore(true);
      }
    }
  };

  return (
    <div>
      {posts.length == 0 ? (
        <React.Fragment>
          <div className="flex bg-white p-10 border-[1px] mt-2 rounded-md">
              Chưa có bài viết nào
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <InfiniteScroll
            dataLength={posts.length}
            next={handleLoadmore}
            hasMore={true}
            loader={!stopLoadmore && <MyLoading></MyLoading>}
          >
            {posts?.map((post, index) => {
              return <Post key={index} id={post.id} post={post.data()}></Post>;
            })}
          </InfiniteScroll>
        </React.Fragment>
      )}
    </div>
  );
}

export default Posts;
