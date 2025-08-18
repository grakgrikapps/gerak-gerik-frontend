import React from "react";
import http from "@/lib/axios/http-server";
import Home_v2_pages from "@/components/pages/(main)/home/home.v2.pages";
import { cookies } from "next/headers";

async function Page(props) {
  const search = await props.searchParams;
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  const request = await http.get(`/posts`, {
    params: {
      sort: "random",
      // sort: token ? "viral" : "random",
      arena_id: search?.arena_id ?? 0,
    },
  });

  return <Home_v2_pages request={request?.data} detail={request?.data?.[0]} />;
}

export default Page;
