import Link from 'next/link'
import { House } from "lucide-react";
 
export default function NotFound() {
  return (
    <div className="
        error-page
        w-full
        h-screen
        text-white
        p-10
    ">
        <div className="
            m-auto
            w-100
            text-center
        ">
            <h1 className="mb-10">NOT FOUND</h1>
            <p className="mb-10"> ページが見つかりませんでした。</p>
            <div className="w-50 m-auto">
                <Link className="flex gap-4 justify-center hover:bg-cyan-800" href="/">
                    <House size={20} />
                    <span>Return Home</span>
                </Link>
            </div>
            <img className="w-100 h-100 p-10" src="image/img_maintenance.png"></img>
        </div>
    </div>
  )
} 