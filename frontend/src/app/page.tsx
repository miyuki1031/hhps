import { SITE_INFO } from "../lib/constants";
import styles from "./style/Top.module.scss";

export default function Home() {
  return (
    <main className="
      top-title
      flex-1
      w-full
      bg-[radial-gradient(circle_at_center,#001aa3_0%,#171717_100%)]
      ">
        <div className="
          min-w-max
          md:text-8xl 
          leading-[1.5]
          tracking-wide
          ml-10
          font-bold
          text-white
          text-7xl
          text-left
          grid
          gap-4
          text-shadow-lg/30
        ">
            <div>
              <span className={styles["text-stroke-top-amber"]}>H</span><span className={styles["text-stroke-top-white"]}>appy</span>
            </div>
            <div>
              <span className={styles["text-stroke-top-amber"]}>S</span><span className={styles["text-stroke-top-white"]}>tar</span>
            </div>
            <div>
              <span className={styles["text-stroke-top-amber"]}>L</span><span className={styles["text-stroke-top-white"]}>aB.</span>
            </div>
        </div>

        <div className="
          position
          fixed
          bottom-16
          right-5
          text-white
        ">{ SITE_INFO.MESSAGE }</div>
    </main>
  );
}
