
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-neutral-700 mb-1">{label}</label>
      <input
        id={id}
        className="w-full px-3 py-2 border border-neutral-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
        {...props}
      />
    </div>
  );
};

export default Input;
