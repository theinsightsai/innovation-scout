// "use client";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import SideBar from "../sideBar";
// import { ROUTE } from "../../constants/index";

// const withLayout = (WrappedComponent) => {
//   return (props) => {
//     const router = useRouter();

//     Replace this with actual authentication logic
//     const isAuthenticated = true;

//     useEffect(() => {
//       if (!isAuthenticated) {
//         router.push(ROUTE.LOGIN);
//       }
//     }, [isAuthenticated, router]);

//     if (!isAuthenticated) {
//       return null;
//     }

//     return (
//       <div className="flex min-h-screen">
//         <SideBar />
//         <div
//           className="flex-1 bg-gray-100 p-6 text-black"
//           style={{ paddingTop: "100px" }}
//         >
//           <WrappedComponent {...props} />
//         </div>
//       </div>
//     );
//   };
// };

// export default withLayout;
"use client"; 
import SideBar from "../sideBar";
import { memo } from "react";

const withLayout = (WrappedComponent) => {
  const ComponentWithLayout = (props) => {
    return (
      <div className="flex min-h-screen">
        <SideBar />
        <div className="flex-1 bg-gray-100 p-6 text-black" style={{ paddingTop: "100px" }}>
          <WrappedComponent {...props} />
        </div>
      </div>
    );
  };

  return memo(ComponentWithLayout);
};

export default withLayout;
