import React from 'react';

// 🎯 ATOMIC COMPONENT - InputWithIcon
const InputWithIcon = ({ 
    type = 'text',
    placeholder,
    value,
    onChange,
    icon,
    label,
    id,
    className = '',
    required = false,
    ...props 
}) => {
    const inputId = id || placeholder?.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className={className}>
            {label && (
                <label htmlFor={inputId} className="labelForms">
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        {icon}
                    </span>
                )}
                <input
                    type={type}
                    id={inputId}
                    placeholder={placeholder}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 ${icon ? 'pl-10' : ''} text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500`}
                    value={value}
                    onChange={onChange}
                    required={required}
                    {...props}
                />
            </div>
        </div>
    );
};

export default InputWithIcon;
