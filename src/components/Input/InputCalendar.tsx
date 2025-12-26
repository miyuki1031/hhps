type Props = {
    id: string;
};
export const InputCalendar = ({ id }: Props) => {
    const today = new Intl.DateTimeFormat("sv-SE", {
        timeZone: "Asia/Tokyo",
    }).format(new Date());
    return (
        <input
            type="date"
            id={id}
            className="input input-bordered w-2/3"
            name="targetDate"
            min={today}
        />
    );
};
