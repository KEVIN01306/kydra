import { Menu, X } from "lucide-react";
import { CSSProperties, ReactNode } from "react";



export type NavbarPosition = 'static' | 'sticky' | 'fixed-bottom-floating';

/**
 * @interface NavbarProps
 * Propiedades para el componente Navbar altamente configurable.
 */
export interface NavbarProps {
  /** @param title - Título o logo del Navbar. */
  title?: ReactNode;
  /** @param position - Posición del Nav: 'static' (arriba normal), 'sticky' (pegado arriba), 'fixed-bottom-floating' (abajo flotante). */
  position?: NavbarPosition;
  /** @param color - Color principal para detalles o fondo (si colorDominant es true). */
  color?: string;
  /** @param colorDominant - Si es true, el color de la prop 'color' se convierte en el fondo principal. */
  colorDominant?: boolean;
  /** @param isMenuOpen - Estado controlado para el menú hamburguesa móvil. */
  isMenuOpen?: boolean;
  /** @param onToggleMenu - Función para abrir/cerrar el menú. */
  onToggleMenu?: () => void;
  /** @param children - Elementos de navegación o acciones. */
  children?: ReactNode;
  /** @param kd - Estilos CSS personalizados para el contenedor del Navbar. */
  kd?: CSSProperties;
}

/**
 * Componente Navbar - Barra de navegación adaptable con soporte para múltiples posiciones y temas.
 * Gestiona automáticamente el contraste del texto según el fondo.
 */
export const Navbar = ({
  title = "Kydra Nav",
  position = "static",
  color = "#6366f1",
  colorDominant = false,
  isMenuOpen = false,
  onToggleMenu,
  children,
  kd = {}
}: NavbarProps) => {
  const getPositionClasses = () => {
    switch (position) {
      case 'sticky': return 'sticky top-0 z-50';
      case 'fixed-bottom-floating': return 'fixed bottom-6 left-6 right-6 z-50 rounded-2xl shadow-2xl max-w-5xl mx-auto';
      default: return 'relative';
    }
  };

  const navStyles: CSSProperties = {
    backgroundColor: colorDominant ? color : undefined,
    borderColor: !colorDominant ? `${color}40` : 'transparent',
    // Si el color es dominante, forzamos blanco. Si no, dejamos que herede del tema oscuro/claro
    color: colorDominant ? '#ffffff' : undefined,
    ...kd
  };

  return (
    <nav 
      style={navStyles}
      className={`
        ${getPositionClasses()}
        px-6 py-4 border-b transition-all duration-300
        ${!colorDominant 
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md dark:border-slate-800 text-slate-900 dark:text-white' 
          : 'border-none text-white'}
      `}
    >
      <div className="flex items-center justify-between gap-4">
        {/* Logo / Título */}
        <div className="flex items-center gap-2 font-black text-lg tracking-tight">
          {typeof title === 'string' ? (
            <span style={{ color: colorDominant ? 'white' : color }}>{title}</span>
          ) : title}
        </div>

        {/* Desktop Actions - Heredan el color del padre */}
        <div className="hidden md:flex items-center gap-6">
          {children}
        </div>

        {/* Hamburguesa Mobile */}
        <button 
          onClick={onToggleMenu}
          className={`md:hidden p-2 rounded-lg transition-colors ${colorDominant ? 'hover:bg-white/10' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className={`md:hidden mt-4 pb-4 animate-in slide-in-from-top-2 duration-200 border-t pt-4 ${colorDominant ? 'border-white/20' : 'border-black/5 dark:border-white/5'}`}>
          <div className="flex flex-col gap-4">
            {children}
          </div>
        </div>
      )}
    </nav>
  );
};