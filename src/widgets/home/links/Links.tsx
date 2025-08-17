import { Button } from "@/shared/components/ui/button";
import { LinkComponent } from "@/shared/components/ui/link";
import s from "./Links.module.css";
import { Props } from "./types";

export const Links = ({ modalHandler }: Props) => {
  return (
    <div className={s.container}>
      <Button
        onClick={() => modalHandler(true)}
        variant="text"
        size={"xl"}
        className={s.link}
      >
        Showreel
      </Button>
      <LinkComponent href={"/work"} size={"xl"} className={s.link}>
        Featured Work
      </LinkComponent>
      <LinkComponent href={"/pieces"} size={"xl"} className={s.link}>
        Pieces
      </LinkComponent>
      <LinkComponent href={"/info"} size={"xl"} className={s.link}>
        Info
      </LinkComponent>
    </div>
  );
};
