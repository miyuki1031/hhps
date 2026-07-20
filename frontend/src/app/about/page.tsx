import Image from 'next/image'
import { CONTENTS, SITE_INFO } from '@/lib/constants';
import Title from '@/components/Title';


export default function Home() {
  const about_me = [
    { info: "NAME", text: "MZY[mizi] みじぃ" },
    { info: "LEARNING", text: "NextJs ReactJs VueJs JAVA" },
    { info: "LOCATION", text: `ラニアケア超銀河団局所銀河群天の川銀河オリオン腕 太陽系第三惑星地球 日本の関東<br><span class="text-[10px] text-blue-200">Location Laniakea / Local Group / Milky Way / Orion Arm Solar System / Earth / Kanto, Japan</span>` },
    { info: "LICENSES",  text: "車・電工２（試験合格）" }
  ];
  return (
    <main className="
      hsl-p-about-me
      flex-1
      w-full
      bg-[radial-gradient(circle_at_center,#001aa3_0%,#171717_100%)]
      ">
        <h2 className="
          flex
          flex-col
          flex-1
          items-center
          justify-center 
          
        ">
          <Title text={CONTENTS.ABOUT.NAME} color={CONTENTS.ABOUT.COLOR} />
      </h2>
      {/**
       * 指名・職種・生年月日・住まい
       * 職務経歴
       * スキルセット
       * 自己PR
       * 
       */}
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
            {/** 自画像 */}
            <div className="avatar justify-center ">
                <div className="w-24 rounded-full">
                  <Image 
                    width={500}
                    height={500}
                    alt={SITE_INFO.HS}
                  src="image/img_me.png" />

                </div>
            </div>

            <div className="justify-center overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
              <table className="table">
                <tbody>
                  { about_me.map((item, index) => {

                    return (
                      <tr key={index}>
                        <th>{ item.info }</th>
                        <td className="whitespace-pre-wrap">
                            <div dangerouslySetInnerHTML={{ __html:item.text }} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>



          </div>
        </div>
       </div>
    </main>
  );
}
