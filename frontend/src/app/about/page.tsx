import Image from 'next/image'
import { fetchProfile } from '@/lib/db/profile-queries';
import { SITE_INFO } from '@/lib/constants';

export default async function page () {
  // id のみリストから除外
  const profile = await fetchProfile();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...displayList } = profile.success && profile.data
    ? profile.data
    : { id: null }
console.log("profile-----------")
console.log(profile)
    return (
      <div className="flex flex-col p-2 gap-2">
        <h3 className="text-xl font-bold h-10">
          <div
            style={{
                margin: 'auto auto',
                height: '24px'
             }}
          >自己紹介</div>
        </h3>
        {/** スマホ用 */}
        <div className="block md:hidden">
          {/** 自画像 */}
          <div className="flex justify-center p-6">
            <div className="avatar">
              <Image 
                src="/image/img_me.png"
                width={100}
                height={100}
                alt={SITE_INFO.HS}
              />
            </div>
          </div>
          <div>
              { Object.entries(displayList)
                .map((item, index) => {
                return (
                  <div
                    key={index}
                    className="mt-2.5"
                  >
                    <h3 className="text-lg font-bold">{ item[0] }</h3>
                    <div className="whitespace-pre-wrap">
                      {  typeof item[1] === 'string'
                          ? (<div dangerouslySetInnerHTML={{ __html: item[1] }} />)
                          : Array.isArray(item[1])
                              ? item[1].join(' / ')
                              : ''
                      }
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/** PC用 */}
        <div className="hidden md:block">
          <div className="flex justify-center p-2.5">
            <div className="avatar">
              <div className="w-50 rounded-full">
                <Image 
                  src="/image/img_me.png"
                  width={500}
                  height={500}
                  alt={SITE_INFO.HS}
                />
              </div>
            </div>
          </div>
          {/** PC用 */}
          <table className="table">
            <tbody>
              { Object.entries(displayList)
                .map((item, index) => {
                return (
                  <tr key={index}>
                    <th>{ item[0] }</th>
                    <td className="whitespace-pre-wrap">
                      {  typeof item[1] === 'string'
                          ? (<div dangerouslySetInnerHTML={{ __html: item[1] }} />)
                          : Array.isArray(item[1])
                              ? item[1].join(' / ')
                              : ''
                      }
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
