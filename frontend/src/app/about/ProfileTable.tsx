
import { fetchProfile } from '@/lib/db/profile-queries';
import Image from 'next/image'
import { SITE_INFO } from '@/lib/constants';

export default async function ProfileTable () {
    // id のみリストから除外
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...displayList } = (await fetchProfile())?.[0];
    console.log(displayList)
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <div className="rounded-full block md:hidden">
          {/** 自画像 */}
          {/** スマホ用 */}
          <Image 
            src="/image/img_me.png"
            width={100}
            height={100}
            alt={SITE_INFO.HS}
           />
        </div>
        <div className="block md:hidden">
          { Object.entries(displayList)
            .map((item, index) => {
            return (
              <div key={index}>
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
  

        {/** PC用 */}
        <div className="avatar justify-center p-2.5 hidden md:block">
          <div className="w-24 rounded-full">
            <Image 
              src="/image/img_me.png"
              width={500}
              height={500}
              alt={SITE_INFO.HS}
            />
          </div>
          {/** PC用 */}
          <table className="table hidden md:block">              
              <tbody className="hidden md:block">
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
