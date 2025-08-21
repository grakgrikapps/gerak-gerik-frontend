import React from "react";
import Post_create_pages from "@/components/pages/(main)/post/create/post.create.pages";
import http from "@/lib/axios/http-server";

async function Page() {
  const request = await http.post("/videos/mux");
  console.log(request)
  return <Post_create_pages uploadUrl={request?.data?.url} id={request?.data?.id} />;
}

export default Page;
