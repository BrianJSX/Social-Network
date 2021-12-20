import React from "react";
import Post from "./Post";

const posts = [
  {
    id: "123",
    username: "Brainjsx",
    userImg: "https://links.papareact.com/3ke",
    img: "https://links.papareact.com/3ke",
    caption: "Hello my name is brainjsx....",
  },
  {
    id: "456",
    username: "Brainjsx",
    userImg: "https://links.papareact.com/3ke",
    img: "https://links.papareact.com/3ke",
    caption: "Hello my name is brainjsx....",
  },
];

function Posts() {
  return (
    <div>
      {posts.map((post, index) => {
        return (
          <Post
            key={index}
            id={post.id}
            username={post.username}
            userImg={post.userImg}
            img={post.img}
            caption={post.caption}
          ></Post>
        );
      })}
    </div>
  );
}

export default Posts;
