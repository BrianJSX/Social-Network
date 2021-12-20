import fake from "faker";
import React, { useEffect, useState } from "react";
import Story from "./Story";
import { useSession, signIn, signOut } from "next-auth/react"


function Stories() {
  const [data, setData] = useState([]);
  const { data: session } = useSession()

  useEffect(() => {
    const dataFake = [...Array(20)].map((_, index) => ({
      ...fake.helpers.contextualCard(),
      id: index,
    }));

    setData(dataFake);
  }, []);

  return (
    <div className="border-2 flex space-x-3 overflow-x-scroll p-5 scrollbar-thin scrollbar-thumb-black bg-white mt-6">
      {
        session && <Story img={session.user?.image} username="Bạn"></Story>
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
