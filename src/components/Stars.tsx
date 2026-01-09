type Props<T> = {
    id?: number;
    allStars: number;
    readonly: boolean;
    formName?: string;
    value?: T;
    onChange?: (value: T) => void;
};

export const Stars = <T,>({
    id,
    allStars,
    value,
    readonly,
    formName,
    onChange,
}: Props<T>) => {
    const ranges = new Array(allStars).fill(null).map((t, i) => {
        return {
            id: id ? id + "-" + i : i,
            isPos: value === i,
        };
    });
    return (
        <div className="rating">
            {readonly
                ? ranges.map((t) => {
                      return (
                          <div
                              key={t.id}
                              className="mask mask-star bg-orange-400"
                              aria-label={`${t.id} star`}
                              aria-current={t.isPos}
                          />
                      );
                  })
                : ranges.map((t, i) => {
                      return (
                          <input
                              key={t.id}
                              id={`${id ? id + "-" + i : i}`}
                              type="radio"
                              name={`${formName}_${id}`}
                              className="mask mask-star-2 bg-orange-400"
                              aria-label={`${t.id} star`}
                              aria-current={t.isPos}
                              value={i}
                              onChange={(e) => {
                                  const val = Number(
                                      e.target.value
                                  ) as unknown as T;
                                  if (onChange && e.target.value) {
                                      onChange(val);
                                  }
                              }}
                          />
                      );
                  })}
        </div>
    );
};
