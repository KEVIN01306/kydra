import React, { 
  useState, 
  useMemo, 
  useRef,
  useContext,
  createContext
} from 'react';
import { createPortal } from 'react-dom';
import { 
  MoreHorizontal,
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  Search, 
  Plus,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Inbox,
  Download,
  LucideIcon,
} from 'lucide-react';
import { Input } from './Input/Input';
import { CheckBox } from './CheckBox/CheckBox';
import { Button } from './Button/Button';

// --- Contexto para el Tema ---
interface TableTheme {
  darkMode: boolean;
  color: string;
}

const TableContext = createContext<TableTheme>({ darkMode: false, color: '#2563eb' });
const useTableTheme = () => useContext(TableContext);

// --- Tipos e Interfaces ---

export interface TableAction<T> {
  label: string;
  icon?: LucideIcon;
  onClick: (row: T) => void;
  color?: string;
}

export interface TableColumn<T> {
  header: string;
  accessor: keyof T;
  filter?: boolean;
  hidden?: boolean;
  align?: 'left' | 'center' | 'right';
  format?: (value: any, row: T, highlightColor: string) => React.ReactNode;
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
  emptyState?: React.ComponentType;
  darkMode?: boolean;
}

interface Identifiable {
  id: string | number;
}

// --- Componentes de Fila y Acción ---

const TableRow = React.memo(<T extends Identifiable>({ 
  row, 
  columns, 
  selectable,
  isSelected, 
  onSelect 
}: {
  row: T;
  columns: TableColumn<T>[];
  selectable: boolean;
  isSelected: boolean;
  onSelect: (id: string | number) => void;
}) => {
  const { color } = useTableTheme();
  const alignmentClasses = { left: 'text-left', center: 'text-center', right: 'text-right' };

  return (
    <tr className="group transition-colors duration-150 hover:bg-[var(--highlight)]/5">
      {selectable && (
        <td className="px-6 py-4 border-b border-transparent">
            <CheckBox color={color} value={isSelected} onChange={() => onSelect(row.id)}/>
        </td>
      )}
      {columns.filter(c => !c.hidden).map((col) => (
        <td
          key={String(col.accessor)}
          className={`
            whitespace-nowrap px-6 py-4 
            text-slate-600 dark:text-slate-300
            transition-colors group-hover:text-slate-900 dark:group-hover:text-white
            ${alignmentClasses[col.align || 'left']}
          `}
        >
          {col.actions ? (
            <ActionButton actions={col.actions} row={row} />
          ) : col.format ? (
            col.format(row[col.accessor], row, color)
          ) : (
            String(row[col.accessor] ?? '')
          )}
        </td>
      ))}
    </tr>
  );
});

const DropdownPortal = <T,>({ isOpen, onClose, anchorRect, actions, row }: {
  isOpen: boolean;
  onClose: () => void;
  anchorRect: DOMRect | null;
  actions: TableAction<T>[];
  row: T;
}) => {
  const { darkMode, color } = useTableTheme();
  if (!isOpen || !anchorRect) return null;

  const style: React.CSSProperties = {
    position: 'fixed',
    top: `${anchorRect.bottom + 8}px`,
    left: `${anchorRect.right - 192}px`, 
    zIndex: 9999,
  };

  return createPortal(
    <div className={darkMode ? 'dark' : ''} style={{ '--highlight': color } as React.CSSProperties}>
      <div className="fixed inset-0 z-[9998]" onClick={onClose} />
      <div 
        style={style}
        className="w-48 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl ring-1 ring-black ring-opacity-5 dark:border-slate-700 dark:bg-slate-800 animate-in fade-in zoom-in duration-150"
      >
        <div className="py-1">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={() => { action.onClick(row); onClose(); }}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50 ${action.color || 'text-slate-700 dark:text-slate-200'}`}
              >
                {Icon && <Icon className="w-4 h-4 opacity-70" />}
                <span className="font-medium">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>,
    document.body
  );
};

const ActionButton = <T,>({ actions, row }: { actions: TableAction<T>[], row: T }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (buttonRef.current) {
      setAnchorRect(buttonRef.current.getBoundingClientRect());
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button 
        ref={buttonRef}
        onClick={handleToggle}
        className={`p-2 rounded-full transition-all duration-200 ${isOpen ? 'bg-[var(--highlight)]/10 text-[var(--highlight)]' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400'}`}
      >
        <MoreHorizontal className="w-5 h-5" />
      </button>
      <DropdownPortal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        anchorRect={anchorRect} 
        actions={actions} 
        row={row} 
      />
    </>
  );
};

// --- Componente Principal ---

export const Table = <T extends Identifiable>({ 
  data = [], 
  columns = [], 
  pagination = true, 
  selectable = false, 
  customArrayPagination = [5, 10, 25, 50, 100],
  defaultPageSize = 10,
  filter = false,
  filterPlaceholder = "Buscar registros...",
  color = "#2563eb",
  add = false,
  textAdd = "Agregar",
  actionAdd = () => {},
  excelExport = false, 
  onDeleteRows = () => {},
  emptyState: CustomEmptyState,
  darkMode = false
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof T | null, direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());

  const themeValue = useMemo(() => ({ darkMode, color }), [darkMode, color]);

  const handleSort = (key: keyof T) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const processedData = useMemo(() => {
    let result = [...data];
    if (filter && searchTerm) {
      const searchableAccessors = columns.filter(c => c.filter).map(c => c.accessor);
      result = result.filter(row => 
        searchableAccessors.some(acc => String(row[acc] ?? '').toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (sortConfig.key) {
      result.sort((a, b) => {
        const valA = a[sortConfig.key!];
        const valB = b[sortConfig.key!];
        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return result;
  }, [data, searchTerm, filter, columns, sortConfig]);

  const totalPages = Math.ceil(processedData.length / pageSize) || 1;
  const currentData = pagination 
    ? processedData.slice((currentPage - 1) * pageSize, currentPage * pageSize) 
    : processedData;

  const toggleSelectAll = () => {
    if (currentData.length > 0 && selectedRows.size === currentData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(currentData.map(r => r.id)));
    }
  };

  const toggleSelectRow = (id: string | number) => {
    const newSelection = new Set(selectedRows);
    if (newSelection.has(id)) newSelection.delete(id);
    else newSelection.add(id);
    setSelectedRows(newSelection);
  };

  const handleExportCSV = () => {
    const visibleColumns = columns.filter(c => !c.hidden && !c.actions);
    const headers = visibleColumns.map(c => `"${c.header}"`).join(',');
    const rows = processedData.map(row => 
      visibleColumns.map(c => {
        const val = row[c.accessor];
        return `"${String(val ?? '').replace(/"/g, '""')}"`;
      }).join(',')
    ).join('\n');

    const csvContent = "\uFEFF" + headers + '\n' + rows;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Export_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const alignmentClasses = { left: 'text-left', center: 'text-center', right: 'text-right' };

  return (
    <TableContext.Provider value={themeValue}>
      <div className={`flex flex-col gap-4 w-full ${darkMode ? 'dark' : ''}`} style={{ '--highlight': color } as React.CSSProperties}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-1 gap-4 w-full sm:w-auto">
            {filter && (
              <div className="w-full sm:max-w-xs">
                {/* Usamos el InternalInput para evitar errores de compilación por archivos inexistentes */}
                <Input 
                  icon={Search}
                  color={color}
                  value={searchTerm}
                  onChange={setSearchTerm}
                  label={filterPlaceholder}
                  onClear={() => setSearchTerm("")}
                />
              </div>
            )}
            
            {selectable && selectedRows.size > 0 && (
              <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left-4">
                <span className="text-sm font-bold text-slate-500 hidden md:inline">{selectedRows.size} seleccionados</span>
                <button 
                  onClick={() => { onDeleteRows(Array.from(selectedRows)); setSelectedRows(new Set()); }}
                  className="text-xs font-bold text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-500/10 px-4 py-2.5 rounded-xl transition-all active:scale-95 flex items-center gap-2 border border-red-100 dark:border-red-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Eliminar</span>
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {excelExport && (
              <Button
                onClick={handleExportCSV}
                color='green'
                icon={<Download className="w-4 h-4" />}
                label='Exportar'
              >
                
              </Button>
            )}

            {add && (
                <>
                <Button
                    onClick={actionAdd}
                    kd={{ backgroundColor: 'var(--highlight)'}}
                    icon={<Plus className="w-4 h-4" />}
                    label={textAdd}
                    >
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="w-full rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0 text-sm">
              <thead className="bg-slate-50/50 dark:bg-slate-950/40">
                <tr>
                  {selectable && (
                    <th className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 w-10 text-left">
                        <CheckBox color={color} value={currentData.length > 0 && selectedRows.size === currentData.length} onChange={toggleSelectAll}/>
                    </th>
                  )}    
                  {columns.filter(c => !c.hidden).map((col) => (
                    <th
                      key={String(col.accessor)}
                      onClick={() => handleSort(col.accessor)}
                      className={`
                        px-6 py-4 font-bold uppercase tracking-tight text-slate-500 dark:text-slate-400
                        ${alignmentClasses[col.align || 'left']}
                        border-b border-slate-100 dark:border-slate-800 cursor-pointer select-none group/th
                      `}
                    >
                      <div className={`flex items-center gap-2 ${col.align === 'center' ? 'justify-center' : col.align === 'right' ? 'justify-end' : ''}`}>
                        {col.header}
                        <span className={`transition-colors ${sortConfig.key === col.accessor ? 'text-[var(--highlight)]' : 'text-slate-300 opacity-0 group-hover/th:opacity-100'}`}>
                          {sortConfig.key === col.accessor 
                            ? (sortConfig.direction === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />)
                            : <ArrowUpDown className="w-3 h-3" />
                          }
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {currentData.length > 0 ? (
                  currentData.map((row) => (
                    <TableRow 
                      key={row.id} 
                      row={row} 
                      columns={columns as any} 
                      selectable={selectable}
                      isSelected={selectedRows.has(row.id)}
                      onSelect={toggleSelectRow}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length + (selectable ? 1 : 0)}>
                      {CustomEmptyState ? <CustomEmptyState /> : (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
                          <Inbox className="w-12 h-12 opacity-20" />
                          <p className="font-medium italic">No se encontraron registros para mostrar</p>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {pagination && processedData.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2">
                <span>Mostrar</span>
                <div className="relative">
                  <select 
                    value={pageSize}
                    onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                    className="appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 pr-8 focus:outline-none focus:ring-2 focus:ring-[var(--highlight)]/20 cursor-pointer text-slate-700 dark:text-slate-300 font-bold"
                  >
                    {customArrayPagination.map(size => <option key={size} value={size}>{size}</option>)}
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 disabled:opacity-30 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"><ChevronLeft className="w-4 h-4" /></button>
              <div className="flex items-center gap-1 min-w-[60px] justify-center">
                <span className="font-bold text-[var(--highlight)]">{currentPage}</span>
                <span className="opacity-30">/</span>
                <span>{totalPages}</span>
              </div>
              <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 disabled:opacity-30 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        )}
      </div>
    </TableContext.Provider>
  );
};

export default Table;