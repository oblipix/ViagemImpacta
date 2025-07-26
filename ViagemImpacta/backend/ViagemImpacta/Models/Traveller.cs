namespace ViagemImpacta.Models
{
    public class Traveller
    {
        public int TravellerId { get; set; }
        public string FirstName { get; set; } 
        public string LastName { get; set; } 
        public string Cpf { get; set; }
        public int? UserId { get; set; } // Chave estrangeira para Usuário
        public User? User { get; set; } // Propriedade de navegação para Usuário
        public int ReservationId { get; set; } // Chave estrangeira para Reserva

    }
}
