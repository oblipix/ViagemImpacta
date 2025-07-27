namespace ViagemImpacta.Models.Enums
{
    public enum ReservationStatus
    {
        Pending = 0,     // Aguardando pagamento
        Confirmed = 1,   // Paga e confirmada
        Cancelled = 2,   // Cancelada pelo usu�rio
        Completed = 3    // Viagem realizada
    }
}