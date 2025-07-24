import React from "react";
import Logout from "@/components/pages/(auth)/logout";
import { cookies } from "next/headers";

async function Layout(props) {
  const { children } = props;
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return <Logout />;
  } else {
    return <>{children}</>;
  }
}

export default Layout;
