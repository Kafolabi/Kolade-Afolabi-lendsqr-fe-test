import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
    it('should return the initial value immediately', () => {
        const { result } = renderHook(() => useDebounce('test', 500));
        expect(result.current).toBe('test');
    });

    it('should update the debounced value after the delay', () => {
        let value = 'initial';
        const { result, rerender } = renderHook(
            ({ val }: { val: string }) => useDebounce(val, 300),
            {
                initialProps: { val: value },
            }
        );

        expect(result.current).toBe('initial');

        value = 'updated';
        rerender({ val: value });

        // Value should not update immediately
        expect(result.current).toBe('initial');

        // Fast-forward time
        act(() => {
            jest.advanceTimersByTime(300);
        });

        expect(result.current).toBe('updated');
    });

    it('should not update the value if unmounted before delay', () => {
        let value = 'first';
        const { rerender, unmount } = renderHook(({ val }) => useDebounce(val, 200), {
            initialProps: { val: value },
        });

        value = 'second';
        rerender({ val: value });

        unmount();

        act(() => {
            jest.advanceTimersByTime(200);
        });

        // No error should be thrown, and nothing to assert since hook is unmounted
        expect(true).toBe(true);
    });

    it('should debounce multiple rapid changes', () => {
        let value = 'a';
        const { result, rerender } = renderHook(({ val }) => useDebounce(val, 100), {
            initialProps: { val: value },
        });

        value = 'b';
        rerender({ val: value });
        act(() => {
            jest.advanceTimersByTime(50);
        });

        value = 'c';
        rerender({ val: value });
        act(() => {
            jest.advanceTimersByTime(50);
        });

        // Should still be initial value
        expect(result.current).toBe('a');

        act(() => {
            jest.advanceTimersByTime(100);
        });

        expect(result.current).toBe('c');
    });

    it('should handle null and undefined values', () => {
        const { result, rerender } = renderHook(({ val }: { val: string | null | undefined }) => useDebounce(val, 100), {
            initialProps: { val: null as string | null | undefined },
        });

        expect(result.current).toBeNull();

        rerender({ val: undefined });
        act(() => {
            jest.advanceTimersByTime(100);
        });

        expect(result.current).toBeUndefined();
    });
});