import { css } from "@emotion/react";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import {
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import { Picker } from "emoji-mart";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScaleLoader from "react-spinners/ScaleLoader";
import { toast } from "react-toastify";
import { isLoading } from "../features/loading/loadingSlice";
import { db, storage } from "../firebase";

function InputPost() {
  const { data: session } = useSession();
  const filePickerRef = useRef(null);

  //state
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState([]);
  const [showEmoij, setShowEmoij] = useState(false);

  //gobal state
  const loading = useSelector((state) => state.loading.isLoading);
  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const override = css`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
  `;

  const addImagePost = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const reader = new FileReader();
      if (e.target.files[i]) {
        reader.readAsDataURL(e.target.files[i]);
      }
      reader.onload = (file) => {
        let data = {
          id: Math.random(),
          src: String(file.target.result),
        };
        setSelectedFile((preState) => [...preState, data]);
      };
    }
  };

  const addEmoijIcon = (emoji) => {
    setInput((input += emoji.native));
  };

  const handleRemoveAllImage = () => {
    setSelectedFile([]);
    filePickerRef.current.value = null;
  };

  const handleRemoveOneImage = (index) => {
    const newArr = selectedFile.filter((item) => item !== selectedFile[index]);
    setSelectedFile(newArr);
  };

  const sendPost = async () => {
    dispatch(isLoading(true));
    setInput("");
    setSelectedFile([]);
    setShowEmoij(false);

    const docRef = await addDoc(collection(db, "posts"), {
      uid: user.uid,
      avatar: user.avatar,
      username: user.username,
      name: user.name,
      caption: input,
      timestamp: serverTimestamp(),
    });

    await updateDoc(doc(db, "posts", docRef.id), {
      post_id: docRef.id,
    });

    if (selectedFile) {
      selectedFile.map(async (image, index) => {
        const imageRef = ref(storage, `posts/${docRef.id}/${image.id}/image`);

        await uploadString(imageRef, image.src, "data_url").then(
          async () => {
            const dataUrl = await getDownloadURL(imageRef);
            await addDoc(collection(db, "posts", docRef.id, "images"), {
              original: dataUrl,
              thumbnail: dataUrl,
              originalHeight: "100%"
            });
          }
        );
      });
    }

    dispatch(isLoading(false));
    toast.success("Đăng bài thành công !!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="bg-white border-[1px] rounded-lg p-3 mt-5 space-x-5 relative">
      {/* Loading */}
      {loading && (
        <ScaleLoader
          color="#000000"
          loading={loading}
          css={override}
          height={50}
          width={8}
          radius={2}
          margin={2}
        />
      )}
      {/* SHOW EMOIJ */}
      {showEmoij && (
        <Picker
          onSelect={addEmoijIcon}
          style={{
            zIndex: 10000,
            position: "absolute",
            top: 150,
          }}
        ></Picker>
      )}
      <div className="flex items-center">
        {/* AVATAR */}
        <img
          className="h-10 w-10 object-contain border-[1px] rounded-full cursor-pointer"
          src={user.avatar}
        ></img>

        {/* FORM */}
        <div className="w-full border-[1px] rounded-lg m-3">
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
              multiple
              onChange={addImagePost}
              ref={filePickerRef}
              hidden
            ></input>
          </div>

          {/* EMOIJ */}
          <div
            onClick={() => setShowEmoij(!showEmoij)}
            className="flex items-center space-x-1 cursor-pointer hover:text-blue-500"
          >
            <EmojiHappyIcon className="h-8 w-8 "></EmojiHappyIcon>
            <span className="text-lg">Cảm xúc</span>
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
      {selectedFile?.length == 1 && (
        <div className="relative m-3 border-[1px]">
          <div className="absolute w-10 h-10 top-1 left-5">
            <XIcon
              onClick={handleRemoveAllImage}
              className="cursor-pointer"
            ></XIcon>
          </div>
          <img
            className="h-96 cursor-pointer object-fill mx-auto"
            src={selectedFile[0]?.src}
          ></img>
        </div>
      )}

      {/* SHOW IMAGE */}
      {selectedFile?.length > 1 && (
        <div className="relative m-5 border-[1px] p-2 rounded-md">
          <XCircleIcon
            onClick={handleRemoveAllImage}
            className="w-8 h-8 cursor-pointer absolute z-10 right-2"
          ></XCircleIcon>
          <div className="flex overflow-auto space-x-2">
            {selectedFile.map((item, index) => (
              <div className="flex-shrink-0 relative mt-10  mb-2">
                <XIcon
                  onClick={() => handleRemoveOneImage(index)}
                  className="w-8 h-8 cursor-pointer absolute text-white right-0"
                ></XIcon>
                <img
                  className="w-[150px] h-[150px] rounded-md"
                  src={item.src}
                ></img>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default InputPost;
