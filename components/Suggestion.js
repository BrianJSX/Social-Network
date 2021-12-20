import React from "react";

function Suggestion(props) {
  return (
    <div className="flex items-center justify-between space-x-4 p-2">
      <img className="h-12 w-12 rounded-full" src="https://links.papareact.com/3ke"></img>
      <div className="flex-1">
        <div className="text-md font-bold">{props.username}</div>
        <div className="text-sm text-gray-400">{props.company}</div>
      </div>
      <button className="text-md text-blue-400">Theo dõi</button>
    </div>
  );
}

export default Suggestion;
