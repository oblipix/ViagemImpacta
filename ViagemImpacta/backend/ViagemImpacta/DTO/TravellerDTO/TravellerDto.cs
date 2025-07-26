namespace ViagemImpacta.DTO.TravellerDTO
{
    public class TravellerDto
    {

        public int TravellerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; } 
        public string Cpf { get; set; } 
        public int? UserId { get; set; } // Chave estrangeira para Usuário
        public int ReservationId { get; set; } // Chave estrangeira para Reserva
        // Propriedade de navegação para Usuário 
        // public UserDto? User { get; set; }
    }
}
