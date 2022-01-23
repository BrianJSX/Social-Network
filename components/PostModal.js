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
} from "@firebase/firestore";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
  XIcon,
} from "@heroicons/react/outline";
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
  HeartIcon as HeartIconLiked,
} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import ImageGallery from "react-image-gallery";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import { Picker } from "emoji-mart";
import ShowMoreText from "./ShowMoreText";

function PostModal(props) {
  const router = useRouter();
  const images = props.images;
  const { data: session } = useSession();
  const refInputForm = useRef();
  const user = useSelector((state) => state.users);

  const [liked, setLiked] = useState(null);
  const [likes, setLikes] = useState(null);
  const [comments, setComments] = useState(null);

  const [input, setInput] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);

  useEffect(() => {
    if (props.post_id) {
      // Like
      onSnapshot(
        collection(db, "posts", props.post_id, "likes"),
        (snapshot) => {
          setLikes(snapshot.docs);
        }
      );

      // Comment
      onSnapshot(
        query(
          collection(db, "posts", props.post_id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setComments(snapshot.docs);
        }
      );
    }
  }, [db, props.post_id]);

  useEffect(() => {
    setLiked(likes?.findIndex((like) => like.id == user.uid) !== -1);
  }, [likes]);

  // Handle Like
  const handleUnLiked = async () => {
    await deleteDoc(doc(db, "posts", props.post_id, "likes", user.uid));
    setLiked(false);
  };

  const handleLike = async () => {
    await setDoc(doc(db, "posts", props.post_id, "likes", user.uid), {
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
    await addDoc(collection(db, "posts", props.post_id, "comments"), {
      username: user.username,
      avatar: user.avatar,
      comment: input,
      timestamp: serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div class="fixed z-50 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
          <div className="absolute right-4 top-4">
            <XIcon
              onClick={() => router.back()}
              className="w-10 h-10 text-white cursor-pointer"
            ></XIcon>
          </div>
        </div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>

        <div
          class={`inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all sm:align-middle  ${
            props.images?.length > 0 ? "sm:max-w-6xl" : "sm:max-w-3xl"
          }  sm:w-full`}
        >
          <div
            className={`grid  ${
              images?.length > 0 ? "grid-cols-2" : "grid-cols-1 h-[550px]"
            }`}
          >
            {images?.length > 0 && (
              <ImageGallery
                additionalClass="image"
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
                items={props?.images}
              />
            )}
            <div className="grid-cols-1">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center p-2 space-x-2 border-b-[1px]">
                  <img
                    className="rounded-full h-12 w-12 object-contain p-1 border"
                    src={props.post?.avatar}
                  ></img>
                  <p className="flex-1 font-medium space-x-2">
                    <span>{props.post?.username}</span>
                    <span className="!font-thin !text-gray-400 "></span>
                  </p>
                  <DotsHorizontalIcon className="h-5 w-5"></DotsHorizontalIcon>
                </div>

                {/* Caption */}
                {images?.length > 0 ? (
                  <React.Fragment>
                    <div className="flex-auto h-72 border-b-[1px] overflow-y-auto overflow-hidden">
                      <div className="flex items-center p-2 space-x-2">
                        <img
                          className="rounded-full h-12 w-12 object-contain p-1 border-[1px]"
                          src={props.post?.avatar}
                        ></img>
                        <p className="flex-1 space-x-1 flex-wrap break-all">
                          <span className=" font-medium">
                            {props.post?.username}
                          </span>
                          <span className="!font-thin">
                            <ShowMoreText
                              text={props.post?.caption}
                            ></ShowMoreText>
                          </span>
                          <Moment className="text-xs p-1 text-gray-300" fromNow>
                            {props.post?.timestamp?.toDate()}
                          </Moment>
                        </p>
                      </div>

                      {/* Comment */}
                      {comments?.map((doc) => (
                        <React.Fragment>
                          <div className="flex">
                            <div className="flex items-center p-2 space-x-2">
                              <img
                                className="rounded-full h-12 w-12 object-contain p-1 border-[1px]"
                                src={doc.data().avatar}
                              ></img>
                              <p className="flex-1 space-x-1">
                                <span className=" font-medium">
                                  {doc.data().username}
                                </span>
                                <span className="!font-thin break-all">
                                  <ShowMoreText
                                    text={doc.data().comment}
                                  ></ShowMoreText>
                                </span>
                                <span>
                                  <Moment
                                    className="text-xs p-1 text-gray-300"
                                    fromNow
                                  >
                                    {doc.data().timestamp?.toDate()}
                                  </Moment>
                                </span>
                              </p>
                            </div>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div className="max-h-40 m-2 overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-black">
                      <p className="text-xl break-all">
                        <ShowMoreText text={props.post?.caption}></ShowMoreText>
                      </p>
                    </div>
                    {comments?.length > 0 ? (
                      <div className="flex-auto h-32 overflow-hidden overflow-y-auto border-t-[1px] scrollbar-thin scrollbar-thumb-black">
                        {comments?.map((doc) => (
                          <React.Fragment>
                            <div className="flex">
                              <div className="flex items-center p-2 space-x-2">
                                <img
                                  className="rounded-full h-12 w-12 object-contain p-1 border-[1px]"
                                  src={doc.data().avatar}
                                ></img>
                                <p className="flex-1 space-x-1">
                                  <span className=" font-medium">
                                    {doc.data().username}
                                  </span>
                                  <span className="!font-thin break-all">
                                    <ShowMoreText
                                      text={doc.data().comment}
                                    ></ShowMoreText>
                                  </span>
                                  <span>
                                    <Moment className="text-xs p-3" fromNow>
                                      {doc.data().timestamp?.toDate()}
                                    </Moment>
                                  </span>
                                </p>
                              </div>
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    ) : (
                      <div className="p-3 border-[1px]">Chưa có bình luận</div>
                    )}
                  </React.Fragment>
                )}

                {/* Action */}
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
                          <HeartIcon
                            onClick={handleLike}
                            className="btn"
                          ></HeartIcon>
                        )}
                        <ChatIcon className="btn"></ChatIcon>
                        <PaperAirplaneIcon className="btn"></PaperAirplaneIcon>
                      </div>
                      <BookmarkIcon className="btn"></BookmarkIcon>
                    </div>
                    {likes?.length > 0 && (
                      <div className="flex pl-2 font-bold">
                        {likes?.length} Likes
                      </div>
                    )}
                    <div className="flex p-2 text-xs relative">
                      <Moment fromNow>{props.post?.timestamp?.toDate()}</Moment>
                      {openEmoji && (
                        <div
                          className="absolute z-50 bg-gray-300"
                          style={{ top: -400 }}
                        >
                          <Picker onSelect={handleAddEmoji} />
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                )}

                {/* Input Comment */}
                {session && (
                  <React.Fragment>
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
                    </div>
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostModal;
