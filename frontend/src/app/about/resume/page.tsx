import { DEFAULT_CONFIG } from '@/lib/constants';
import { ResumeQueries } from '@/lib/definitions';
import { fetchResume, getDisabledInfo, getResumeAllCount } from '@/lib/db/resume-queries';
import { CardResume } from '@/components/Card';
import ResumeControl from './ResumeControl';
import Pie from './Pie';
import { ButtonPager } from '@/components/Button';
const headers = {
    achievements: "実績",
    assignedPhase: "担当",
    description: "説明",
    employmentPeriodEd: "アサイン開始日",
    employmentPeriodSt: "アサイン終了日",
    // id: "",
    languages: "言語",
    middlewares: "ミドルウェア・ソフト",
    os: "OS",
    projectOverview: "プロジェクト概要",
    role: "役割",
    scale: "規模",
};

// const getParam =  (key: string, queries?: ResumeQueries) => {
const getParam =  <K extends keyof ResumeQueries>(
    key: K,
    queries?: ResumeQueries
): ResumeQueries[K] | undefined => {
    if (key === "order" && queries && queries[key]) {
        if (queries[key] === 'asc' || queries[key] === 'desc') {
            return queries[key]
        }
    }
    return queries?.[key] || DEFAULT_CONFIG.RESUME_QUERIES[key];
}
export default async function page ({
    searchParams,
 }: {
    searchParams: Promise<ResumeQueries>
}) {
    const queries = await searchParams;
    // URLのクエリパラメータから受け取ったものをそのまま渡す
    const fetchResumeParam = {
        order: getParam('order', queries),
        limit: queries?.limit ?? DEFAULT_CONFIG.RESUME_QUERIES.limit!,
        move: queries?.move,
    };
    const [ resume, total, disabledInfo ]  = await Promise.all([
        fetchResume(fetchResumeParam),
        getResumeAllCount(),
        getDisabledInfo()
    ]);

    return (
        <div>
            {/** 円グラフ */}
            <Pie />

            <div className="flex justify-end">
                <ResumeControl />
                <span className="p-3">{ total } 件 中 {fetchResumeParam.limit}表示</span>
            </div>
            <ButtonPager
                order = {fetchResumeParam.order!}
                isDisabledPrev = {disabledInfo.prev}
                isDisabledNext = {disabledInfo.next}
            />
            { resume.map((item, i) => {
                return <CardResume
                    key={`resume_${i}`}
                    data={item}
                    header={headers} />
            })}
            <ButtonPager
                order = {fetchResumeParam.order!}
                isDisabledPrev = {disabledInfo.prev}
                isDisabledNext = {disabledInfo.next}
            />
        </div>
    )
}