import { Stars } from "@/components/Stars";

type Props = {
    id: string;
    label: string;
};
export const TodoRegistStars = ({ id, label }: Props) => {
    return (
        <div className="flex flex-row gap-1.5 mb-4">
            <label
                htmlFor={id}
                className="rounded-box bg-blue-400 w-1/3 text-sm p-2 font-medium text-gray-700"
            >
                {label}
            </label>
            <Stars
                allStars={3}
                pos={0}
                readonly={false}
                formName={"todoPriority"}
            />
        </div>
    );
};
