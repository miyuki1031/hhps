import { SITE_INFO } from "@/lib/constants";

export default function Footer() {
    let currentYear = new Date().getFullYear();
    
    return (
        <footer className="
            flex-none
            justify-center items-center
            w-full 
            h-4
            p-2
            bg-[linear-gradient(to_right,#0B131E_0%_40%,#1A305C_40%_55%,#285C8F_75%_85%,#3D85C6_75%_100%)]">
            <span className="text-xs text-white/50">© {SITE_INFO.STARTYEAR}-{currentYear} {SITE_INFO.NAME}</span>
        </footer>
    );
}