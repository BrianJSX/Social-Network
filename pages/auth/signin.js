import { getProviders, signIn as SignIntoProvider } from "next-auth/react";
import React from "react";
import MainLayout from "../../components/layouts/main";

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}

function SignIn({ providers }) {
  return (
    <>
      <div className="flex flex-col items-center -mt-10 justify-center min-h-screen">
        <img className="w-64" src="https://links.papareact.com/ocw"></img>
        <p className="text-lg">Hãy sống theo cách của bạn Hutech Confesstion</p>
        <div className="mt-10">
          {Object.values(providers).map((provider, index) => {
            return (
              <button
                className="bg-blue-400 text-white p-3 rounded-lg"
                key={index}
                onClick={() => SignIntoProvider(provider.id, {callbackUrl: "/"})}
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
