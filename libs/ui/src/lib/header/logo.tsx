import React from 'react';

interface Props {
  className?: string;
  width?: string;
}
export function Logo({ className, width = '30px', ...props }: Props) {
  return (
    <div className={className}>
      <svg viewBox="100 50 300 300" {...props} style={{ width }}>
        <g fill="none" fillRule="evenodd">
          <path d="M40 340h420v80H40z" />
          <text
            fontFamily="Unica One"
            fontSize={74}
            fontWeight={400}
            fill="#FFF"
            data-text-alignment="C"
            transform="translate(40 340)"
          />
          <path
            d="M250 80c-69.036 0-125 55.964-125 125s55.964 125 125 125"
            fill="#7a57d1"
            opacity={0.5}
          />
          <path
            d="M250 105c-55.228 0-100 44.772-100 100s44.772 100 100 100"
            fill="#7a57d1"
            opacity={0.6}
          />
          <path
            d="M250 125c-44.183 0-80 35.817-80 80s35.817 80 80 80"
            fill="#7a57d1"
            opacity={0.7}
          />
          <path
            d="M250 141c-35.346 0-64 28.654-64 64 0 35.346 28.654 64 64 64"
            fill="#7a57d1"
            opacity={0.8}
          />
          <path
            d="M250 154c-28.167 0-51 22.833-51 51s22.833 51 51 51"
            fill="#FFF"
            opacity={0.5}
          />
          <path
            d="M250 180c-14.36 0-26 11.417-26 25.5s11.64 25.5 26 25.5"
            fill="#FFF"
            opacity={0.5}
          />
          <path
            d="M250 80c69.036 0 125 55.964 125 125s-55.964 125-125 125"
            fill="#4fc1e9"
            opacity={0.5}
          />
          <path
            d="M250 105c55.228 0 100 44.772 100 100s-44.772 100-100 100"
            fill="#4fc1e9"
            opacity={0.6}
          />
          <path
            d="M250 125c44.183 0 80 35.817 80 80s-35.817 80-80 80"
            fill="#4fc1e9"
            opacity={0.7}
          />
          <path
            d="M250 141c35.346 0 64 28.654 64 64 0 35.346-28.654 64-64 64"
            fill="#4fc1e9"
            opacity={0.8}
          />
          <path
            d="M250 154c28.167 0 51 22.833 51 51s-22.833 51-51 51"
            fill="#FFF"
            opacity={0.5}
          />
          <path
            d="M250 180c14.36 0 26 11.417 26 25.5S264.36 231 250 231"
            fill="#FFF"
            opacity={0.5}
          />
        </g>
      </svg>
    </div>
  );
}

export default Logo;
