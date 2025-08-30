import s from "./Page.module.css";
import { Content } from "@/shared/components/layout/content";
import Image from "next/image";
import { LinkComponent } from "@/shared/components/ui/link";
import { Navigation } from "@/shared/components/ui/navigation/Navigation";
import { PageWithTitle } from "@/shared/components/layout/page-with-title";

export default function Pieces() {
  return (
    <PageWithTitle title="About Liza Tikhonova" className={s.page}>
      <Content className={s.content}>
        <Navigation>&lt; Info</Navigation>

        <div className={s.links}>
          <LinkComponent
            target="_blank"
            className={s.link}
            size="s"
            href="https://www.instagram.com/lizatikhonovamusic/"
          >
            Instagram
          </LinkComponent>
          <LinkComponent
            target="_blank"
            className={s.link}
            size="s"
            href="https://www.youtube.com/@lizatikhonovamusic"
          >
            Yotube
          </LinkComponent>
          <LinkComponent
            target="_blank"
            className={s.link}
            size="s"
            href="https://www.imdb.com/name/nm13709115/"
          >
            IMDb
          </LinkComponent>
          <LinkComponent
            target="_blank"
            className={s.link}
            size="s"
            href="https://open.spotify.com/artist/7HV8Ur9UStYWnOm5V5mUX5?si=kZtH4AU-S3a7LiH8l7NDWQ"
          >
            Spotify
          </LinkComponent>
          <LinkComponent
            target="_blank"
            className={s.link}
            size="s"
            href="https://music.apple.com/ru/artist/liza-tikhonova/1813931154?l=en-GB"
          >
            Apple Music
          </LinkComponent>
          <LinkComponent
            target="_blank"
            className={s.link}
            size="s"
            href="https://music.yandex.ru/artist/24212099"
          >
            Yandex Music
          </LinkComponent>
        </div>
        <div className={s.textImageContainer}>
          <article className={s.textContainer}>
            <div className={s.heading}>Composer</div>
            <ul className={s.list}>
              <li className={s.listItem}>
                &gt; Composing since 1996 in classical, experimental and popular
                genres
              </li>
              <li className={s.listItem}>
                &gt; Composing for major tv shows since 2012
              </li>
            </ul>

            <div className={s.heading}>Sound engineer</div>
            <ul className={s.list}>
              <li className={s.listItem}>
                &gt; Studied music technology at London College of Music, first
                class honours graduate
              </li>
              <li className={s.listItem}>
                &gt; Recording and mixing since 2006
              </li>
              <li className={s.listItem}>
                &gt; Worked and collected experience <br /> at music studios in
                London, Berlin, <br /> New York and Moscow
              </li>
              <li className={s.listItem}>
                &gt; Had a perception changing talk <br />
                with Michael Brauer at Electric Lady Studios NYC in 2012,
                forever thankful
              </li>
            </ul>

            <div className={s.heading}>Musician</div>
            <ul className={s.list}>
              <li className={s.listItem}>
                &gt; 1996-2004 Fortepiano Conservatory class
              </li>
              <li className={s.listItem}>
                &gt; 2003-2012 Drums and vocals classes
              </li>
              <li className={s.listItem}>
                &gt; Guitar and bass &mdash; self-taught
              </li>
              <li className={s.listItem}>&gt; Performed on stage since 2002</li>
              <li className={s.listItem}>
                &gt; 2006-2013 Leader of an indie band
              </li>
            </ul>
          </article>
          <div className={s.imageContainer}>
            <Image
              fill
              src={"/images/about/portrait.webp"}
              alt="Liza Tikhonova portrait"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </Content>
    </PageWithTitle>
  );
}
