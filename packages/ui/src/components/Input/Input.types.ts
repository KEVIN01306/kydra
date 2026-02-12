import { CSSProperties, InputHTMLAttributes } from "react";

export type InputVariant = 'standard' | 'underlined' | 'filled';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  /** Componente de icono opcional que aparecerá al inicio */
  icon?: React.ComponentType<{ className?: string }>;
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