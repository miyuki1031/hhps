import { SITE_INFO } from '../lib/constants';

export default function Home() {
    return (
    <main className="
      hsl-c-top
      flex-1
      w-full
      ">
        <div className="
          min-w-max
          md:text-8xl
          leading-normal
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
            <div className="logo">
              <span className="point">H</span>
              <span>appy</span>
            </div>
            <div className="logo">
              <span className="point">S</span>
              <span>tar</span>
            </div>
            <div className="logo">
              <span className="point">L</span>
              <span>aB.</span>
            </div>
        </div>

        <div className="
          position
          fixed
          bottom-7
          right-5
          text-white
        ">{ SITE_INFO.MESSAGE }</div>
    </main>
  );
}
