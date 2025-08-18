"use client";
import React from "react";
import Empty_layout from "@/components/layout/_empty.layout";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  React.useEffect(() => {
    router.replace("/home");
  }, []);

  return (
    <Empty_layout>
      <Box
        display="flex"
        height="100dvh"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        {/* Logo Image with animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Box display="flex" justifyContent="center">
            <img src="/logo.jpg" alt="Logo" width="350px" />
          </Box>
        </motion.div>

        {/* GrakGrik Text with delay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Box display="flex" mt="-70px">
            <Typography fontSize="32px" fontWeight={700} color="#185FE6">
              Grak
            </Typography>
            <Typography fontSize="32px" fontWeight={700} color="#F0443D">
              Grik
            </Typography>
          </Box>
        </motion.div>
      </Box>
    </Empty_layout>
  );
}

export default Page;
