import { SITE_INFO } from "../lib/constants";

export default async function Footer() {
    return (
        <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
            <aside className="m-auto">
                　　　　 © 2025 - {new Date().getFullYear()} {SITE_INFO.NAME} |
                Creating with heart.
                <br />
                {SITE_INFO.MESSAGE}
            </aside>
        </footer>
    );
}
