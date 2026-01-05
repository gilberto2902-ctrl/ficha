
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-extrabold text-[#1d5ba5] uppercase tracking-wider">{label}</label>
      <input
        className={`px-4 py-2.5 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all bg-white text-slate-800 font-semibold ${
          error ? 'border-red-500 bg-red-50' : 'border-[#e2e8f0] focus:border-[#1d5ba5]'
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-600 font-bold ml-1">{error}</span>}
    </div>
  );
};

export default Input;