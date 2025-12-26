type Props = {
    allStars: number;
    pos: number;
    readonly: boolean;
};

export const Stars = ({ allStars, pos = 0, readonly }: Props) => {
    let id = 0;
    const ranges = new Array(allStars).fill(null).map((t, i) => {
        id = i + 1;
        return {
            id: id,
            isPos: pos === i,
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
                              type="radio"
                              name="rating-2"
                              className="mask mask-star-2 bg-orange-400"
                              aria-label={`${t.id} star`}
                              aria-current={t.isPos}
                              value={i}
                          />
                      );
                  })}
        </div>
    );
};
