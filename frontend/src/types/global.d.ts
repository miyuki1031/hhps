declare namespace React {
    namespace JSX {
        interface IntrinsicElements {
            'calendar-date': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                value?: string;
                onchange?: (e: any) => void;
            };
            'calendar-month': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}