import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

function MiniProfile() {
  const { data: session } = useSession();
  
  return (
    <div className="flex items-center m-5 space-x-5">
      <div>
        <img
          className="rounded-full border-2 h-14 w-14 object-contain"
          src={session?.user?.image}
        ></img>
      </div>
      <div>
        <h2 className="font-bold text-gray-600 truncate">{session?.user?.username}</h2>
        <h3 className="text-md text-gray-400">{session?.user?.name}</h3>
      </div>

      <button onClick={signOut} className="text-blue-400">Đăng xuất</button>
    </div>
  );
}

export default MiniProfile;
