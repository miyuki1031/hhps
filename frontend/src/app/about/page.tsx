import { CONTENTS } from '@/lib/constants';
import Title from '../../components/Title';


export default function Home() {
  const about_me = [
    { info: "NAME", text: "MZY[mizi] みじぃ" },
    { info: "LEARNING", text: "NextJs ReactJs VueJs JAVA" },
    { info: "LOCATION", text: `ラニアケア超銀河団局所銀河群天の川銀河オリオン腕 太陽系第三惑星地球 日本の関東<br><span class="text-[10px] text-blue-200">Location Laniakea / Local Group / Milky Way / Orion Arm Solar System / Earth / Kanto, Japan</span>` },
    { info: "LICENSES",  text: "車・電工２（試験合格）" }
  ];
  return (
    <main className="
      p-about-me
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
        w-1/2
        min-h-100
        mt-10
        m-auto
        bg-white
        rounded-lg
        grid aura aura-holo
      ">
        <div className="card bg-base-100">
          <div className="card-body">
            {/** 自画像 */}
            <div className="avatar">
                <div className="w-24 rounded-full">
                  <img src="image/img_me.png" />
                </div>
            </div>

            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
              <table className="table">
                { about_me.map((item) => {
                  return (
                    <tr>
                      <th>{ item.info }</th>
                      <td className="whitespace-pre-wrap">
                          <div dangerouslySetInnerHTML={{ __html:item.text }} />
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>



          </div>
        </div>
       </div>
    </main>
  );
}
