import { SITE_INFO } from "@/lib/constants";

export default function Footer() {
    let currentYear = new Date().getFullYear();
    
    return (
        <footer className="`
            w-full 
            h-4
            flex
            items-start /** */
            justify-center

        `">
            <span className="text-xs text-white/50 m-0">© {SITE_INFO.STARTYEAR}-{currentYear} {SITE_INFO.NAME}</span>
        </footer>
    );
}