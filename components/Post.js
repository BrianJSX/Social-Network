import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
// import { collection, onSnapshot, query, where } from "@firebase/firestore";
// import { db } from "../firebase";

function Post(props) {
  const { data: session } = useSession();
  return (
    <div className="bg-white mt-4 border-2 rounded-sm">
      {/* Header */}
      <div className="flex items-center p-2 space-x-2 border-b-2">
        <img
          className="rounded-full h-12 w-12 object-contain p-1 border"
          src={props.post?.avatar}
        ></img>
        <p className="flex-1 font-bold">
          {props.post?.username} <span className="!font-thin !text-gray-400 ">
          <Moment fromNow>{props.post?.timestamp?.toDate()}</Moment></span>
        </p>
        <DotsHorizontalIcon className="h-5 w-5"></DotsHorizontalIcon>
      </div>

      {/* image */}
      {props.post?.image ? (
        <img src={props.post?.image} className="w-full object-cover"></img>
      ) : (
        <div className="text-1xl p-3">{props.post?.caption}</div>
      )}

      {/* Button */}
      <div className="flex justify-between items-center p-2">
        <div className="flex items-center space-x-3">
          <HeartIcon className="btn"></HeartIcon>
          <ChatIcon className="btn"></ChatIcon>
          <PaperAirplaneIcon className="btn"></PaperAirplaneIcon>
        </div>
        <BookmarkIcon className="btn"></BookmarkIcon>
      </div>

      {/* caption */}
      {props.post?.image && (
        <p className="p-2 truncate">
          <span className="font-bold mr-1">{props.post?.username}</span>{" "}
          {props.post?.caption}
        </p>
      )}

      {/* input box */}
      {session && (
        <form className="flex item-center border-t-2">
          <EmojiHappyIcon className="h-7 w-7 m-2"></EmojiHappyIcon>
          <input
            type="text"
            placeholder="Thêm bình luận của bạn....."
            className="flex-1 focus:ring-transparent bg-gray-125 outline-none border-none"
          ></input>
          <button className="font-bold text-blue-400 m-2">Bình luận</button>
        </form>
      )}
    </div>
  );
}

export default Post;
