import React, { useEffect, useState } from "react";
import MainLayout from "../../components/layouts/main";
import { useRouter } from "next/router";
import {
  ChevronDownIcon,
  UserIcon,
  DotsHorizontalIcon,
  NewspaperIcon,
} from "@heroicons/react/outline";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  limit,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "@firebase/firestore";
import { HeartIcon, ChatIcon, VideoCameraIcon } from "@heroicons/react/solid";

function Profile() {
  const router = useRouter();
  const { id } = router.query;
  const [info, setInfo] = useState();

  useEffect(() => {
    if (id) {
      const userRef = query(collection(db, "users"), where("uid", "==", id));

      onSnapshot(userRef, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setInfo(doc.data());
        });
      });
    }
  }, [db, id]);
  console.log(info)
  return (
    <React.Fragment>
      {info ? (
        <React.Fragment>
          <div className="md:max-w-5xl m-auto p-10">
            {/* Header */}
            <div className="flex">
              {/* Avatar */}
              <div className="flex justify-center flex-auto w-10">
                <img
                  className="w-[200px] h-[200px] border-[3px] p-2 rounded-full"
                  src={info.avatar}
                ></img>
              </div>
              {/* Action */}
              <div className="flex-auto w-64 p-5">
                {/* User */}
                <div className="flex">
                  <div className="flex space-x-3 items-center">
                    <div className="text-2xl">{info.username}</div>
                    {/* Message */}
                    <button className="border-[1px] bg-white rounded-md pl-2 pr-2 pt-1 pb-1 font-medium">
                      Nhắn tin
                    </button>
                    {/* Follow */}
                    <button className="border-[1px] bg-white rounded-md pl-7 pr-7 pt-1 pb-1">
                      <UserIcon className="w-5 h-5"></UserIcon>
                    </button>
                    {/* Action */}
                    <button className="border-[1px] bg-white rounded-md pl-2 pr-2 pt-1 pb-1">
                      <ChevronDownIcon className="w-5 h-5"></ChevronDownIcon>
                    </button>
                    {/* Action More */}
                    <DotsHorizontalIcon className="w-8 h-8 cursor-pointer"></DotsHorizontalIcon>
                  </div>
                </div>

                {/* INFO */}
                <div className="flex space-x-10 pt-10">
                  {/* Post */}
                  <div className="flex space-x-1">
                    <span className="font-medium">915</span>
                    <span>Bài viết</span>
                  </div>
                  {/* Follow */}
                  <div className="flex space-x-1">
                    <span className="font-medium">915</span>
                    <span>Người theo dõi</span>
                  </div>
                  {/* Following */}
                  <div className="flex space-x-1">
                    <span className="font-medium">915</span>
                    <span>Đang theo dõi</span>
                  </div>
                </div>

                {/* Name */}
                <div className="flex pt-8">{info.name}</div>
              </div>
            </div>
            <div className="flex flex-col mt-6">
              <hr></hr>
              {/* TAB */}
              <div className="flex justify-center space-x-8 mt-2">
                <div className="flex items-center space-x-1 cursor-pointer">
                  <NewspaperIcon className="w-6 h-6"></NewspaperIcon>
                  <span>HÌNH ẢNH </span>
                </div>
                <div className="flex items-center space-x-1 cursor-pointer">
                  <VideoCameraIcon className="w-6 h-6"></VideoCameraIcon>
                  <span>VIDEO </span>
                </div>
              </div>
              {/* POST */}
              <div className="grid gap-x-8 grid-cols-3 mt-5">
                {/* POST ITEM */}
                <div className="relative h-[300px] w-[300px] cursor-pointer ">
                  <img
                    className="absolute object-fill h-[300px] w-[300px] top-0 right-0 bottom-0 left-0 postHover "
                    src="https://anhdep123.com/wp-content/uploads/2021/02/hinh-nen-gai-xinh-full-hd-cho-dien-thoai.jpg"
                  ></img>
                  <div className="absolute h-[300px] w-[300px] infoPost">
                    {/* Info Post */}
                    <div className="flex content-center center-element space-x-2 text-lg">
                      {/* Like */}
                      <div className="flex text-white space-x-2 items-center">
                        <HeartIcon className="w-8 h-8"></HeartIcon>
                        <span>123</span>
                      </div>
                      {/* Comment */}
                      <div className="flex text-white space-x-2 items-center">
                        <ChatIcon className="w-8 h-8"></ChatIcon>
                        <span>123</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* And More */}
              </div>
            </div>
          </div>
        </React.Fragment>
      ) : "Loading"}
    </React.Fragment>
  );
}

Profile.Layout = MainLayout;

export default Profile;
