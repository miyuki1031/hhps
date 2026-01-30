interface Props {
    //    onClick: () => void;
    children: React.ReactNode;
    text: string;
}
export const Tooltip = ({ children, text }: Props) => {
    return (
        <div className="tooltip">
            <div className="tooltip-content">
                <div className="tooltip-right animate-bounce text-orange-400 -rotate-10 text-2xl font-black ">
                    {text}
                </div>

                {children}
            </div>
        </div>
        /**
         * <div class="tooltip">
  <div class="tooltip-content">
    <div class="animate-bounce text-orange-400 -rotate-10 text-2xl font-black">Wow!</div>
  </div>
  <button class="btn">Hover me</button>
</div>
         * 
         */
    );
};
