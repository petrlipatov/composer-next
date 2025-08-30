"use client";

import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import { LoadingScreen } from "@/widgets/home/loading-screen";
import { Links } from "@/widgets/home/links/Links";
import { BackgroundImages } from "@/widgets/home/background-images";
import { YoutubePlayer } from "@/features/youtube-player";

import { useRootStore } from "@/shared/contexts/store-context";

import { Content } from "@/shared/components/layout/content";
import { Modal } from "@/shared/components/ui/modal";
import { Logo } from "@/shared/components/ui/logo";
import { SHOWREEL_YT_ID } from "@/shared/constants/content";
import s from "./Home.module.css";
import { PageWithTitle } from "@/shared/components/layout/page-with-title";

const Home = observer(() => {
  const [mounted, setMounted] = useState(false);
  const [isModal, setModal] = useState(false);
  const store = useRootStore();

  useEffect(() => {
    store.setIsClient(true);
    setTimeout(() => {
      store.setIsLoaded(true);
      setMounted(true);
    }, 1500);
  }, [store]);

  return (
    <>
      {!store.isLoaded && !mounted && <LoadingScreen />}
      <PageWithTitle
        title="Liza Tikhonova - Music Composer"
        className={s.page}
      >
        <Content className={s.homeContent}>
          <Logo className={s.homeLogo} />
          <Links modalHandler={setModal} />
          <Modal isOpen={isModal} onClose={setModal}>
            <YoutubePlayer videoID={SHOWREEL_YT_ID} />
          </Modal>
        </Content>
        <BackgroundImages />
      </PageWithTitle>
    </>
  );
});

export default Home;
