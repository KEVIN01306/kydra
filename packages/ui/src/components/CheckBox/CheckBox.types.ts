import { CSSProperties, InputHTMLAttributes } from "react";


/**
 * @interface CheckBoxProps
 * Propiedades para el componente CheckBox estilizado.
 */
export interface CheckBoxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
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
