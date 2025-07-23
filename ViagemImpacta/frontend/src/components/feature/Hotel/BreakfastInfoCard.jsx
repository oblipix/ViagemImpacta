import React from 'react';

function BreakfastInfoCard() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 mb-12 bg-gray-50 rounded-lg p-6 shadow-sm">
      <div className="w-full">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Café da manhã e Outras Facilidades</h3>
        <p className="text-gray-700 text-sm mb-3">
          Desfrute de um delicioso café da manhã continental, incluso em todos os nossos planos. Além disso, o hotel oferece diversas facilidades como piscina, academia, spa e aulas de yoga para tornar sua estadia ainda mais relaxante e completa.
        </p>
        <div className="flex items-center text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.816 1.48-8.279-6.064-5.828 8.332-1.151L12 .587z"/>
            </svg>
          ))}
          <span className="text-gray-600 text-sm ml-2">5 Estrelas</span>
        </div>
      </div>
    </div>
  );
}

export default BreakfastInfoCard;
