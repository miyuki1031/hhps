import { SITE_INFO } from "../lib/constants";
import Navigation from "@/components/Navigation";

export default function Hedaer() {
    return (
        <header className="relative h-[50px] flex items-center px-4">
            <span>{SITE_INFO.NAME}</span>
            <Navigation />
        </header>
    );
}
