import React from "react";
import Empty_layout from "@/components/layout/_empty.layout";
import Rediect from "@/components/pages/redirect";
import { cookies } from "next/headers";

async function Layout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (token) {
    return <Rediect />;
  } else {
    return <Empty_layout>{children}</Empty_layout>;
  }
}

export default Layout;
