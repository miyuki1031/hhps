// lib/api.ts

// 1. 環境変数の読み込み（ビルド時や実行時に切り替わるじぇ）
const JAVA_API_URL = process.env.JAVA_API_URL;

// 2. 共通のエラークラス（Javaの独自Exceptionみたいなものだにょ）
export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// 3. fetchの共通関数（これがモジュールの目玉！）
export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${JAVA_API_URL}${endpoint}`;
  console.log(`url: ${url}`); 
  // 認証トークンが必要なら、ここで一括でセットする設計にできるじぇ
  const defaultOptions: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(url, defaultOptions);

  if (!response.ok) {
    // 現場ではここでログを出したり、共通のエラー処理を挟むにょ
    throw new ApiError(response.status, 'API呼び出しに失敗したじぇ');
  }

  return response.json() as Promise<T>;
}