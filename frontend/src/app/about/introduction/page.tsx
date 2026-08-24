import { CONTENTS } from '@/lib/constants';

export default function page () {
    const content = (Object.values(CONTENTS)).filter((item) => item.IS_ENABLED);
    const skill = [
        "Next.js",
        "Drizzle",
        "daisyui",
        "tailwindcss",
        "lucide",
        "PostgreSQL"
    ];
    const skillPre = [
        "Java",
        "JavaSparingBoot"
    ];

    return (
        <div className="p-2 gap-2">
            <h3 className="text-xl font-bold h-10">
                <div
                    style={{
                        margin: 'auto auto',
                        height: '24px'
                    }}
                >サイト構成</div>
            </h3>
            <div className="flex items-center">
                <ul className="w-full">
                { content.map((item, index) => {
                    return (
                        <li
                            key={index}
                            className="rounded-md h-auto p-2.5 mb-2.5 bg-gray-200"
                        >
                            <h3 className="text-2xl">{item.NAME}</h3>
                            <div dangerouslySetInnerHTML={{ __html: item.INTRODUCTION }} />
                        </li>
                    )
                    })
                }
                </ul>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 w-auto rounded-md m-10">
                <ul className="">
                    <li
                        className="rounded-md h-auto w-auto p-2.5 m-2.5 bg-gray-400 text-white"
                    >使用言語</li>
                    { skill.map((item, index) => {
                        return (
                            <li
                                key={index}
                                className="rounded-md h-auto w-auto p-2.5 m-2.5 bg-gray-200"
                            >{item}</li>
                        )
                        })
                    }
                </ul>
                <ul className="">
                    <li
                        className="rounded-md h-auto w-auto  p-2.5 m-2.5 bg-gray-400 text-white"
                    >これから勉強予定</li>
                    { skillPre.map((item, index) => {
                        return (
                            <li
                                key={index}
                                className="rounded-md h-auto w-auto  p-2.5 m-2.5 bg-gray-200"
                            >{item}</li>
                        )
                        })
                    }
                </ul>
            </div>
            

        </div>
    )
}