export function useReset({
    setFilters,
    setCurrentPage,
    setOpenFilterColumn,
    setRowsPerPage,
    initialRowsPerPage = 10,
}: {
    setFilters: (filters: Record<string, unknown>) => void;
    setCurrentPage: (page: number) => void;
    setOpenFilterColumn: (column: string | null) => void;
    setRowsPerPage?: (rows: number) => void;
    initialRowsPerPage?: number;
}) {
    if (!setFilters || !setCurrentPage || !setOpenFilterColumn) {
        throw new Error('Missing required setters');
    }

    const resetFilters = () => {
        setFilters({});
        setCurrentPage(1);
        setOpenFilterColumn(null);
        if (setRowsPerPage) {
            setRowsPerPage(initialRowsPerPage);
        }
    };

    return { resetFilters };
}