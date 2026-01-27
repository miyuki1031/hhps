import { describe, it, expect } from 'vitest';
import { todoSchema } from '../src/lib/schema'; // パスを本体に合わせて調整してね

describe('todoActions', () => {
    describe('スキーマーテスト', () => {

        it('普通の文字なら通ること', () => {
            const result = todoSchema.safeParse({ title: '宿題をやる' });
            // console.log("--------------------------");
            // console.log(result);
            // console.log("--------------------------");

            expect(result.success).toBe(true);
        });

        it('<br>などのタグが含まれていたら失敗すること', () => {
            const result = todoSchema.safeParse({ title: '宿題<br>をやる' });
            expect(result.success).toBe(false);
        });
    });
    
});