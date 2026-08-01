import { CONTENTS } from '@/lib/constants';
import Title from '@/components/Title';

import ProfileTable from './ProfileTable'
import Resume from './Resume';
import { ResumeQueries } from '@/lib/definitions';
import Tabs from './Tabs';


export default async function page({
  searchParams,
}: {
  searchParams: Promise<ResumeQueries>;
}) {
  const params = await searchParams;
  const isProfile = params?.page === 'p' || !params?.page;
  console.log(`isProfile ${isProfile}`)
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
          <Title text={CONTENTS.ABOUT.NAME} color={CONTENTS.ABOUT.COLOR} />
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
              <Tabs
                profileComponent={<ProfileTable />}
                resumeComponent={<Resume queries={params} />}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
