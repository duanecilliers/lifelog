import { InputHTMLAttributes } from 'react';
import '../../styles/index.css';

/* eslint-disable-next-line */
export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  fullWidth?: boolean;
}

export function TextField({
  name,
  label,
  fullWidth,
  ...props
}: TextFieldProps) {
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label htmlFor={name} className="mr-4">
          {label}
        </label>
      )}
      <input
        {...props}
        name={name}
        className={`form-input px-4 py-3 rounded-full border-2 border-gray-400 hover:border-gray-500 active:border-gray-600 transition-all
          ${fullWidth && ' w-full'}`}
      />
    </div>
  );
}

export default TextField;
