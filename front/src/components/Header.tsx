import { SITE_INFO } from "../lib/constants";
import Navigation from "@/components/Navigation";

export default function Header() {
    return (
        <header className="relative h-12.5 flex items-center px-4">
            <span>{SITE_INFO.NAME}</span>
            <Navigation />
        </header>
    );
}
