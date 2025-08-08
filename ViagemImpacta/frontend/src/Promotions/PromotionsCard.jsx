import { Link } from 'react-router-dom';

// Função para formatar data removendo hora e timezone
const formatDateForDisplay = (dateString) => {
    if (!dateString) return '';

    try {
        // Remove a parte da hora se existir
        let cleanDateString = dateString;
        if (cleanDateString.includes('T')) {
            cleanDateString = cleanDateString.split('T')[0];
        } else if (cleanDateString.includes(' ')) {
            cleanDateString = cleanDateString.split(' ')[0];
        }

        // Se já está no formato DD/MM/YYYY, retorna como está
        if (cleanDateString.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
            return cleanDateString;
        }

        // Se está no formato YYYY-MM-DD, converte para DD/MM/YYYY
        if (cleanDateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
            const [year, month, day] = cleanDateString.split('-');
            return `${day}/${month}/${year}`;
        }

        // Tenta fazer parsing da data
        const date = new Date(cleanDateString + 'T00:00:00');
        if (isNaN(date.getTime())) {
            return cleanDateString;
        }

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    } catch {
        // Em caso de erro, tenta pelo menos remover a parte da hora
        return dateString.includes('T') ? dateString.split('T')[0] : dateString;
    }
};

function PromotionsCard({ promotion }) {
    return (
        <Link to={`/promocao/${promotion.id}`}
            className="block hotel-card-modern bg-white rounded-xl shadow-md border-0 overflow-hidden
                         h-full flex flex-col transition-all duration-300 hover:shadow-xl
                         w-full max-w-sm mx-auto sm:max-w-none min-h-[420px] sm:min-h-[450px]">
            <div className="relative w-full h-48 sm:h-56 overflow-hidden">
                <img
                    src={promotion.bannerPromotion || promotion.mainImageUrl || promotion.imageUrl || '/default-promotion.jpg'}
                    alt={promotion.title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="p-3 sm:p-4 flex-grow flex flex-col justify-between bg-gradient-to-b from-white to-gray-50">
                <div>
                    <div className="mb-2">
                        <h4 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
                            {promotion.title}
                        </h4>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                            {promotion.description}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                        <span className="text-gray-700 text-sm">
                            <strong>Hotel:</strong> {promotion.hotelName}
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                        <span className="text-gray-600 text-sm">
                            <strong>Check-in:</strong> {formatDateForDisplay(promotion.checkIn)}
                        </span>
                        <span className="text-gray-600 text-sm">
                            <strong>Check-out:</strong> {formatDateForDisplay(promotion.checkOut)}
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                        <span className="text-red-600 text-sm">
                            <strong>Promoção válida até:</strong> {formatDateForDisplay(promotion.validUntil)}
                        </span>
                    </div>
                    <div className="mb-3 flex items-center gap-3">
                        <span className="text-red-500 text-sm line-through">
                            R$ {Number(promotion.originalPrice).toFixed(2).replace('.', ',')}
                        </span>
                        <span className="text-green-600 text-xl font-bold">
                            R$ {Number(promotion.totalPrice).toFixed(2).replace('.', ',')}
                        </span>
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                            -{promotion.discountPercent}%
                        </span>
                    </div>
                </div>
                <div className="mt-auto">
                    <div className="main-action-button text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-bold text-xs sm:text-sm bg-blue-500 hover:bg-blue-600 transition-colors duration-200">
                        Ver detalhes
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default PromotionsCard;