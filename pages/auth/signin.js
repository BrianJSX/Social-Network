import {
  getProviders,
  getSession,
  signIn as SignIntoProvider
} from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import MainLayout from "../../components/layouts/main";


export async function getServerSideProps(ctx) {
  const providers = await getProviders();
  const session = await getSession(ctx);
  if(session) { 
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      providers,
    },
  };
}

function SignIn({ providers }) {
  const router = useRouter();
  

  return (
    <>
      <div className="flex flex-col items-center -mt-10 justify-center min-h-screen">
        <img className="w-64" src="https://links.papareact.com/ocw"></img>
        <p className="text-lg">Hãy sống theo cách của bạn Hutech Confession</p>
        <div className="mt-10">
          {Object.values(providers).map((provider, index) => {
            return (
              <button
                className="bg-blue-400 text-white p-3 rounded-lg"
                key={index}
                onClick={() =>
                  SignIntoProvider(provider.id, { callbackUrl: "/" })
                }
              >
                Đăng nhập bằng {provider.name}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

SignIn.Layout = MainLayout;

export default SignIn;
