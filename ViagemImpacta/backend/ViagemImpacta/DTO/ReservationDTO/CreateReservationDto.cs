using System;
using System.Data;
using ViagemImpacta.DTO.TravellerDTO;

namespace ViagemImpacta.DTO.ReservationDTO
{
    public class CreateReservationDto
    {
        public int UserId { get; set; } // Chave estrangeira para Usuário
        // é essencial para saber quem está fazendo a reserva

        //definição o período de reserva
        public DateTime CheckIn { get; set; } // Data de check-in
        public DateTime CheckOut { get; set; } // Data de check-out

        //preço final da reserva
        // pode ser calculado no backend ou frontend,
        // se for calculado no back, pode comentar aqui

        public decimal FinalPrice { get; set; } // Preço total da reserva

        //p saber em qual hotel a reserva foi feita
        public int HotelId { get; set; } // Chave estrangeira para Hotel


        // se os viajantes forem criados junto com a reserva,
        // é necessário definir uma lista de viajantes
        public List<CreateTravellerDto> Travellers { get; set; } = new List<CreateTravellerDto>();
    }
}
