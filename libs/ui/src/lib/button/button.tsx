import { ReactNode } from 'react';
import './button.module.css';

/* eslint-disable-next-line */
export interface ButtonProps {
  children: ReactNode;
}

export function Button({ children }: ButtonProps) {
  return <button>{children}</button>;
}

export default Button;
