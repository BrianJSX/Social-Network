import React from "react";
import Stories from "./Stories";
import Posts from "./Posts";
import MiniProfile from "./MiniProfile";
import Suggestions from "./Suggestions";
import { useSession, signIn, signOut } from "next-auth/react";
import InputPost from "./InputPost";

function Feed() {
  const { data: session } = useSession();
  
  return (
    <div
      className={`${
        !session && "!grid-cols-1 !max-w-3xl"
      } grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-6 xl:max-w-[59rem] mx-auto`}
    >
      <section className="col-span-4">
        {/* Stories */}
        <Stories></Stories>
        {/* Input Post */}
        {session && <InputPost></InputPost>}
        {/* Post */}
        <Posts></Posts>
      </section>

      {session && (
        <section className="hidden xl:inline-block md:col-span-1 xl:col-span-1">
          <div className="fixed top-24 ml-5 border-[1px] rounded-md bg-white">
            {/* Mini profile */}
            <MiniProfile></MiniProfile>
            <hr></hr>
            {/* Suggestion */}
            <Suggestions></Suggestions>
          </div>
        </section>
      )}
    </div>
  );
}

export default Feed;
