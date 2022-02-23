import { ReactNode } from 'react';
import '../../styles/index.css';

/* eslint-disable-next-line */
export interface ButtonProps {
  children: ReactNode;
}

export function Button({ children }: ButtonProps) {
  return (
    <button className="bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 active:bg-blue-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white transition-all">
      {children}
    </button>
  );
}

export default Button;
