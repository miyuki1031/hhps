import Link from 'next/link'
import { House } from 'lucide-react';
import Image from 'next/image';
 
export default function NotFound() {
  return (
    <main className="
        hsl-error-page
        flex-1
        p-10 flex flex-col justify-center items-center
    ">
        <div className="
            m-auto
            w-100
            text-center
            p-2.5
        ">
            <h1 className="mb-10">NOT FOUND</h1>
            <p className="mb-10"> ページが見つかりませんでした。</p>
            <div className="w-50 m-auto">
                <Link className="flex gap-4 justify-center hover:bg-cyan-800" href="/">
                    <House size={20} />
                    <span>Return Home</span>
                </Link>
            </div>
            <Image
                className="w-100 h-100 p-10"
                width={100}
                height={100}
                src="/image/img_maintenance.png"
                alt="404！"
            />
        </div>
    </main>
  )
} 