
import { CONTENTS } from '@/lib/constants';
import Title from '@/components/Title';


export default  function AboutLayout({
  children
}: { 
  children: React.ReactNode
}) {
  return (
     <main className={`
      hsl-p-about-me
      flex-1
      w-full
      `}
      >
        <h2 className="
          flex
          flex-col
          flex-1
          items-center
          justify-center 
          p-6
        ">
          <Title text={CONTENTS.TODO.NAME} color={CONTENTS.TODO.COLOR} />
      </h2>

      <div className="
        w-3/4
        min-h-100
        mtb-10
        m-auto
        bg-white
        rounded-lg
        grid aura aura-holo
      ">
            <div className="card bg-base-100">
                <div className="card-body flex">
                    <div className="justify-center overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        準備中
                    </div>
                </div>
            </div>
        </div>
    </main>
  );
}