

// interface CardResumeProps<T extends Record<string, unknown>> {
interface CardResumeProps {
    data: Record<string, string | number | boolean | string[] | null>;
    header: Record<string, string>;
    className?: {
        Card?: string;
        th?: string;
        td?:  string;
    },
}

export function CardResume({
    data,
    header,
}: CardResumeProps) {
    type colorsType = {
        name: string;
        value: number;
        color: string;
        textColor: string;
    }[]
    const colors:colorsType = [
        { name: 'JavaScript', value: 12, color: "#FF8042", textColor: "" },
        { name: 'JavaScript (jQuery)', value: 8 , color: "#f49a6e", textColor: "" },
        { name: 'JavaScript (Backbone.js)', value: 1 , color: "#efc955", textColor: "" },
        { name: 'JavaScript (Vue.js (Ver.2 / Ver.3))', value: 1 , color: "#f4d781", textColor: "" },
        { name: 'JavaScript (Marionette.js)', value: 1 , color: "#f5e3ac", textColor: "" },
        { name: 'HTML', value: 11 , color: "#fffa00", textColor: "" },
        { name: 'CSS', value: 6 , color: "#ffc0cb", textColor: "" },
        { name: 'PHP', value: 2 , color: "#87a3e7", textColor: "" },
        { name: 'PHP(Smarty)', value: 1 , color: "#a9bdec", textColor: "" },
        { name: 'JScript', value: 1 , color: "#b7a9ec", textColor: "" },
        { name: 'VBA', value: 1 , color: "#54f34d", textColor: "" },
        { name: 'SQL', value: 6 , color: "#0024ff", textColor: "text-white" },
        { name: 'SQL (PL/SQL)', value: 2 , color: "#6bbfde", textColor: "" }
    ];

    const getColor = (lang: string) => {
        const colorInfo = (colors.find( colorItem => colorItem.name === lang));
        return !!colorInfo?.color
            ? colorInfo
            : { color: '#ccc', textColor: '' }
    }
    return (
        <div className="card card-border w-auto bg-base-100 shadow-sm p-1 m-2">
            <div className="card-body">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                    {/** プロジェクト概要:projectOverview */}
                    <h2 className="text-3xl font-bold">{data.projectOverview}</h2>
                </div>

                {/** 説明:description */}
                <div className="flex p-2.5 justify-center">
                    <div className="justify-between">{data.description}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/** 開始・終了日:employmentPeriodSt employmentPeriodEd */}
                        <h4 className="card-title rounded-lg bg-cyan-500 p-2 justify-center">アサイン期間</h4>
                        <div className="p-3">{`${data.employmentPeriodSt} ～ ${data.employmentPeriodEd}`}</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/** 役割:role / 規模:scale*/}
                        <h4 className="card-title rounded-lg bg-cyan-500 p-2 justify-center">{ header.role } / { header.scale }</h4>
                        <div className="p-3">{ data.role } / { data.scale }</div>
                    </div>

                     <div className="grid grid-cols-1 md:grid-cols-[75px_1fr]">
                        {/** OS:OS */}
                        <h4 className="card-title rounded-lg bg-cyan-500 p-2 justify-center">{ header.os }</h4>
                        <div className="p-3">{ Array.isArray(data.os) ? data.os.join(" / ") : "" }</div>
                     </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-[75px_1fr]">
                        {/** 言語:languages */}
                        <h4 className="card-title rounded-lg bg-cyan-500 p-2 justify-center">{ header.languages }</h4>
                        <div className="p-3">
                            { Array.isArray(data.languages)
                             ? data.languages
                                .map((item, index) => {
                                    return <span
                                        key={`languages_${data.id}_${index}`}
                                        className={`badge badge-xs badge-warning mr-2 
                                            ${getColor(item).textColor }
                                        `}
                                        style={{
                                            backgroundColor: getColor(item).color,
                                            borderColor: getColor(item).color
                                        }}
                                    >{item}</span>
                                })
                             : <span> - </span>
                            }
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/** ミドルウェア・ソフト:middlewares */}
                        <h4 className="card-title rounded-lg bg-cyan-500 p-2">{ header.middlewares }</h4>
                        <div className="p-3">
                            { Array.isArray(data.middlewares) ? data.middlewares.join(" / ") : "" }
                        </div>
                     </div>
                </div>
        </div>
    </div>
    )
}
