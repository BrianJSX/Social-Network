import React from "react";
import ContentLoader from "react-content-loader";

function MyLoading() {
  return (
    <div>
      <div className="bg-white mt-4 mb-4 border-2 rounded-sm p-4">
        <ContentLoader
          speed={2}
          width={550}
          height={124}
          viewBox="0 0 550 124"
          backgroundColor="#dfdddd"
          foregroundColor="#ededed"
        >
          <rect x="70" y="10" rx="3" ry="3" width="88" height="6" />
          <rect x="69" y="29" rx="3" ry="3" width="52" height="6" />
          <rect x="1" y="67" rx="3" ry="3" width="566" height="6" />
          <rect x="1" y="87" rx="3" ry="3" width="502" height="6" />
          <rect x="2" y="107" rx="3" ry="3" width="433" height="6" />
          <circle cx="24" cy="24" r="24" />
        </ContentLoader>
      </div>
      <div className="bg-white mt-4 mb-4 border-2 rounded-sm p-4">
        <ContentLoader
          speed={2}
          width={550}
          height={124}
          viewBox="0 0 550 124"
          backgroundColor="#dfdddd"
          foregroundColor="#ededed"
        >
          <rect x="70" y="10" rx="3" ry="3" width="88" height="6" />
          <rect x="69" y="29" rx="3" ry="3" width="52" height="6" />
          <rect x="1" y="67" rx="3" ry="3" width="566" height="6" />
          <rect x="1" y="87" rx="3" ry="3" width="502" height="6" />
          <rect x="2" y="107" rx="3" ry="3" width="433" height="6" />
          <circle cx="24" cy="24" r="24" />
        </ContentLoader>
      </div>
      <div className="bg-white mt-4 mb-4 border-2 rounded-sm p-4">
        <ContentLoader
          speed={2}
          width={520}
          height={124}
          viewBox="0 0 550 124"
          backgroundColor="#dfdddd"
          foregroundColor="#ededed"
        >
          <rect x="70" y="10" rx="3" ry="3" width="88" height="6" />
          <rect x="69" y="29" rx="3" ry="3" width="52" height="6" />
          <rect x="1" y="67" rx="3" ry="3" width="566" height="6" />
          <rect x="1" y="87" rx="3" ry="3" width="502" height="6" />
          <rect x="2" y="107" rx="3" ry="3" width="433" height="6" />
          <circle cx="24" cy="24" r="24" />
        </ContentLoader>
      </div>
    </div>
  );
}

export default MyLoading;
