import React from "react";
import Stories from "./Stories";
import Posts from "./Posts";
import MiniProfile from "./MiniProfile";
import Suggestions from "./Suggestions";
import { useSession, signIn, signOut } from "next-auth/react";

function Feed() {
  const { data: session } = useSession();
  return (
    <div className={`${!session && "!grid-cols-1 !max-w-3xl"} grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto`}>
      <section className="col-span-2">
        {/* Stories */}
        <Stories></Stories>
        {/* Post */}
        <Posts></Posts>
      </section>

      {session && (
        <section className="hidden xl:inline-block md:col-span-1">
          <div className="fixed top-24">
            {/* Mini profile */}
            <MiniProfile></MiniProfile>
            {/* Suggestion */}
            <Suggestions></Suggestions>
          </div>
        </section>
      )}
    </div>
  );
}

export default Feed;
