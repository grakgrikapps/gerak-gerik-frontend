import React from "react";
import Arena_pages from "@/components/pages/(main)/arena/_arena.pages";
import Arena_layout from "@/components/layout/_arena.layout";

async function Page() {

  return (
    <Arena_layout>
      <Arena_pages />
    </Arena_layout>
  );
}

export default Page;
