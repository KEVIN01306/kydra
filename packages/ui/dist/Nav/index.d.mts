import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode, CSSProperties } from 'react';

type NavbarPosition = 'static' | 'sticky' | 'fixed-bottom-floating';
/**
 * @interface NavbarProps
 * Propiedades para el componente Navbar altamente configurable.
 */
interface NavbarProps {
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
declare const Navbar: ({ title, position, color, colorDominant, isMenuOpen, onToggleMenu, children, kd }: NavbarProps) => react_jsx_runtime.JSX.Element;

export { Navbar, type NavbarPosition, type NavbarProps };
