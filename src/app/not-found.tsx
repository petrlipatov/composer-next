import { Page } from "@/shared/components/layout/page";
import { Content } from "@/shared/components/layout/content";
import { LinkComponent } from "@/shared/components/ui/link";
import s from "./not-found.module.css";

export default function NotFound() {
  return (
    <Page>
      <Content className={s.content}>
        <h1 className={s.title}>404</h1>
        <p className={s.text}>Page Not Found</p>
        <LinkComponent href="/" size="l" className={s.link}>
          &lt; Go back to the Homepage
        </LinkComponent>
      </Content>
    </Page>
  );
}
