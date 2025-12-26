import { TODO_CATEGORY } from "../constants";

type Props = {
    target: string;
};
export const TodoCategorys = ({ target = "WORK" }: Props) => {
    const categoryInfo =
        TODO_CATEGORY[target as keyof typeof TODO_CATEGORY] ||
        TODO_CATEGORY["WORK"];
    const Icon = categoryInfo.label;
    return <Icon size={20} />;
};
