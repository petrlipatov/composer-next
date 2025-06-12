"use client";

import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import { LoadingScreen } from "@/containers/home/loading-screen";
import { Links } from "@/containers/home/links/Links";
import { BackgroundImages } from "@/containers/home/background-images";
import { YoutubePlayer } from "@/containers/common/youtube-player";

import { useRootStore } from "@/shared/contexts/store-context";

import { Page } from "@/components/layout/page";
import { Content } from "@/components/layout/content";
import { Modal } from "@/components/ui/popup";
import { Logo } from "@/components/ui/logo";
import { SHOWREEL_YT_ID } from "@/shared/constants/content";
import s from "./Home.module.css";

const Home = observer(() => {
  const [mounted, setMounted] = useState(false);
  const [isModal, setModal] = useState(false);
  const store = useRootStore();

  useEffect(() => {
    setTimeout(() => {
      store.setLoadedState(true);
      setMounted(true);
    }, 2000);
  }, [store]);

  if (!store.loaded && !mounted) {
    return <LoadingScreen />;
  }

  return (
    <Page className={s.page}>
      <Content className={s.homeContent}>
        <Logo className={s.homeLogo} />
        <Links modalHandler={setModal} />
        <Modal isOpen={isModal} onClose={setModal}>
          <YoutubePlayer videoID={SHOWREEL_YT_ID} />
        </Modal>
      </Content>
      <BackgroundImages />
    </Page>
  );
});

export default Home;
