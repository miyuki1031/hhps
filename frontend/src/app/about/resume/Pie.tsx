'use client';
import {
  Pie,
  PieChart,
  PieLabelRenderProps,
  PieSectorShapeProps,
  Sector,
  useActiveTooltipDataPoints,
  useIsTooltipActive,
} from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import { Expand , Minimize2 } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const data = [
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
  { name: 'SQL (PL/SQL)', value: 2 , color: "#6bbfde", textColor: "" },
];

// #endregion
const RADIAN = Math.PI / 180;
//
// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const COLORS = data.map((i)=>i.color);

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > ncx ? 'start' : 'end'} dominantBaseline="central">
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

const MyCustomPie = (props: PieSectorShapeProps) => {
  const p = useActiveTooltipDataPoints();
  const isAnyPieActive = useIsTooltipActive();
  const isThisPieActive = isAnyPieActive && props.payload === p?.[0];
  let fillOpacity: number;
  if (isAnyPieActive && !isThisPieActive) {
    fillOpacity = 0.5;
  } else {
    fillOpacity = 1;
  }
  return (
    <Sector
      {...props}
      fill={COLORS[props.index % COLORS.length]}
      fillOpacity={fillOpacity}
      style={{ transition: 'fill-opacity 0.3s ease' }}
    />
  );
};

export default function PieChartWithCustomizedLabel({
  isAnimationActive = true
}: { isAnimationActive?: boolean }
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams  =  useSearchParams();
  const isOpen= searchParams.get('isShowSkill') === 'true';

  const handleToggle = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('isShowSkill', String(!isOpen));

    // 3. パスと新しいクエリを組み合わせて replace
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <>
      <div className="flex items-center p-2 gap-2 h-10">
        <h3 className="text-xl font-bold">
          <div
            style={{
                margin: 'auto auto',
                height: '24px'
             }}
          >経験言語</div>
        </h3>
        <button
          className="ml-2 p-1 rounded  hover:bg-gray-300 focus:outline-none"
          onClick={()=>{handleToggle()}}>
            {isOpen
              ? <Minimize2 size={20} />
              : <Expand size={20} />
              }
        </button>
      </div>

      <div className={`
        grid grid-cols-1 md:grid-cols-2
        ${isOpen
         ? "block"
         : "hidden"
         }
      `}>
          <div>
              <PieChart style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }} responsive>
              <Pie
                  data={data}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  fill="#8884d8"
                  dataKey="value"
                  isAnimationActive={isAnimationActive}
                  shape={MyCustomPie}
              />
              <RechartsDevtools />
              </PieChart>
          </div>
          <div className="flex flex-wrap gap-2">
              { data.map((item, i)=>{
                  return (
                      <div
                          key={i}
                          className={`
                              p-3
                              pt-0
                              rounded-full
                              mt-1
                              h-5
                              w-fit
                              bg-[${item.color}]
                              ${item.textColor}
                          `}
                          style={{ backgroundColor: item.color }}
                      >
                          {item.name}
                      </div>
                  )
              }) }
          </div>
      </div>
    </>
  );
}