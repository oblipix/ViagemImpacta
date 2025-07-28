import React from 'react';
import { Card } from '../Card';
import { Text } from '../Text';

/**
 * 🧩 ResultDisplay Atom
 * 
 * Atom para exibição de resultados de API/testes
 * Reutilizável em páginas de debug, dashboards, etc.
 */
const ResultDisplay = ({ 
  title,
  data = null,
  error = null,
  loading = false,
  success = null,
  status = null,
  timestamp = null,
  className = "",
  titleClassName = "",
  contentClassName = "",
  ...props 
}) => {
  const getStatusColor = () => {
    if (loading) return "border-yellow-300 bg-yellow-50";
    if (error) return "border-red-300 bg-red-50";
    if (success) return "border-green-300 bg-green-50";
    return "border-gray-300 bg-gray-50";
  };

  const getStatusIcon = () => {
    if (loading) return "🔄";
    if (error) return "❌";
    if (success) return "✅";
    return "ℹ️";
  };

  const formatData = (obj) => {
    if (obj === null || obj === undefined) return "null";
    if (typeof obj === 'string') return obj;
    if (typeof obj === 'boolean') return obj.toString();
    if (typeof obj === 'number') return obj.toString();
    return JSON.stringify(obj, null, 2);
  };

  return (
    <Card className={`border-2 ${getStatusColor()} ${className}`} {...props}>
      {/* Header */}
      <div className={`flex items-center justify-between mb-3 ${titleClassName}`}>
        <div className="flex items-center gap-2">
          <span className="text-lg">{getStatusIcon()}</span>
          <Text variant="h4" className="font-semibold">
            {title}
          </Text>
        </div>
        
        {status && (
          <Text variant="body" className="text-sm text-gray-500">
            Status: {status}
          </Text>
        )}
      </div>

      {/* Timestamp */}
      {timestamp && (
        <Text variant="body" className="text-xs text-gray-400 mb-2">
          {new Date(timestamp).toLocaleString()}
        </Text>
      )}

      {/* Content */}
      <div className={`${contentClassName}`}>
        {loading && (
          <Text variant="body" className="text-yellow-600">
            Carregando...
          </Text>
        )}
        
        {error && (
          <div className="text-red-600">
            <Text variant="body" className="font-semibold mb-2">
              Erro:
            </Text>
            <pre className="text-xs bg-red-100 p-2 rounded overflow-auto max-h-40">
              {formatData(error)}
            </pre>
          </div>
        )}
        
        {data && !loading && !error && (
          <div className="text-green-600">
            <Text variant="body" className="font-semibold mb-2">
              Resultado:
            </Text>
            <pre className="text-xs bg-green-100 p-2 rounded overflow-auto max-h-40">
              {formatData(data)}
            </pre>
          </div>
        )}
        
        {!data && !loading && !error && (
          <Text variant="body" className="text-gray-500 italic">
            Nenhum dados disponível
          </Text>
        )}
      </div>
    </Card>
  );
};

export default ResultDisplay;
