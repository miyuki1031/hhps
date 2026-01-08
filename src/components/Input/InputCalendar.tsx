type Props = {
    id: string;
    name: string;
    value?: string;
    onChange?: (value: string) => void;
};
export const InputCalendar = ({ id, name, value, onChange }: Props) => {
    const today = new Intl.DateTimeFormat("sv-SE", {
        timeZone: "Asia/Tokyo",
    }).format(new Date());
    return (
        <input
            type="date"
            id={id}
            className="input input-bordered w-2/3"
            name={name}
            min={today}
            onChange={(e) => {
                if (onChange && e?.target?.value) {
                    onChange(e?.target?.value);
                }
            }}
            value={value}
        />
    );
};
