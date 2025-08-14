import React from "react";
import http from "@/lib/axios/http-server";
import Home_v2_pages from "@/components/pages/(main)/home/home.v2.pages";

async function Page(props) {
  const search = await props.searchParams;
  const request = await http.get(`/posts?sort=viral&arena_id=${search?.arena_id ?? 0}`);

  return <Home_v2_pages request={request?.data} detail={request?.data?.[0]} />;
}

export default Page;
