import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import react__default, { InputHTMLAttributes, CSSProperties, ButtonHTMLAttributes, ReactNode } from 'react';
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
    format?: (value: any, row: T, highlightColor: string) => react__default.ReactNode;
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
    emptyState?: react__default.ComponentType;
    darkMode?: boolean;
}
interface Identifiable {
    id: string | number;
}
declare const Table: <T extends Identifiable>({ data, columns, pagination, selectable, customArrayPagination, defaultPageSize, filter, filterPlaceholder, color, add, textAdd, actionAdd, excelExport, onDeleteRows, emptyState: CustomEmptyState, darkMode }: TableProps<T>) => react_jsx_runtime.JSX.Element;

type InputVariant = 'standard' | 'underlined' | 'filled';
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    /** Componente de icono opcional que aparecerá al inicio */
    icon?: React.ComponentType<{
        className?: string;
    }>;
    /** Color de énfasis para el borde de enfoque y el label activo */
    color?: string;
    /** Etiqueta flotante del input */
    label?: string;
    /** Mensaje de error que se muestra debajo del input */
    error?: string;
    /** Variante estética del campo de texto */
    variant?: InputVariant;
    /** Función que se ejecuta al cambiar el valor del texto */
    onChange?: (value: string) => void;
    /** Función opcional para limpiar el contenido del input */
    onClear?: () => void;
    /** Estilos personalizados directos para el contenedor del input */
    kd?: CSSProperties;
}

declare const Input: react.ForwardRefExoticComponent<InputProps & react.RefAttributes<HTMLInputElement>>;

/**
 * @interface CheckBoxProps
 * Propiedades para el componente CheckBox estilizado.
 */
interface CheckBoxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
    /** @param color - Color del fondo cuando el checkbox está seleccionado. */
    color?: string;
    /** @param label - Texto que se muestra a la par del control. */
    label?: string;
    /** @param value - Estado booleano (checked/unchecked). */
    value?: boolean;
    /** @param onChange - Callback que retorna el nuevo valor booleano. */
    onChange?: (checked: boolean) => void;
    /** @param kd - Estilos CSS para el cuadro visual (ej: borderRadius para hacerlo circular). */
    kd?: CSSProperties;
}

/**
  * Componente CheckBox - Core librería @kydra/ui
 */
declare const CheckBox: react.ForwardRefExoticComponent<CheckBoxProps & react.RefAttributes<HTMLInputElement>>;

type ButtonVariant = 'filled' | 'dotted' | 'ghost-hover';
type IconPosition = 'left' | 'right';
type TextAlign = 'left' | 'center' | 'right';
/**
 * @interface ButtonProps
 * Propiedades para el componente Button.
 * Extiende los atributos nativos de un botón HTML.
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** @param label - Texto descriptivo que se muestra dentro del botón. */
    label?: string;
    /** @param color - Color principal del botón en formato Hex, RGB o HSL. */
    color?: string;
    /** @param variant - Estilo visual: 'filled' (sólido), 'dotted' (punteado) o 'ghost-hover' (relleno al hover). */
    variant?: ButtonVariant;
    /** @param icon - Elemento de icono (ReactNode) que acompaña al texto. */
    icon?: ReactNode;
    /** @param iconPosition - Ubicación del icono: 'left' (izquierda) o 'right' (derecha). */
    iconPosition?: IconPosition;
    /** @param textAlign - Alineación horizontal del contenido interno. */
    textAlign?: TextAlign;
    /** @param loading - Si es true, muestra un spinner y bloquea la interacción. */
    loading?: boolean;
    /** @param kd - Objeto de estilos CSS personalizados para modificaciones directas (Kydra Design). */
    kd?: CSSProperties;
}

/**
 * Componente Button - Core librería @kydra/ui
 */
declare const Button: react.ForwardRefExoticComponent<ButtonProps & react.RefAttributes<HTMLButtonElement>>;

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

export { Button, type ButtonProps, type ButtonVariant, CheckBox, type CheckBoxProps, type IconPosition, Input, type InputProps, type InputVariant, Navbar, type NavbarPosition, type NavbarProps, Table, type TableAction, type TableColumn, type TextAlign };
