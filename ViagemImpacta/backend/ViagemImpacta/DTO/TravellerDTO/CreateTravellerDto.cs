namespace ViagemImpacta.DTO.TravellerDTO
{
    public class CreateTravellerDto
    {

        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Cpf { get; set; } = string.Empty;
        public int? UserId { get; set; } // Chave estrangeira para Usuário
        public int ReservationId { get; set; } // Chave estrangeira para Reserva
        // Propriedade de navegação para Usuário 
        // public UserDto? User { get; set; }
    }
}
