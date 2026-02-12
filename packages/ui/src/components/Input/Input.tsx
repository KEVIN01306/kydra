import { X } from "lucide-react";
import { CSSProperties, forwardRef, useState } from "react";
import { InputProps } from "./Input.types";


export const Input = forwardRef<HTMLInputElement, InputProps>(({
  icon: Icon,
  color = "#6366f1",
  label,
  error,
  variant = "standard",
  type = "text",
  value = "",
  onChange,
  onClear,
  placeholder,
  disabled,
  className = "",
  kd = {},
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.value);
  };

  const isFloating = isFocused || (value && value.toString().length > 0);

  const getVariantClasses = () => {
    const base = "block w-full text-sm transition-all outline-none dark:text-white";
    
    switch (variant) {
      case 'filled':
        return `${base} pt-6 pb-3 px-4 bg-slate-100 dark:bg-slate-800 border-b-2 border-transparent rounded-t-xl focus:bg-slate-50 dark:focus:bg-slate-900 focus:border-[var(--highlight)] ${error ? 'border-red-400 bg-red-50 dark:bg-red-950/20' : ''}`;
      case 'underlined':
        return `${base} pt-6 pb-3 bg-transparent border-b-2 border-slate-200 dark:border-slate-800 rounded-none px-0 focus:border-[var(--highlight)] focus:ring-0 ${error ? 'border-red-400' : ''}`;
      case 'standard':
      default:
        // Ajustado: Se eliminan las clases por defecto de Tailwind de ring para usar el color dinámico en el borde de focus
        return `${base} py-3.5 px-4 bg-white dark:bg-slate-900 border rounded-xl 
          ${error 
            ? 'border-red-400 focus:border-red-500 ring-0 focus:ring-2 focus:ring-red-500/10' 
            : 'border-slate-200 dark:border-slate-800 focus:border-[var(--highlight)] ring-0 focus:ring-2 focus:ring-[var(--highlight)]/20'}`;
    }
  };

  return (
    <div className={`flex flex-col gap-1 w-full ${className}`} style={{ '--highlight': color } as CSSProperties}>
      <div className="relative flex items-center group">
        
        {/* Label Flotante - Ajustado simétricamente */}
        {label && (
          <label 
            className={`
              absolute pointer-events-none transition-all duration-200 ease-in-out z-20
              ${isFloating 
                ? `text-[10px] font-bold uppercase tracking-wider ${error ? 'text-red-500' : 'text-[var(--highlight)]'}` 
                : 'text-sm font-medium text-slate-400'}
              
              /* Alineación Horizontal: Uniforme en standard y filled */
              ${variant === 'underlined' ? 'left-0' : 'left-4'}

              /* Posicionamiento Vertical */
              ${variant === 'standard' 
                ? (isFloating ? '-top-2 px-1.5 bg-white dark:bg-slate-900 translate-x-[-4px]' : 'top-1/2 -translate-y-1/2') 
                : (isFloating ? 'top-1.5' : 'top-[31px] -translate-y-1/2')}

              /* Ajuste por Icono cuando NO flota */
              ${!isFloating && Icon ? 'pl-7' : ''}
            `}
          >
            {label}
          </label>
        )}

        {/* Icono */}
        {Icon && (
          <div className={`absolute flex items-center pointer-events-none transition-colors duration-200 z-10
            ${variant === 'underlined' ? 'left-0' : 'left-4'}
            ${variant === 'standard' ? 'top-1/2 -translate-y-1/2' : 'top-[31px] -translate-y-1/2'}
            ${error ? 'text-red-400' : isFocused ? 'text-[var(--highlight)]' : 'text-slate-400'}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          ref={ref}
          type={type}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleChange}
          disabled={disabled}
          placeholder={isFocused && isFloating ? placeholder : ""} 
          style={{ ...kd } as CSSProperties}
          className={`
            ${getVariantClasses()}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            /* Padding Left: alineado con el icono */
            ${Icon ? (variant === 'underlined' ? 'pl-7' : 'pl-11') : (variant === 'underlined' ? 'pl-0' : 'pl-4')}
            ${onClear ? 'pr-10' : 'pr-4'}
            relative z-0
          `}
          {...props}
        />

        {/* Botón de Limpiar */}
        {value && onClear && !disabled && (
          <button 
            type="button"
            onClick={onClear}
            className={`absolute right-0 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors z-20
              ${variant === 'underlined' ? 'pr-0 top-[31px] -translate-y-1/2' : 'pr-3 top-1/2 -translate-y-1/2'}`}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {error && <span className="text-[10px] font-bold text-red-500 ml-1 uppercase tracking-tight animate-in slide-in-from-top-1 duration-200">{error}</span>}
    </div>
  );
});


Input.displayName = "Input";