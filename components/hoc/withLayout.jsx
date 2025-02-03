"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SideBar from "../sideBar";
import { ROUTE } from "../../constants/index";
import { useSelector } from "react-redux";

const withLayout = (WrappedComponent) => {
  return (props) => {

    return (
      <AuthWrapper>
        <div className="flex min-h-screen">
          <SideBar />
          <div
            className="flex-1 bg-gray-100 p-6 text-black"
            style={{ paddingTop: "100px" }}
          >
            <WrappedComponent {...props} />
          </div>
        </div>
      </AuthWrapper>
    );
  };
};

const AuthWrapper = ({ children }) => {
  const router = useRouter();
  const isLoggedIn = useSelector(state => state?.auth?.isAuthenticated);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push(ROUTE.LOGIN);
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  return children;
};

export default withLayout;
