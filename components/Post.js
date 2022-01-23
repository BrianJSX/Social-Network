import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "@firebase/firestore";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/solid";
import { HeartIcon as HeartIconLiked } from "@heroicons/react/solid";
import { Picker } from "emoji-mart";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import ImageGallery from "react-image-gallery";
import ShowMoreText from "./ShowMoreText";

function Post(props) {
  const user = useSelector((state) => state.users);
  const { data: session } = useSession();

  const [liked, setLiked] = useState(null);
  const [likes, setLikes] = useState(null);

  const [comments, setComments] = useState(null);
  const [listImages, setListImages] = useState([]);
  const [images, setImages] = useState([]);

  const [input, setInput] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);

  const refInputForm = useRef();

  useEffect(() => {
    //image
    onSnapshot(collection(db, "posts", props.id, "images"), (snapshot) => {
      setListImages(snapshot.docs);
    });

    // Like
    onSnapshot(collection(db, "posts", props.id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });

    // Comment
    onSnapshot(
      query(
        collection(db, "posts", props.id, "comments"),
        orderBy("timestamp", "desc"),
        limit(2)
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
  }, [db, props.id]);

  useEffect(() => {
    setLiked(likes?.findIndex((like) => like.id == user.uid) !== -1);
  }, [likes]);

  useEffect(() => {
    setImages([]);
    listImages.map((doc) => {
      setImages((preState) => [...preState, doc.data()]);
    });
  }, [listImages]);

  const handleInputForcus = () => {
    refInputForm.current.focus();
  };

  // Handle Like
  const handleUnLiked = async () => {
    await deleteDoc(doc(db, "posts", props.id, "likes", user.uid));
    setLiked(false);
  };

  const handleLike = async () => {
    await setDoc(doc(db, "posts", props.id, "likes", user.uid), {
      username: user.username,
    });
    setLiked(true);
  };

  //Handle Emoji
  const handleEmoji = () => {
    setOpenEmoji(!openEmoji);
  };

  //Handle Input
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleAddEmoji = (e) => {
    setInput((input += e.native));
  };

  // Handle Comment
  const handleAddComment = async () => {
    await addDoc(collection(db, "posts", props.id, "comments"), {
      username: user.username,
      avatar: user.avatar,
      comment: input,
      timestamp: serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="bg-white mt-4 border-[1px] rounded-sm">
      {/* Header */}
      <div className="flex items-center p-2 space-x-2 border-b-2">
        <img
          className="rounded-full h-12 w-12 object-contain p-1 border"
          src={props.post?.avatar}
        ></img>
        <p className="flex-1 font-bold">
          {props.post?.username}{" "}
          <span className="!font-thin !text-gray-400 ">
            <Moment fromNow>{props.post?.timestamp?.toDate()}</Moment>
          </span>
        </p>
        <DotsHorizontalIcon className="h-5 w-5"></DotsHorizontalIcon>
      </div>

      {images.length > 0 ? (
        <React.Fragment>
          <ImageGallery
            showPlayButton={false}
            showFullscreenButton={false}
            showThumbnails={false}
            showBullets={true}
            renderLeftNav={(onClick, disabled) => (
              <ArrowCircleLeftIcon
                onClick={onClick}
                disabled={disabled}
                className="w-11 h-11 absolute left-3 top-[50%] z-10 cursor-pointer text-gray-300 rounded-full"
              ></ArrowCircleLeftIcon>
            )}
            renderRightNav={(onClick, disabled) => (
              <ArrowCircleRightIcon
                onClick={onClick}
                disabled={disabled}
                className="w-11 h-11 absolute right-3 top-[50%] z-10 cursor-pointer text-gray-200 rounded-full"
              ></ArrowCircleRightIcon>
            )}
            className="w-full object-cover"
            items={images}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="text-1xl p-3 break-all">
            <ShowMoreText text={props.post?.caption}></ShowMoreText>
          </div>
        </React.Fragment>
      )}

      {/* Button */}
      {session && (
        <React.Fragment>
          <div className="flex justify-between items-center p-2">
            <div className="flex items-center space-x-3">
              {liked ? (
                <HeartIconLiked
                  onClick={handleUnLiked}
                  className="btn btnLiked"
                ></HeartIconLiked>
              ) : (
                <HeartIcon onClick={handleLike} className="btn"></HeartIcon>
              )}
              <Link href={`/posts/${props.id}`}>
                <ChatIcon className="btn"></ChatIcon>
              </Link>
              <PaperAirplaneIcon className="btn"></PaperAirplaneIcon>
            </div>
            <BookmarkIcon className="btn"></BookmarkIcon>
          </div>
        </React.Fragment>
      )}

      {/* count like */}
      {likes?.length > 0 && (
        <div className="flex pl-2  font-bold">{likes?.length} Likes</div>
      )}

      {/* caption */}
      {images.length > 0 && (
        <p className="p-2 break-all">
          <span className="font-bold mr-1">{props.post?.username}</span>
          <ShowMoreText text={props.post?.caption}></ShowMoreText>
        </p>
      )}

      {/* comment */}
      <hr></hr>
      {comments?.length > 0 && (
        <div className="relative p-2">
          {comments?.map((doc) => {
            return (
              <div className="flex">
                <p>
                  <span className="user font-bold mr-1">
                    {doc.data().username}
                  </span>
                  <span className="font-thin break-all p-1">
                    {doc.data().comment.length > 50 ? (
                      <React.Fragment>
                        <ShowMoreText text={doc.data().comment}></ShowMoreText>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>{doc.data().comment}</React.Fragment>
                    )}
                  </span>
                </p>
              </div>
            );
          })}
          {comments?.length >= 2 && (
            <Link href={`/posts/${props.id}`}>
              <div className="cursor-pointer text-gray-400">
                Xem tất cả bình luận
              </div>
            </Link>
          )}
        </div>
      )}

      {/* input box */}
      {session && (
        <div className="relative">
          <div className="flex item-center border-t-2">
            {/* Emoji */}
            <EmojiHappyIcon
              onClick={handleEmoji}
              className="h-7 w-7 m-2 cursor-pointer"
            ></EmojiHappyIcon>

            {/* Input */}
            <input
              ref={refInputForm}
              value={input}
              onChange={handleInput}
              type="text"
              placeholder="Thêm bình luận của bạn....."
              className="flex-1 focus:ring-transparent bg-gray-125 outline-none border-none"
            ></input>

            {/* Button */}
            <button
              onClick={handleAddComment}
              className="font-bold text-blue-400 m-2"
            >
              Bình luận
            </button>
          </div>
          {openEmoji && (
            <div className="absolute" style={{ zIndex: 10000 }}>
              <Picker onSelect={handleAddEmoji} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Post;
