import React from "react";
import http from "@/lib/axios/http-server";
import Home_v2_pages from "@/components/pages/(main)/home/home.v2.pages";
import { getYouTubeIdFromEmbedUrl } from "@/utils/helper";

export async function generateMetadata({ params }, parent) {
  // read route params
  const { slug } = await params;

  // fetch data
  const detail = await http.get(`/posts/${slug}?type=slug`);

  return {
    title: `${detail?.data?.description} | Gerak Gerik`,
    description: detail?.data?.description,
    openGraph: {
      images: [
        `https://i.ytimg.com/vi/${getYouTubeIdFromEmbedUrl(
          detail?.data?.videos?.[0]?.url
        )}/maxresdefault.jpg`,
      ],
    },
  };
}

async function Page(props) {
  const params = await props.params;
  const search = await props.searchParams;
  const detail = await http.get(`/posts/${params?.slug}?type=slug`);
  const request = await http.get(
    `/posts?sort=viral&arena_id=${search?.arena_id ?? 0}&not_contain=[${
      detail?.data?.id
    }]`
  );

  return (
    <Home_v2_pages
      request={[detail?.data, ...request?.data]}
      detail={detail?.data}
    />
  );
}

export default Page;
