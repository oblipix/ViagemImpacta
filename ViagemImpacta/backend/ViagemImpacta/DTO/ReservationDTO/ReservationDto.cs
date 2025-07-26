namespace ViagemImpacta.DTO.ReservationDTO
{
    public class ReservationDto
    {
        public int ReservationId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DisabledAt { get; set; }
        public bool Active { get; set; }
        public int UserId { get; set; } // Chave estrangeira para Usuário
        public int TravellerId { get; set; } // Chave estrangeira para Viajante
        public string? PaymentMethod { get; set; } // Método de pagamento
        public decimal TotalPrice { get; set; } // Preço total da reserva
        public DateTime CheckIn { get; set; } // Data de check-in
        public DateTime CheckOut { get; set; } // Data de check-out
        public int HotelId { get; set; } // Chave estrangeira para Hotel
        public string HotelName { get; set; } // Nome do hotel
        public string HotelAddress { get; set; } // Endereço do hotel
        public string HotelCity { get; set; } // Cidade do hotel
        public string HotelState { get; set; } // Estado do hotel

        public List<int> TravellerIds { get; set; } = new List<int>(); // Lista de IDs dos viajantes
        public List<string> TravellerNames { get; set; } = new List<string>(); // Lista de nomes dos viajantes

    }

    }
