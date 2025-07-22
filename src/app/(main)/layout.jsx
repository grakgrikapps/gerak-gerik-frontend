import React from "react";
import Main_layout from "@/components/layout/_main.layout";
import Logout from "@/components/pages/logout/index";
import { cookies } from "next/headers";

async function Layout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return <Logout />
  } else {
    return <Main_layout>{children}</Main_layout>;
  }
}

export default Layout;
