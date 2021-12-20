import React, { useEffect, useState } from "react";
import fake from "faker";
import Suggestion from "./Suggestion";

function Suggestions() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const dataFake = [...Array(5)].map((_, index) => ({
      ...fake.helpers.contextualCard(),
      id: index,
    }));
    setData(dataFake);
  }, []);

  return (
    <div className="m-5">
      <div className="flex items-center justify-between">
        <div className="text-gray-400 text-sm">Những người bạn có thể bạn biết</div>
        <button>Xem tất cả</button>
      </div>
      <div className="">
        {data.map((item, index) => {
          return (
            <Suggestion
              key={index}
              id={item.id}
              img={item.avatar}
              username={item.username}
              company={item.company.name}
            ></Suggestion>
          );
        })}
      </div>
    </div>
  );
}

export default Suggestions;
