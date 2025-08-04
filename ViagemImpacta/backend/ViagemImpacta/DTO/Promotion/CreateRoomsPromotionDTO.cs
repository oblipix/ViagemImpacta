using System.ComponentModel.DataAnnotations;
using ViagemImpacta.Models;
using ViagemImpacta.Models.Enums;

namespace ViagemImpacta.DTO.Promotion
{
    public class CreateRoomsPromotionDTO
    {
        [Required(ErrorMessage = "O campo 'IdHotelPromotion' é obrigatório.")]
        public int IdHotelPromotion { get; set; }

        [Required(ErrorMessage = "O campo 'TypeName' é obrigatório.")]
        public RoomType TypeName { get; set; }

        [Required(ErrorMessage = "O campo 'TotalRoomsAvailable' é obrigatório.")]
        public int TotalRoomsAvailable { get; set; } //quantidade total de quartos desse tipo 
        public int TotalRoomsReserved { get; set; }
        public int Capacity { get; set; } = 4;

        [Required(ErrorMessage = "O campo 'PromotionId' é obrigatório.")]
        public int PromotionId { get; set; }

    }
}
