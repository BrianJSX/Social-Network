import React from "react";
import Head from "next/head";
import Header from "../Header";

export default function MainLayout({ children }) {
  return (
    <div className="bg-gray-50 h-full w-screen">
      <Head>
        <title>Hutech Online</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header></Header>

      {/* Children component */}
      {children}
      
    </div>
  );
}
