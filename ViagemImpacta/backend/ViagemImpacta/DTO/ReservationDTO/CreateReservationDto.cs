using System.ComponentModel.DataAnnotations;
using ViagemImpacta.DTO.TravellerDTO;

namespace ViagemImpacta.DTO.ReservationDTO
{
    public class CreateReservationDto
    {
        [Required(ErrorMessage = "ID do usu�rio � obrigat�rio")]
        public int UserId { get; set; }

        [Required(ErrorMessage = "ID do quarto � obrigat�rio")]
        public int RoomId { get; set; }

        [Required(ErrorMessage = "ID do hotel � obrigat�rio")]
        public int HotelId { get; set; }

        [Required(ErrorMessage = "Data de check-in � obrigat�ria")]
        [DataType(DataType.Date)]
        public DateTime CheckIn { get; set; }

        [Required(ErrorMessage = "Data de check-out � obrigat�ria")]
        [DataType(DataType.Date)]
        public DateTime CheckOut { get; set; }

        [Range(1, 4, ErrorMessage = "N�mero de h�spedes deve ser entre 1 e 4")]
        public int NumberOfGuests { get; set; }

        [StringLength(500, ErrorMessage = "Solicita��es especiais devem ter no m�ximo 500 caracteres")]
        public string? SpecialRequests { get; set; }

        [Required(ErrorMessage = "Lista de viajantes � obrigat�ria")]
        [MinLength(1, ErrorMessage = "Deve haver pelo menos um viajante")]
        public List<CreateTravellerDto> Travellers { get; set; } = new();

        // Valida��o customizada
        public bool IsValidDateRange()
        {
            return CheckOut > CheckIn && CheckIn >= DateTime.Today;
        }
    }
}