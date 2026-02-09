import * as react_jsx_runtime from 'react/jsx-runtime';
import React$1 from 'react';
import { LucideIcon } from 'lucide-react';

interface TableAction<T> {
    label: string;
    icon?: LucideIcon;
    onClick: (row: T) => void;
    color?: string;
}
interface TableColumn<T> {
    header: string;
    accessor: keyof T;
    filter?: boolean;
    hidden?: boolean;
    align?: 'left' | 'center' | 'right';
    format?: (value: any, row: T, highlightColor: string) => React$1.ReactNode;
    actions?: TableAction<T>[];
}
interface TableProps<T> {
    data: T[];
    columns: TableColumn<T>[];
    pagination?: boolean;
    selectable?: boolean;
    customArrayPagination?: number[];
    defaultPageSize?: number;
    filter?: boolean;
    filterPlaceholder?: string;
    color?: string;
    add?: boolean;
    textAdd?: string;
    actionAdd?: () => void;
    excelExport?: boolean;
    onDeleteRows?: (ids: (string | number)[]) => void;
    emptyState?: React$1.ComponentType;
    darkMode?: boolean;
}
interface Identifiable {
    id: string | number;
}
/**
 * Main Table Component
 */
declare const Table: <T extends Identifiable>({ data, columns, pagination, selectable, customArrayPagination, defaultPageSize, filter, filterPlaceholder, color, add, textAdd, actionAdd, excelExport, onDeleteRows, emptyState: CustomEmptyState, darkMode }: TableProps<T>) => react_jsx_runtime.JSX.Element;

declare const Input: React.FC<{
    icon?: LucideIcon;
    type?: string;
    color?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    onClear?: () => void;
    darkMode?: boolean;
}>;

export { Input, Table, type TableAction, type TableColumn };
