import { useState, useEffect} from 'react';
import PaymentSuccessPage from './PaymentSuccessPage.jsx'; // Importando a página de sucesso de pagamento
import API_CONFIG from '../../config/apiConfig.js';

function ConfirmReservation() {
    const [statusMessage, setStatusMessage] = useState("Confirmando sua Reserva");
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const sessionId = params.get('session_id');
        if (!sessionId) {
            setStatusMessage("Nenhum ID de sessão encontrado.");
            return;
        }

        fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.STRIPE}/confirm-reservation?sessionId=${sessionId}`)
            .then(response => response.text())
            .then(text => {setStatusMessage(text); })
            .catch(error => {
                console.error("Erro ao confirmar a reserva:", error);
                setStatusMessage("Erro ao confirmar a reserva. Tente novamente mais tarde.");
            });

    }, []);
    return (
        <div>
            <PaymentSuccessPage />
        </div>
    );

}
export default ConfirmReservation;
