import { ReactNode } from 'react';
import '../../styles/index.css';

/* eslint-disable-next-line */
export interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'ghost';
}

export function Button({ children, variant = 'primary' }: ButtonProps) {
  return (
    <button
      className={`
      focus:outline-none focus:ring py-2 px-5 text-sm leading-5 rounded-full font-semibold transition-all
      ${
        variant === 'primary' &&
        ' bg-blue-400 hover:bg-blue-500 focus:ring-blue-200 active:bg-blue-600 text-white'
      }
      ${
        variant === 'ghost' &&
        ' bg-transparent border-2 border-blue-400 text-blue-400 hover:text-blue-500 active:text-blue-600'
      }
      `}
    >
      {children}
    </button>
  );
}

export default Button;
