import React from "react";

 function User({tweetCarol}) {
  return (
    <span className="user">
      <span className="name">{tweetCarol.name}</span>
      <span className="handle">{tweetCarol.handle}</span>
    </span>
  );
}

export default User;