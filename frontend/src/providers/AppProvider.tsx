/***
* AppProvider (アプリ全体の共通データ・状態の「供給業者」)
 * 
 * 役割:
 * この配下にあるすべてのコンポーネントに対して、
 * バケツリレー（Propsの受け渡し）をすることなく、
 * どこからでも直接データ（テーマやログイン状態など）を「受け取れる状態」にするための枠。
 */


import { ReactNode } from 'react';

import ServerProvideContainer from './ServerProvideContainer';
import ClientProvideContainer from './ClientProvideContainer';
import { headers } from 'next/headers';

export default async function AppProvider ({ children }: { children: ReactNode }) {
const headersList = await headers();

const raw = headersList.get('user-agent') || '';

    return (
      <ServerProvideContainer>
        <ClientProvideContainer uaInfo={raw} >
          {children}
        </ClientProvideContainer>
      </ServerProvideContainer>
    )
}

