import fake from "faker";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Story from "./Story";


function Stories() {
  const [data, setData] = useState([]);
  const { data: session } = useSession()
  const user = useSelector((state) => state.users);


  useEffect(() => {
    const dataFake = [...Array(20)].map((_, index) => ({
      ...fake.helpers.contextualCard(),
      id: index,
    }));

    setData(dataFake);
  }, []);

  return (
    <div className="border-[1px] flex space-x-3 overflow-x-scroll p-5 scrollbar-thin scrollbar-thumb-black bg-white mt-6">
      {
        session && <Story img={user.avatar} username="Bạn"></Story>
      }
      {data.map((item, index) => {
        return (
          <Story
            key={item.id}
            username={item.username}
          ></Story>
        );
      })}
    </div>
  );
}

export default Stories;
