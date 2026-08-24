// import { ResumeSchema } from '../lib/definitions'

interface TableBaseProps<T extends Record<string, unknown>> {
    //data: ResumeSchema[],
    data: Array<T>,
    className?: {
        table?: string;
        th?: string;
        td?:  string;
    },
}
export function TableBase<T extends Record<string, unknown>> ({
    data,
    className,
}: TableBaseProps<T>) {
    const displayList = data.map((rowItem: T)=>  Object.values(rowItem));
    
    return (
        <table className="table">
            <thead>
                <tr>
                {
                    Object.keys(data[0])
                    .map((item, index) => {
                        return (
                        <th
                            key={index}
                            className={`${className?.th}`}
                        >
                            {item}
                        </th>)
                    })
                }
                </tr>
            </thead>
            <tbody>
                   {
                    displayList
                    .map((rowItems, rowIndex) => {
                        return (
                        <tr key={`rows_${rowIndex}`}>
                            {rowItems
                            .map((item, colIndex)=>{
                                return (
                                    <td key={`td_${rowIndex}_${colIndex}`}>{String(item)}</td>
                                )
                        })}
                        </tr>
                    )})
                 }
            </tbody>

        </table>
    )
}

//