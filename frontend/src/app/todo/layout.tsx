
import { CONTENTS } from '@/lib/constants';
import Title from '@/components/Title';

export default  function AboutLayout({
  children
}: { 
  children: React.ReactNode
}) {
  return (
     <main className={`
      hsl-p-todo
      flex-1
      flex-col
      w-full
      `}
      >
        <h2 className="
          flex
          flex-col
          flex-1
          items-center
          justify-center 
          p-6
        ">
          <Title text={CONTENTS.TODO.NAME} color={CONTENTS.TODO.COLOR} />
      </h2>

      <div className="
        flex flex-1 w-full
      ">
        {children}
      </div>
    </main>
  );
}