import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import {
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { Picker } from "emoji-mart";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import { db, storage } from "../firebase";
import ScaleLoader from "react-spinners/ScaleLoader";
import { css } from "@emotion/react";
import { useSelector, useDispatch } from "react-redux";
import { isLoading } from "../features/loading/loadingSlice";

function InputPost() {
  const { data: session } = useSession();
  const filePickerRef = useRef(null);

  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmoij, setShowEmoij] = useState(false);

  const loading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();
  const override = css`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  `;

  const addImagePost = (e) => {
    const reader = new FileReader();

    if (e.target.files[0] && e.target.files[0].type == "image/png") {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (file) => {
      console.log(file);
      setSelectedFile(file.target.result);
    };
  };

  const addEmoijIcon = (emoji) => {
    setInput((input += emoji.native));
  };

  const sendPost = async () => {
    await dispatch(isLoading(true));
    
    const docRef = await addDoc(collection(db, "posts"), {
      uid: session.user.uid,
      caption: input,
      timestamp: serverTimestamp(),
    });
    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const dataUrl = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: dataUrl,
        });
      });
      await dispatch(isLoading(false));
    }
    setInput("");
    setSelectedFile(null);
    setShowEmoij(false);
  };

  return (
    <div className="bg-white border-2 rounded-lg p-3 mt-5 space-x-5 relative">
      {/* Loading */}
      <ScaleLoader
        color="#000000"
        loading={loading}
        css={override}
        size={250}
      />
      <div className="flex items-center">
        {/* AVATAR */}
        <img
          className="h-10 w-10 object-contain border-2 rounded-full cursor-pointer"
          src={session.user?.image}
        ></img>

        {/* FORM */}
        <div className="w-full border-2 rounded-lg m-3">
          <div>
            <textarea
              className="overflow-y-hidden tracking-wide bg-transparent rounded-xl w-full border-transparent focus:ring-transparent focus:border-transparent"
              value={input}
              placeholder="Hôm nay bạn cảm thấy như thế nào ??"
              rows={1}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>

      {/* BUTTON */}
      <div className="flex items-center space-x-3 justify-between !mx-10 p-2">
        <div className="flex space-x-3">
          {/* PHOTO */}
          <div
            onClick={() => filePickerRef.current.click()}
            className="flex items-center space-x-1 cursor-pointer hover:text-blue-500"
          >
            <PhotographIcon className="h-8 w-8 cursor-pointer"></PhotographIcon>
            <span className="text-lg">Ảnh/Video</span>
            <input
              type="file"
              onChange={addImagePost}
              ref={filePickerRef}
              hidden
            ></input>
          </div>

          {/* EMOIJ */}
          <div
            onClick={() => setShowEmoij(!showEmoij)}
            className="flex items-center space-x-1 cursor-pointer hover:text-blue-500 relative"
          >
            <EmojiHappyIcon className="h-8 w-8 "></EmojiHappyIcon>
            <span className="text-lg">Cảm xúc</span>

            {/* SHOW EMOIJ */}
            {showEmoij && (
              <Picker
                onSelect={addEmoijIcon}
                style={{
                  position: "absolute",
                  zIndex: 100,
                  top: 35,
                  left: -100,
                }}
              ></Picker>
            )}
          </div>
        </div>

        {/* BUTTON SEND */}
        <button
          disabled={!input.trim()}
          onClick={sendPost}
          class={`bg-blue-500 text-white font-bold py-2 px-4 rounded-full ${
            !input.trim() && "cursor-not-allowed bg-blue-300"
          }`}
        >
          Đăng
        </button>
      </div>

      {/* SHOW IMAGE */}
      {selectedFile && (
        <div className="relative m-3 border-2">
          <div className="absolute w-10 h-10 top-1 left-5">
            <XIcon
              onClick={() => setSelectedFile(null)}
              className="cursor-pointer"
            ></XIcon>
          </div>
          <img
            className="w-full h-96 cursor-pointer mx-auto"
            src={selectedFile}
          ></img>
        </div>
      )}
    </div>
  );
}

export default InputPost;
