import React from "react";
import Head from "next/head";
import Header from "../Header";

export default function MainLayout({ children }) {
  return (
    <div className="bg-gray-50 h-full w-screen">
      <Head>
        <title>Hutech Online</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://unpkg.com/nprogress@0.2.0/nprogress.js"></script>
        <link
          rel="stylesheet"
          href="https://unpkg.com/nprogress@0.2.0/nprogress.css"
        />
      </Head>

      {/* Header */}
      <Header></Header>
      <div id="parent">
        {/* Children component */}
        {children}
      </div>
    </div>
  );
}
