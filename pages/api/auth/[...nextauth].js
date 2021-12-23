import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db, storage } from "../../../firebase";
import {
  collection,
  addDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const checkNewUser = async (user) => {
  try {
    return new Promise(async (resolve, reject) => {
      const q = query(collection(db, "users"), where("uid", "==", user.id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        resolve(doc.data());
      });
      resolve(0);
    });
  } catch (error) {
    console.log(error);
  }
};

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        let check = await checkNewUser(user);
        if (check == 0) {
          await addDoc(collection(db, "users"), {
            uid: user.id,
            email: user.email,
            name: user.name,
            username: user.name.split(" ").join("").toLocaleLowerCase(),
            avatar: user.image,
          });
        }
        return true;
      } else {
        return false;
      }
    },
    async session({ session, user, token }) {
      const q = query(collection(db, "users"), where("uid", "==", token.sub));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        session.user.uid = doc.data().uid;
      });

      return session;
    },
  },
});
