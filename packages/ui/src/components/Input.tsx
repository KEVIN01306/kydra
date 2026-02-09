import { LucideIcon, X } from "lucide-react";

export const Input: React.FC<{
  icon?: LucideIcon;
  type?: string;
  color?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onClear?: () => void;
  darkMode?: boolean;
}> = ({ 
  icon: Icon, 
  type = "text", 
  color = "#2563eb", 
  value, 
  onChange, 
  placeholder,
  onClear,
  darkMode
}) => {
  return (
    <div className={`relative group w-full ${darkMode ? 'dark' : ''}`} style={{ '--highlight': color } as React.CSSProperties}>
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 group-focus-within:text-[var(--highlight)] text-slate-400">
          <Icon className="w-4 h-4" />
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          block w-full py-2.5 text-sm bg-white dark:bg-slate-900 
          border border-slate-200 dark:border-slate-800 rounded-xl 
          outline-none transition-all dark:text-white
          focus:ring-2 focus:ring-[var(--highlight)]/20 focus:border-[var(--highlight)]
          ${Icon ? 'pl-10' : 'pl-4'}
          ${onClear ? 'pr-10' : 'pr-4'}
        `}
      />
      {value && onClear && (
        <button 
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
