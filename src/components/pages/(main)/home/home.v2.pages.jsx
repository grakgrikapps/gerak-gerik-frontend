"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PickCard from "@/components/shared/card/swipe/pick-card";

import ReactFullpage from "@fullpage/react-fullpage";
import http from "@/lib/axios/http";
import { initiationPost, setCurrentPost } from "@/lib/rtk/features/posts/postSlice";
import { useSearchParams } from "next/navigation";

function Home_v2_pages() {
  const dispatch = useDispatch();
  const search = useSearchParams();
  const posts = useSelector((state) => state.posts);
  const auth = useSelector((state) => state.auth);
  const arena = useSelector((state) => state.arena);

  const currentArena = arena?.list?.find(
    (item) => item?.name === arena?.current
  );

  useEffect(() => {
    // panggil rebuild setelah data siap
    if (typeof window !== "undefined" && window.fullpage_api) {
      window.fullpage_api.reBuild();
    }
  }, []);

  React.useEffect(() => {
    if (posts?.initiation.length === 0)
      http
        .get(`/posts`, {
          params: { arena_id: currentArena?.id, slug: search.get("slug") },
        })
        .then((res) => {
          dispatch(initiationPost(res.data));

          http
            .get(`/posts/${res?.data?.[0]?.id}`)
            .then((result) => dispatch(setCurrentPost(result?.data)));
        });
  }, [arena?.current, posts?.initiation]);

  useEffect(() => {
    if (list.length !== 0)
      http
        .get(`/posts/${list?.[0]?.id}`)
        .then((result) => dispatch(setCurrentPost(result?.data)));
  }, []);

  return (
    <Container disableGutters maxWidth={false} sx={{ p: 0, m: 0 }}>
      <ReactFullpage
        // debug
        licenseKey="xxxxxxxxxxxxxxxxxxxxxxxxx"
        controlArrows={false}
        fitToSection
        scrollOverflow={false}
        onLeave={(origin, destination, direction) => {
          http
            .get(`/posts/${list[destination.index].id}`)
            .then((result) => dispatch(setCurrentPost(result?.data)));
        }}
        render={({ state, ...props }) => (
          <>
            {list.length > 0 &&
              list.map((section, index) => {
                return (
                  <Box
                    key={section.id}
                    className="section fp-height-responsive"
                    sx={{
                      height: "100dvh !important",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      // justifyContent: "center",
                      overflow: "hidden !important",
                      pt: "10px",
                    }}
                  >
                    <PickCard
                      cardList={[posts?.initiation?.[index]]}
                      active={
                        Boolean(state?.destination?.index === index) ||
                        (!state.destination && index === 0)
                      }
                      disableScroll={() =>{
                        window.fullpage_api.setAllowScrolling(false, "down");
                        window.fullpage_api.setAllowScrolling(false, "up");
                      }}
                      activeScroll={() => {
                        window.fullpage_api.setAllowScrolling(true, 'down');
                        window.fullpage_api.setAllowScrolling(true, "up");
                      }}
                      index={index}
                    />
                  </Box>
                );
              })}
          </>
        )}
      />
    </Container>
  );
}

const list = [
  {
    id: 48,
    arena_id: 13,
    slug: "1754651729008",
    title: "",
    description: "gimana tanggapan lo? lets discuss",
    upvote: [],
    downvote: [1],
    createdAt: "2025-08-08T11:15:29.008Z",
    updatedAt: "2025-08-09T14:00:27.422Z",
    profile: {
      id: 18,
      username: "grgrik",
      fullname: "gerakgerik",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=grgrik&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 47,
        post_id: 48,
        title: "",
        url: "https://youtu.be/BNP26G9dKro?si=8S3Esq8k-zw596NF",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 47,
    arena_id: 8,
    slug: "1754651637040",
    title: "",
    description: "gimana cara mendidik anak versi diri lo sendiri? ",
    upvote: [],
    downvote: [],
    createdAt: "2025-08-08T11:13:57.040Z",
    updatedAt: "2025-08-08T11:13:57.040Z",
    profile: {
      id: 18,
      username: "grgrik",
      fullname: "gerakgerik",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=grgrik&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 46,
        post_id: 47,
        title: "",
        url: "https://youtu.be/IkKYvnOOkDw?si=5AsaTPIIpgrLhuOG",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 46,
    arena_id: 5,
    slug: "1754651567336",
    title: "",
    description:
      "menurut lo apakah sejarah akan tercipta? fullback pemain yang akan mendapatkan ballon d'or tahun ini?",
    upvote: [],
    downvote: [],
    createdAt: "2025-08-08T11:12:47.336Z",
    updatedAt: "2025-08-08T11:12:47.336Z",
    profile: {
      id: 18,
      username: "grgrik",
      fullname: "gerakgerik",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=grgrik&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 45,
        post_id: 46,
        title: "",
        url: "https://youtu.be/ZfP-kny4Ovw?si=nCRCrnAMyzW-XAwc",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 45,
    arena_id: 10,
    slug: "1754648133693",
    title: "",
    description: "",
    upvote: [],
    downvote: [],
    createdAt: "2025-08-08T10:15:33.693Z",
    updatedAt: "2025-08-08T10:15:33.693Z",
    profile: {
      id: 21,
      username: "Yuliyuri",
      fullname: "Yulita",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=Yuliyuri&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 44,
        post_id: 45,
        title: "",
        url: "https://youtube.com/shorts/kPj_7wfmiR0?si=cFs6LPdx7RG64HSP",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 44,
    arena_id: 11,
    slug: "1754648111252",
    title: "",
    description: "",
    upvote: [],
    downvote: [],
    createdAt: "2025-08-08T10:15:11.252Z",
    updatedAt: "2025-08-08T10:15:11.252Z",
    profile: {
      id: 21,
      username: "Yuliyuri",
      fullname: "Yulita",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=Yuliyuri&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 43,
        post_id: 44,
        title: "",
        url: "https://youtube.com/shorts/NOYTrakwHgM?si=AGfrSiy7Sx2QQIvK",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 43,
    arena_id: 11,
    slug: "1754648094105",
    title: "",
    description:
      "Begini pendapat menteri keuangan mengenai gaji tenaga lendidi #foryou #grakgrik #fyp #fypage #short\n\n",
    upvote: [],
    downvote: [],
    createdAt: "2025-08-08T10:14:54.105Z",
    updatedAt: "2025-08-08T10:14:54.105Z",
    profile: {
      id: 21,
      username: "Yuliyuri",
      fullname: "Yulita",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=Yuliyuri&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 42,
        post_id: 43,
        title: "",
        url: "https://youtube.com/shorts/NOYTrakwHgM?si=AGfrSiy7Sx2QQIvK",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 42,
    arena_id: 16,
    slug: "1754647437572",
    title: "",
    description:
      "Kini telah hadir mata kuliah roblox di president university\n",
    upvote: [],
    downvote: [],
    createdAt: "2025-08-08T10:03:57.572Z",
    updatedAt: "2025-08-08T10:03:57.572Z",
    profile: {
      id: 21,
      username: "Yuliyuri",
      fullname: "Yulita",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=Yuliyuri&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 41,
        post_id: 42,
        title: "",
        url: "https://youtube.com/shorts/bLaH2BXgq78?si=S-botLp5IHrBa96A",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 41,
    arena_id: 10,
    slug: "1754647224793",
    title: "",
    description:
      "Bukan satu dua, tapi 27.000 pegawai BUMN terindikasi terima bansos. #fypage #beritaterkini #shorts #foryou #fyp #fypage #foryoupage #reel #reelsviral #fypageシ゚ #short #reels",
    upvote: [],
    downvote: [],
    createdAt: "2025-08-08T10:00:24.794Z",
    updatedAt: "2025-08-08T10:00:24.794Z",
    profile: {
      id: 21,
      username: "Yuliyuri",
      fullname: "Yulita",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=Yuliyuri&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 40,
        post_id: 41,
        title: "",
        url: "https://youtube.com/shorts/2VvSUXtMoIo?si=bUBUhvR6YrCYihcg",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 40,
    arena_id: 6,
    slug: "1754645878591",
    title: "",
    description:
      "Akhirnya!! Instagram telah meluncurkan fitur repost #fypage #beritaterbaru #shortvideo #foryou ",
    upvote: [],
    downvote: [],
    createdAt: "2025-08-08T09:37:58.591Z",
    updatedAt: "2025-08-08T09:37:58.591Z",
    profile: {
      id: 21,
      username: "Yuliyuri",
      fullname: "Yulita",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=Yuliyuri&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 39,
        post_id: 40,
        title: "",
        url: "https://youtube.com/shorts/tUR46w8ssGI?si=ui9MW1MtJXoO2fbl",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 39,
    arena_id: 10,
    slug: "1754559230657",
    title: "",
    description:
      "Optimis versi pemerintah beda sama realitas dimeja makan rakyat #shorts #fypage #kabinetmerahputih ",
    upvote: [],
    downvote: [21],
    createdAt: "2025-08-07T09:33:50.658Z",
    updatedAt: "2025-08-07T09:47:39.198Z",
    profile: {
      id: 21,
      username: "Yuliyuri",
      fullname: "Yulita",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=Yuliyuri&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 38,
        post_id: 39,
        title: "",
        url: "https://youtube.com/shorts/nrfXmL8hZzM?si=bGQ299VDaWlq_Pye",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 38,
    arena_id: 10,
    slug: "1754558935759",
    title: "",
    description: "waktu dan tempat di persilahkan guys",
    upvote: [21],
    downvote: [],
    createdAt: "2025-08-07T09:28:55.759Z",
    updatedAt: "2025-08-07T09:51:51.414Z",
    profile: {
      id: 18,
      username: "grgrik",
      fullname: "gerakgerik",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=grgrik&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 37,
        post_id: 38,
        title: "",
        url: "https://youtu.be/jqIwELRHqQc?si=H6QcuDFpnppk8Pz9",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 37,
    arena_id: 4,
    slug: "1754558281696",
    title: "",
    description:
      "banyak lulusan universitas menganggur ternyata gelar bukan jaminan #foryou #fyp #fypage  #short",
    upvote: [],
    downvote: [],
    createdAt: "2025-08-07T09:18:01.696Z",
    updatedAt: "2025-08-07T09:18:01.696Z",
    profile: {
      id: 21,
      username: "Yuliyuri",
      fullname: "Yulita",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=Yuliyuri&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 36,
        post_id: 37,
        title: "",
        url: "https://youtube.com/shorts/69qUUk4gBfk?si=t3-CjkU7jY5o9lsT",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 36,
    arena_id: 10,
    slug: "1754555535065",
    title: "",
    description:
      "Hak asasi koruptor dijaga, Hak rakyat dilupakan #foryou #grakgrik #fyp #fypage #foryoupage #reel #reelsviral #fypviral #fypageシ゚ #short #onepiece ",
    upvote: [21, 22],
    downvote: [18],
    createdAt: "2025-08-07T08:32:15.065Z",
    updatedAt: "2025-08-07T11:41:00.674Z",
    profile: {
      id: 21,
      username: "Yuliyuri",
      fullname: "Yulita",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=Yuliyuri&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 35,
        post_id: 36,
        title: "",
        url: "https://youtube.com/shorts/T35s4u0A9Po?si=j1myOJfKzOHhN3kH",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 35,
    arena_id: 4,
    slug: "1754474626086",
    title: "",
    description:
      "Mau nikah takut gagal.Udah nikah takut pisah.Terus gimana? #fypage #foryou #shorts #fyp #shortvideo\n",
    upvote: [],
    downvote: [],
    createdAt: "2025-08-06T10:03:46.087Z",
    updatedAt: "2025-08-06T10:03:46.087Z",
    profile: {
      id: 21,
      username: "Yuliyuri",
      fullname: "Yulita",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=Yuliyuri&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 34,
        post_id: 35,
        title: "",
        url: "https://youtube.com/shorts/dV30zENeeKs?si=IbzOIxF5nStpWf94",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 34,
    arena_id: 10,
    slug: "1754474102220",
    title: "",
    description:
      "Pengangguran turun… tapi isi dompet masih kosong. Gimana tuh? ##fypage #beritaterkini #short #foryou #fypageシ゚ #foryoupage #foryoupage #fypviralシ #fypviral #justforyou #grakgrik #update #reel #reels",
    upvote: [18, 21, 22],
    downvote: [],
    createdAt: "2025-08-06T09:55:02.220Z",
    updatedAt: "2025-08-07T11:40:54.494Z",
    profile: {
      id: 21,
      username: "Yuliyuri",
      fullname: "Yulita",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=Yuliyuri&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 33,
        post_id: 34,
        title: "",
        url: "https://youtube.com/shorts/wUuGpeuzfao?si=ymk7SDQneP486FAL",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 33,
    arena_id: 4,
    slug: "1754473910479",
    title: "",
    description:
      "Pengangguran turun… tapi isi dompet masih kosong. Gimana tuh? #short #fypage #fyp #foryou #shorts",
    upvote: [],
    downvote: [],
    createdAt: "2025-08-06T09:51:50.479Z",
    updatedAt: "2025-08-06T09:51:50.479Z",
    profile: {
      id: 21,
      username: "Yuliyuri",
      fullname: "Yulita",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=Yuliyuri&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 32,
        post_id: 33,
        title: "",
        url: "https://youtube.com/shorts/iBJ4bmE2WU0?si=5KxTefCZpIxgeI6z",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 32,
    arena_id: 10,
    slug: "1754473375862",
    title: "",
    description:
      "Kalau Rp610 ribu dianggap cukup, kita ini hidup… atau bertahan hidup? #fypage #beritaterkini #short",
    upvote: [21, 22],
    downvote: [18],
    createdAt: "2025-08-06T09:42:55.863Z",
    updatedAt: "2025-08-07T11:40:50.789Z",
    profile: {
      id: 21,
      username: "Yuliyuri",
      fullname: "Yulita",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=Yuliyuri&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 31,
        post_id: 32,
        title: "",
        url: "https://youtube.com/shorts/swWf4eB8Nyc?si=fshdCJ6bS39C8z8a",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 31,
    arena_id: 6,
    slug: "1754387327307",
    title: "",
    description:
      "Sekarang, tiap gesek & transfer bisa dibaca jelas.\n📡 Payment ID: dari rakyat, untuk pengawasan rakyat.",
    upvote: [],
    downvote: [],
    createdAt: "2025-08-05T09:48:47.307Z",
    updatedAt: "2025-08-05T09:48:47.307Z",
    profile: {
      id: 21,
      username: "Yuliyuri",
      fullname: "Yulita",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=Yuliyuri&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 30,
        post_id: 31,
        title: "",
        url: "https://youtube.com/shorts/IMIQGzoP0U8?si=4OdBQ5n78Y-IFPmc",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 30,
    arena_id: 7,
    slug: "1754385478282",
    title: "",
    description:
      "Bukan cuma makanan yang bikin sakit. Pikiran kusut juga bisa jadi racun.",
    upvote: [21],
    downvote: [],
    createdAt: "2025-08-05T09:17:58.282Z",
    updatedAt: "2025-08-07T10:00:19.365Z",
    profile: {
      id: 21,
      username: "Yuliyuri",
      fullname: "Yulita",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=Yuliyuri&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 29,
        post_id: 30,
        title: "",
        url: "https://youtube.com/shorts/OQ8O7-H-OPY?si=EFxQIYKpo4gAqrIs",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 29,
    arena_id: 4,
    slug: "1754383657989",
    title: "",
    description:
      "Rojali bukan iseng, tapi refleksi: hidup makin mahal, gaya tetep maksimal. #fypage #fyp #shorts ",
    upvote: [21],
    downvote: [],
    createdAt: "2025-08-05T08:47:37.990Z",
    updatedAt: "2025-08-07T10:00:18.103Z",
    profile: {
      id: 21,
      username: "Yuliyuri",
      fullname: "Yulita",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=Yuliyuri&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 28,
        post_id: 29,
        title: "",
        url: "https://youtube.com/shorts/E1LQRM36o2Q?si=W05B-95qtqCMcnqx",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 28,
    arena_id: 4,
    slug: "1754381409995",
    title: "",
    description:
      "Beda bendera, tapi sama-sama teriak: kami ingin didengar. #short #onepiece #fypage #fypviral #foryou",
    upvote: [21],
    downvote: [],
    createdAt: "2025-08-05T08:10:09.995Z",
    updatedAt: "2025-08-07T10:00:13.631Z",
    profile: {
      id: 21,
      username: "Yuliyuri",
      fullname: "Yulita",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=Yuliyuri&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 27,
        post_id: 28,
        title: "",
        url: "https://youtube.com/shorts/F7hHku5sNfI?si=sxZSquHN-yZzkY8S",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 27,
    arena_id: 12,
    slug: "1754318633453",
    title: "",
    description: 'gimana tanggapan lo dari ending film "Sore" baru-baru ini?',
    upvote: [12, 21],
    downvote: [],
    createdAt: "2025-08-04T14:43:53.453Z",
    updatedAt: "2025-08-07T09:59:50.985Z",
    profile: {
      id: 18,
      username: "grgrik",
      fullname: "gerakgerik",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=grgrik&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 26,
        post_id: 27,
        title: "",
        url: "https://youtu.be/QKJ-uFQgFSo?si=0ZFKFnTFBz8bc9At",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 26,
    arena_id: 14,
    slug: "1754318476645",
    title: "",
    description: "apa pandangan lo mengenai bitcoin saat ini?",
    upvote: [21, 12],
    downvote: [],
    createdAt: "2025-08-04T14:41:16.646Z",
    updatedAt: "2025-08-09T13:15:08.948Z",
    profile: {
      id: 18,
      username: "grgrik",
      fullname: "gerakgerik",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=grgrik&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 25,
        post_id: 26,
        title: "",
        url: "https://youtube.com/shorts/XtSwuY83MhY?si=owwIryJRm5UwAn8k",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 25,
    arena_id: 16,
    slug: "1754318406204",
    title: "",
    description: "kenapa game kompetisi bisa berbahaya menurut lo?",
    upvote: [12, 21],
    downvote: [],
    createdAt: "2025-08-04T14:40:06.204Z",
    updatedAt: "2025-08-09T13:15:06.708Z",
    profile: {
      id: 18,
      username: "grgrik",
      fullname: "gerakgerik",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=grgrik&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 24,
        post_id: 25,
        title: "",
        url: "https://youtu.be/pbuxbg5no7M?si=ZRLBMfbh-R_4o5Y9",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 24,
    arena_id: 6,
    slug: "1754318235022",
    title: "",
    description: "menurut lo AI bisa menggantikan pekerjaan kita?",
    upvote: [21],
    downvote: [12],
    createdAt: "2025-08-04T14:37:15.022Z",
    updatedAt: "2025-08-09T13:14:58.485Z",
    profile: {
      id: 18,
      username: "grgrik",
      fullname: "gerakgerik",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=grgrik&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 23,
        post_id: 24,
        title: "",
        url: "https://youtu.be/JMYQmGfTltY",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 23,
    arena_id: 10,
    slug: "1754301060798",
    title: "",
    description:
      "Muter lagu di kafe wajib bayar royalti.Banyak yang akalin pake suara burung.Cerdas atau pelit? #fyp #foryou #foryoupage #reel #grakgrik",
    upvote: [21, 22],
    downvote: [18, 12],
    createdAt: "2025-08-04T09:51:00.798Z",
    updatedAt: "2025-08-09T08:14:41.554Z",
    profile: {
      id: 21,
      username: "Yuliyuri",
      fullname: "Yulita",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=Yuliyuri&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 22,
        post_id: 23,
        title: "",
        url: "https://youtube.com/shorts/UG4HfCsa9rs?si=Qyy0IHi-CcGsBK_t",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 22,
    arena_id: 4,
    slug: "1754300321034",
    title: "",
    description:
      "Anak 9 tahun bilang “seru jadi perintis daripada pewaris.” Netizen ngamuk. #fypage #shorts #fyp",
    upvote: [21, 12],
    downvote: [],
    createdAt: "2025-08-04T09:38:41.034Z",
    updatedAt: "2025-08-09T08:14:37.684Z",
    profile: {
      id: 21,
      username: "Yuliyuri",
      fullname: "Yulita",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=Yuliyuri&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 21,
        post_id: 22,
        title: "",
        url: "https://youtube.com/shorts/HCC-9RFnhZU?si=udbdbM-B7n6CLK_Q",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 21,
    arena_id: 10,
    slug: "1754299845330",
    title: "",
    description:
      "Jualan offline juga kena pajak 0,5%. #foryou #fyp #grakgrik #fypage #foryoupage ",
    upvote: [21, 18, 22],
    downvote: [12],
    createdAt: "2025-08-04T09:30:45.330Z",
    updatedAt: "2025-08-07T11:40:42.873Z",
    profile: {
      id: 21,
      username: "Yuliyuri",
      fullname: "Yulita",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=Yuliyuri&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 20,
        post_id: 21,
        title: "",
        url: "https://youtube.com/shorts/7eXl0e02azY?si=acQtXMe-MVdFKXtP",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 20,
    arena_id: 4,
    slug: "1754299218878",
    title: "",
    description:
      "Daripada teriak demo mending langsung ke kantor PDAM #fypage #foryou #fyp #fypviral",
    upvote: [12, 21],
    downvote: [],
    createdAt: "2025-08-04T09:20:18.878Z",
    updatedAt: "2025-08-07T09:59:06.468Z",
    profile: {
      id: 21,
      username: "Yuliyuri",
      fullname: "Yulita",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=Yuliyuri&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 19,
        post_id: 20,
        title: "",
        url: "https://youtube.com/shorts/mQJX5F913DY?si=LRN-wLhUsFfR99PL",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 19,
    arena_id: 6,
    slug: "1754119512378",
    title: "",
    description:
      "Gen Z makin cerdas… atau makin takut salah? Sekarang keputusan hidup pun harus tanya ChatGPT dulu. #grakgrik #fyp #foryoupage",
    upvote: [24, 21],
    downvote: [12],
    createdAt: "2025-08-02T07:25:12.378Z",
    updatedAt: "2025-08-07T09:58:58.429Z",
    profile: {
      id: 21,
      username: "Yuliyuri",
      fullname: "Yulita",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=Yuliyuri&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 18,
        post_id: 19,
        title: "",
        url: "https://youtube.com/shorts/BtxJLTHp3HQ?si=EjESk80BSltjpC_U",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 18,
    arena_id: 10,
    slug: "1754119239965",
    title: "",
    description:
      "Katanya kemiskinan menurun. Tapi kenapa makin banyak yang kerja keras cuma buat bertahan hidup? #grakgrik #fyp #foryou #foryou",
    upvote: [24, 12, 21, 22],
    downvote: [18],
    createdAt: "2025-08-02T07:20:39.965Z",
    updatedAt: "2025-08-07T11:40:38.853Z",
    profile: {
      id: 21,
      username: "Yuliyuri",
      fullname: "Yulita",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=Yuliyuri&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 17,
        post_id: 18,
        title: "",
        url: "https://youtube.com/shorts/_AeBsquty_o?si=c50E4GX3PErBOdMO",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 17,
    arena_id: 10,
    slug: "1754118702510",
    title: "",
    description:
      "Kelas menengah bukan zona nyaman. Itu cuma ilusi aman #grakgrik #fypage #fyp #foryou",
    upvote: [21],
    downvote: [24, 12, 18, 22],
    createdAt: "2025-08-02T07:11:42.510Z",
    updatedAt: "2025-08-07T11:39:51.596Z",
    profile: {
      id: 21,
      username: "Yuliyuri",
      fullname: "Yulita",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=Yuliyuri&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 16,
        post_id: 17,
        title: "",
        url: "https://youtube.com/shorts/xsJlU0j4tgQ?si=zwmLqRM2G_bcleUe",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 16,
    arena_id: 11,
    slug: "1754118431092",
    title: "",
    description:
      "Bendera One Piece? Karena di dunia nyata, keadilan sering dibajak #foryou #grakgrik #fypage #fyp",
    upvote: [24, 12, 1, 21, 22],
    downvote: [],
    createdAt: "2025-08-02T07:07:11.092Z",
    updatedAt: "2025-08-09T07:12:31.813Z",
    profile: {
      id: 21,
      username: "Yuliyuri",
      fullname: "Yulita",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=Yuliyuri&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 15,
        post_id: 16,
        title: "",
        url: "https://youtube.com/shorts/2szI0xUG91g?si=FdsRYCTKChvVra5G",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 15,
    arena_id: 4,
    slug: "1754117604631",
    title: "",
    description: "Banyak kelas menengah yang takut kelihatan miskin,",
    upvote: [29, 12, 1],
    downvote: [24, 21],
    createdAt: "2025-08-02T06:53:24.632Z",
    updatedAt: "2025-08-09T07:12:25.672Z",
    profile: {
      id: 21,
      username: "Yuliyuri",
      fullname: "Yulita",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=Yuliyuri&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 14,
        post_id: 15,
        title: "",
        url: "https://youtube.com/shorts/4Qymu1y4oWM?si=ZCaCFJdiYblbvxBo",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 14,
    arena_id: 9,
    slug: "1754049750842",
    title: "",
    description:
      "Kita hidup, kerja, scroll, mati.\nLalu apa?\nFilsafat mungkin satu-satunya yang tersisa… untuk melawan kehampaan itu.",
    upvote: [18, 24, 29, 22, 1, 21],
    downvote: [12],
    createdAt: "2025-08-01T12:02:30.843Z",
    updatedAt: "2025-08-09T07:12:19.012Z",
    profile: {
      id: 18,
      username: "grgrik",
      fullname: "gerakgerik",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=grgrik&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 13,
        post_id: 14,
        title: "",
        url: "https://youtu.be/xMU2LaRq8qU",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 13,
    arena_id: 12,
    slug: "1754043399050",
    title: "",
    description: "Dedy fitness ga ",
    upvote: [29, 1],
    downvote: [12, 24, 21],
    createdAt: "2025-08-01T10:16:39.050Z",
    updatedAt: "2025-08-09T07:12:11.090Z",
    profile: {
      id: 21,
      username: "Yuliyuri",
      fullname: "Yulita",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=Yuliyuri&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 12,
        post_id: 13,
        title: "",
        url: "https://youtube.com/shorts/H4lqb5s_Hjo?si=qRbgOuI4PSVyrtVO",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 12,
    arena_id: 10,
    slug: "1754042720747",
    title: "",
    description: "Bagaimana menurut kamu mengenai aktivitas ngegym? ",
    upvote: [1, 24, 29, 13, 12, 21, 22],
    downvote: [18],
    createdAt: "2025-08-01T10:05:20.747Z",
    updatedAt: "2025-08-09T07:12:06.210Z",
    profile: {
      id: 21,
      username: "Yuliyuri",
      fullname: "Yulita",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=Yuliyuri&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 11,
        post_id: 12,
        title: "",
        url: "https://www.youtube.com/watch?v=H4lqb5s_Hjo",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 11,
    arena_id: 4,
    slug: "-1753797774201",
    title: "",
    description: "fotografer & videografer Kudu punya Aksesoris ini!",
    upvote: [1, 29, 12, 21],
    downvote: [19, 24],
    createdAt: "2025-07-29T14:02:54.201Z",
    updatedAt: "2025-08-09T07:11:57.603Z",
    profile: {
      id: 1,
      username: "callmegrak",
      fullname: "Grak Grik",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=callmegrak&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 10,
        post_id: 11,
        title: "",
        url: "https://www.youtube.com/embed/zJWwZRhyzns",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [
      {
        id: 59,
        profile_id: 1,
        post_id: 11,
        comment_parent: null,
        comment:
          "ga punya duit buat beli strap peakdesign, jadi gw pake tali rafia saja...",
        upvote: [],
        downvote: [],
        createdAt: "2025-07-29T14:18:18.923Z",
        updatedAt: "2025-07-29T14:18:18.923Z",
      },
    ],
  },
  {
    id: 10,
    arena_id: 4,
    slug: "-1753797748882",
    title: "",
    description: "Kamera APS-C terbaik dari Sony!!",
    upvote: [1, 20, 24, 25, 29, 12],
    downvote: [19, 21],
    createdAt: "2025-07-29T14:02:28.882Z",
    updatedAt: "2025-08-09T07:11:49.660Z",
    profile: {
      id: 1,
      username: "callmegrak",
      fullname: "Grak Grik",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=callmegrak&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 9,
        post_id: 10,
        title: "",
        url: "https://www.youtube.com/embed/XAwa1uN8awo",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [
      {
        id: 61,
        profile_id: 1,
        post_id: 10,
        comment_parent: null,
        comment: "Apakah tom lembong diframing menggunakan kamera ini?",
        upvote: [1],
        downvote: [],
        createdAt: "2025-07-29T14:27:22.748Z",
        updatedAt: "2025-07-29T14:27:25.266Z",
      },
      {
        id: 62,
        profile_id: 1,
        post_id: 10,
        comment_parent: 61,
        comment: "@callmegrak Bisa shoot video RAW DNG gak 😂",
        upvote: [],
        downvote: [],
        createdAt: "2025-07-29T14:27:37.405Z",
        updatedAt: "2025-07-29T14:27:37.405Z",
      },
    ],
  },
  {
    id: 9,
    arena_id: 4,
    slug: "-1753797728776",
    title: "",
    description: "Gak Lagi kehilangan Memori lu!",
    upvote: [1, 19, 25, 29, 12, 21],
    downvote: [20, 24, 13],
    createdAt: "2025-07-29T14:02:08.776Z",
    updatedAt: "2025-08-09T07:11:36.092Z",
    profile: {
      id: 1,
      username: "callmegrak",
      fullname: "Grak Grik",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=callmegrak&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 8,
        post_id: 9,
        title: "",
        url: "https://www.youtube.com/embed/KyTcb-x0CnE",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
  {
    id: 8,
    arena_id: 4,
    slug: "-1753797698255",
    title: "",
    description: "Lu masih pake Strap Bawaan Kamera? UDIK!",
    upvote: [1, 24, 28, 12, 21, 31, 32],
    downvote: [19, 20, 13, 25, 27, 29],
    createdAt: "2025-07-29T14:01:38.255Z",
    updatedAt: "2025-08-09T07:10:40.087Z",
    profile: {
      id: 1,
      username: "callmegrak",
      fullname: "Grak Grik",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=callmegrak&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 7,
        post_id: 8,
        title: "",
        url: "https://www.youtube.com/embed/85dg7fTWqHI",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [
      {
        id: 60,
        profile_id: 1,
        post_id: 8,
        comment_parent: null,
        comment:
          "klo buat dslr + lensa vintage yang terkenal berat karna full metal apa masih aman min?😅",
        upvote: [],
        downvote: [],
        createdAt: "2025-07-29T14:20:07.432Z",
        updatedAt: "2025-07-29T14:20:07.432Z",
      },
    ],
  },
  {
    id: 7,
    arena_id: 4,
    slug: "-1753797679921",
    title: "",
    description: "Gambar kek Kamera Profesional cuma pake Action Cam?!\n",
    upvote: [1, 23, 27, 28, 29, 12, 13, 22],
    downvote: [19, 20, 24, 25, 31, 32, 21],
    createdAt: "2025-07-29T14:01:19.921Z",
    updatedAt: "2025-08-09T07:10:35.105Z",
    profile: {
      id: 1,
      username: "callmegrak",
      fullname: "Grak Grik",
      photo:
        "https://api.dicebear.com/9.x/dylan/svg?seed=callmegrak&backgroundColor=619eff,b6e3f4,c0aede&mood=superHappy,happy,hopeful",
    },
    videos: [
      {
        id: 6,
        post_id: 7,
        title: "",
        url: "https://www.youtube.com/embed/JO0VmXDbNbE",
        thumbnail: "",
        duration: "0",
      },
    ],
    comments: [],
  },
];

export default Home_v2_pages;
