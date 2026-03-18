import * as react from 'react';
import { ButtonHTMLAttributes, ReactNode, CSSProperties } from 'react';

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

export { Button, type ButtonProps, type ButtonVariant, type IconPosition, type TextAlign };
