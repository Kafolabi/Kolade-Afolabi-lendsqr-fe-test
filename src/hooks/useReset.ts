import { useCallback } from 'react';

interface UseResetProps {
  setFilters: (filters: Record<string, unknown>) => void;
  setCurrentPage: (page: number) => void;
  setOpenFilterColumn: (column: string | null) => void;
  setRowsPerPage?: (rows: number) => void;
  initialRowsPerPage?: number;
}

// export const useReset = ({
//   setFilters,
//   setCurrentPage,
//   setOpenFilterColumn,
//   setRowsPerPage,
//   initialRowsPerPage = 10
// }: UseResetProps) => {
//   const resetFilters = useCallback(() => {
//     // Reset all filters to empty object
//     setFilters({});
    
//     // Reset pagination to first page
//     setCurrentPage(1);
    
//     // Close any open filter dropdowns
//     setOpenFilterColumn(null);
    
//     // Optionally reset rows per page to initial value
//     if (setRowsPerPage) {
//       setRowsPerPage(initialRowsPerPage);
//     }
//   }, [setFilters, setCurrentPage, setOpenFilterColumn, setRowsPerPage, initialRowsPerPage]);

//   return { resetFilters };
// };

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