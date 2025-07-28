import React from 'react';
import { Text } from '../Text';

/**
 * 🧩 FormGroup Atom
 * 
 * Atom reutilizável para agrupar labels, inputs e mensagens de erro
 * Padroniza a estrutura de formulários em toda a aplicação
 */
const FormGroup = ({ 
  children, 
  label, 
  htmlFor, 
  error, 
  required = false,
  className = "",
  labelClassName = "",
  errorClassName = "",
  ...props 
}) => {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {label && (
        <label 
          htmlFor={htmlFor} 
          className={`block text-left text-sm font-medium text-gray-700 mb-2 ${labelClassName}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {error && (
        <Text 
          variant="body" 
          className={`text-red-600 text-sm mt-1 ${errorClassName}`}
        >
          {error}
        </Text>
      )}
    </div>
  );
};

export default FormGroup;
