import { renderHook, act } from '@testing-library/react';
import { useReset } from '../useReset';

describe('useReset', () => {
    let setFilters: jest.Mock;
    let setCurrentPage: jest.Mock;
    let setOpenFilterColumn: jest.Mock;
    let setRowsPerPage: jest.Mock;

    beforeEach(() => {
        setFilters = jest.fn();
        setCurrentPage = jest.fn();
        setOpenFilterColumn = jest.fn();
        setRowsPerPage = jest.fn();
    });

    it('should reset filters, current page, open filter column, and rows per page', () => {
        const { result } = renderHook(() =>
            useReset({
                setFilters,
                setCurrentPage,
                setOpenFilterColumn,
                setRowsPerPage,
                initialRowsPerPage: 20,
            })
        );

        act(() => {
            result.current.resetFilters();
        });

        expect(setFilters).toHaveBeenCalledWith({});
        expect(setCurrentPage).toHaveBeenCalledWith(1);
        expect(setOpenFilterColumn).toHaveBeenCalledWith(null);
        expect(setRowsPerPage).toHaveBeenCalledWith(20);
    });

    it('should use default initialRowsPerPage if not provided', () => {
        const { result } = renderHook(() =>
            useReset({
                setFilters,
                setCurrentPage,
                setOpenFilterColumn,
                setRowsPerPage,
            })
        );

        act(() => {
            result.current.resetFilters();
        });

        expect(setRowsPerPage).toHaveBeenCalledWith(10);
    });

    it('should not call setRowsPerPage if not provided', () => {
        const { result } = renderHook(() =>
            useReset({
                setFilters,
                setCurrentPage,
                setOpenFilterColumn,
            })
        );

        act(() => {
            result.current.resetFilters();
        });

        expect(setRowsPerPage).not.toHaveBeenCalled();
    });

    it('should throw if required setters are not provided', () => {
        // @ts-expect-error Testing missing required setters for useReset
        expect(() => useReset({})).toThrow();
    });

    it('should not throw if optional setters are omitted', () => {
        expect(() =>
            useReset({
                setFilters,
                setCurrentPage,
                setOpenFilterColumn,
            })
        ).not.toThrow();
    });
});