import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  // Docker側から渡される「MAINTENANCE_MODE」というフラグをチェックする
  const isMaintenance = process.env.MAINTENANCE_MODE === 'true'

  // 工事中、かつ 蓋絵ページ(/maintenance)や画像ファイル(.pngなど) 以外のアクセスなら
  if (isMaintenance && !request.nextUrl.pathname.startsWith('/maintenance') && !request.nextUrl.pathname.includes('.')) {
    // 蓋絵ページへ強制的に書き換える（URLは変えずに中身だけ蓋絵にする）
    return NextResponse.rewrite(new URL('/maintenance', request.url))
  }
}