import React from "react";

function Story(props) {
  return (
    <div>
      <img
        className="h-[80px] border-yellow-600 object-contain w-[78px] p-[2px] hover:scale-110 cursor-pointer transition duration-150 ease-out rounded-full border-4"
        src={props.img ? props.img :  "https://links.papareact.com/3ke"}
      />
      <p className="text-base w-20 truncate text-center">{props.username}</p>
    </div>
  );
}

export default Story;
