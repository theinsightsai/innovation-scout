"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SideBar from "../sideBar";
import { ROUTE } from "../../constants/index";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    const isAuthenticated = true;

    useEffect(() => {
      if (!isAuthenticated) {
        router.push(ROUTE.LOGIN);
      }
    }, [isAuthenticated, router]);

    if (isAuthenticated) {
      return (
        <div className="flex min-h-screen">
          <SideBar />
          <div
            className="flex-1 bg-gray-100 p-6 text-black"
            style={{ paddingTop: "100px" }}
          >
            <WrappedComponent {...props} />
          </div>
        </div>
      );
    }

    return null;
  };
};

export default withAuth;
