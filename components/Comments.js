import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
  getDoc,
  getDocs,
  documentId,
} from "@firebase/firestore";
import { db } from "../firebase";
import ShowMoreText from "./ShowMoreText";
import Moment from "react-moment";

function Comments(props) {
  const [user, setUser] = useState();

  useEffect(async () => {
    // users
    const userRef = query(
      collection(db, "users"),
      where("uid", "==", props.user.userId)
    );

    onSnapshot(userRef, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    });
    
  }, [db, user]);

  return (
    <div>
      <React.Fragment>
        <div className="flex">
          <div className="flex items-center p-2 space-x-2">
            <img
              className="rounded-full h-12 w-12 object-contain p-1 border-[1px]"
              src={user?.avatar}
            ></img>
            <p className="flex-1 space-x-1">
              <span className=" font-medium">{user?.username}</span>
              <span className="!font-thin break-all">
                <ShowMoreText text={props.user.comment}></ShowMoreText>
              </span>
              <span>
                <Moment className="text-xs p-1 text-gray-300" fromNow>
                  {props.user.timestamp?.toDate()}
                </Moment>
              </span>
            </p>
          </div>
        </div>
      </React.Fragment>
    </div>
  );
}

export default Comments;
