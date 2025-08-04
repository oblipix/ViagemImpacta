using System.ComponentModel.DataAnnotations;
using ViagemImpacta.DTO.TravellerDTO;

namespace ViagemImpacta.DTO.ReservationDTO
{
    public class CreateReservationPromotionDto
    {
            [Required(ErrorMessage = "ID do usuário é obrigatório")]
            public int UserId { get; set; }

        [Required(ErrorMessage = "ID da Promoção é obrigatório")]
        public int idPromotion { get; set; }

        [Range(1, 4, ErrorMessage = "Número de hóspedes deve ser entre 1 e 4")]
            public int NumberOfGuests { get; set; }

            [StringLength(500, ErrorMessage = "Solicitações especiais devem ter no máximo 500 caracteres")]
            public string? SpecialRequests { get; set; }

            [Required(ErrorMessage = "Lista de viajantes é obrigatória")]
            [MinLength(1, ErrorMessage = "Deve haver pelo menos um viajante")]
            public List<CreateTravellerDto> Travellers { get; set; } = new();

        }
    }


