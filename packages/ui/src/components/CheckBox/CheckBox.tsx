import { Check } from "lucide-react";
import { CSSProperties, forwardRef } from "react";
import { CheckBoxProps } from "./CheckBox.types";


/**
  * Componente CheckBox - Core librería @kydra/ui
 */
export const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(({
  color = "#6366f1",
  label,
  value = false,
  onChange,
  kd = {},
  className = "",
  disabled = false,
  ...props
}, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.checked);
  };

  const customBoxStyles: CSSProperties = {
    '--tw-ring-color': color,
    borderColor: value ? color : '#94a3b8',
    backgroundColor: value ? color : 'transparent',
    ...kd
  } as CSSProperties;

  return (
    <label className={`inline-flex items-center gap-3 cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <div className="relative flex items-center justify-center">
        <input ref={ref} type="checkbox" checked={value} onChange={handleChange} disabled={disabled} className="peer sr-only" {...props} />
        <div style={customBoxStyles} className="w-5 h-5 border-2 rounded-md transition-all duration-200 ease-in-out peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-offset-white dark:peer-focus:ring-offset-slate-900 flex items-center justify-center">
          {value && <Check size={14} className="text-white animate-in zoom-in-50 duration-200" strokeWidth={4} />}
        </div>
      </div>
      {label && <span className="text-sm font-medium leading-none">{label}</span>}
    </label>
  );
});

CheckBox.displayName = "CheckBox";