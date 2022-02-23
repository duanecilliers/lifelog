import { HTMLAttributes, ReactNode } from 'react';
import '../../styles/index.css';

/* eslint-disable-next-line */
export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'text' | 'contained' | 'outline';
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'contained',
  fullWidth = false,
}: ButtonProps) {
  return (
    <button
      className={`
      focus:outline-none focus:ring py-2 px-5 text-sm leading-5 rounded-full font-semibold transition-all
      ${fullWidth && ' w-full'}
      ${
        variant === 'text' &&
        ' border-2 border-transparent bg-transparent text-blue-400'
      }
      ${
        variant === 'contained' &&
        ' border-2 border-transparent bg-blue-400 border-blue-400 hover:bg-blue-500 focus:ring-blue-200 active:bg-blue-600 text-white'
      }
      ${
        variant === 'outline' &&
        ' border-2 border-blue-400 hover:border-blue-500 focus:ring-blue-200 active:border-blue-600 text-blue-400 hover:text-blue-500 active:text-blue-600'
      }
      `}
    >
      {children}
    </button>
  );
}

export default Button;
