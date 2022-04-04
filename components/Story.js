import React from "react";

function Story(props) {
  return (
    <div>
      <img
        className="h-[80px] border-yellow-600 object-contain w-[78px] p-[2px] hover:scale-110 cursor-pointer transition duration-150 ease-out rounded-full border-4"
        src={props.img ? props.img :  "https://anhdep123.com/wp-content/uploads/2021/02/hinh-nen-gai-xinh-full-hd-cho-dien-thoai.jpg"}
      />
      <p className="text-base w-20 truncate text-center">{props.username}</p>
    </div>
  );
}

export default Story;
