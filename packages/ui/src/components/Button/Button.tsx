import { useState, forwardRef, CSSProperties } from 'react';
import { Loader2 } from 'lucide-react';
import { ButtonProps, TextAlign } from './Button.types';


/**
 * Componente Button - Core librería @kydra/ui
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  label = "Botón",
  color = "#6366f1",
  variant = "filled",
  icon,
  iconPosition = "left",
  textAlign = "center",
  type = "button",
  onClick,
  className = "",
  disabled = false,
  loading = false,
  kd = {},
  ...props
}, ref) => {
  const [isHovered, setIsHovered] = useState(false);

  // Mapeo de estilos de alineación
  const alignmentStyles: Record<TextAlign, string> = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end'
  };

  // Lógica de estilos dinámicos
  const getDynamicStyles = (): CSSProperties => {
    const activeHover = isHovered && !disabled && !loading;

    const baseStyles: CSSProperties = {
      opacity: disabled || loading ? 0.6 : 1,
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    };

    switch (variant) {
      case 'filled':
        return {
          ...baseStyles,
          backgroundColor: color,
          color: '#ffffff',
          border: '1px solid transparent',
          filter: activeHover ? 'brightness(0.9)' : 'none',
          boxShadow: activeHover ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
        };
      case 'dotted':
        return {
          ...baseStyles,
          backgroundColor: activeHover ? `${color}15` : 'transparent',
          color: color,
          border: `2px dotted ${color}`,
          transform: activeHover ? 'translateY(-1px)' : 'none',
        };
      case 'ghost-hover':
        return {
          ...baseStyles,
          backgroundColor: activeHover ? color : 'transparent',
          color: activeHover ? '#ffffff' : 'currentColor',
          borderColor: activeHover ? 'transparent' : 'currentColor',
          borderWidth: '1px',
          borderStyle: 'solid',
        };
      default:
        return baseStyles;
    }
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{ ...getDynamicStyles(), ...kd }}
      className={`
        group relative px-6 py-3 rounded-lg font-medium 
        active:scale-[0.98] flex items-center min-w-[140px] overflow-hidden
        ${alignmentStyles[textAlign]}
        ${className}
      `}
      {...props}
    >
      <div className={`flex items-center gap-2 ${iconPosition === 'right' ? 'flex-row-reverse' : 'flex-row'}`}>
        {loading ? (
          <Loader2 className="animate-spin" size={18} />
        ) : (
          icon && (
            <span className={`flex items-center transition-transform duration-300 ${isHovered && !disabled ? 'scale-110' : ''}`}>
              {icon}
            </span>
          )
        )}
        <span className="leading-none">{loading ? 'Cargando...' : label}</span>
      </div>
    </button>
  );
});

Button.displayName = "Button";