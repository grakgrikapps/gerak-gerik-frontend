import React from "react";
import http from "@/lib/axios/http-server";
import Home_v2_pages from "@/components/pages/(main)/home/home.v2.pages";

async function Page() {
  const request = await http.get(`/posts?sort=viral`);
  const detail = await http.get(`/posts/${request?.data?.[0]?.id}`);

  return <Home_v2_pages request={request?.data} detail={detail?.data} />;
}

export default Page;
