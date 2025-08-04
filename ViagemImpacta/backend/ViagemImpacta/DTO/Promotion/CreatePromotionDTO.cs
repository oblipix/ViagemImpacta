using System.ComponentModel.DataAnnotations;
using ViagemImpacta.Models;
using ViagemImpacta.Models.Enums;

namespace ViagemImpacta.DTO.Promotion
{
    public class CreatePromotionDTO
    {

        [Required (ErrorMessage = "Promotion Title is required.")]
        [MaxLength(100, ErrorMessage = "Promotion Title cannot exceed 100 characters.")]
        public string TitlePromotion { get; set; }
        [Required(ErrorMessage = "Promotion Description is required.")]
        [MaxLength(500, ErrorMessage = "Promotion Description cannot exceed 500 characters.")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Start Date is required.")]
        public DateTime StartDate { get; set; }

        [Required(ErrorMessage = "End Date is required.")]  
        public DateTime EndDate { get; set; }
        
        [Required(ErrorMessage = "Check-In Date is required.")]
        public DateTime CheckIn { get; set; }
        [Required(ErrorMessage = "Check-Out Date is required.")]
        public DateTime CheckOut { get; set; }

        [Required(ErrorMessage = "Hotel ID is required.")]
        public int HotelId { get; set; }

        public RoomType RoomType { get; set; }
        public RoomType RoomID { get; set; }

        public int TotalRoomsAvailable { get; set; } // Total number of rooms available for the promotion

        public decimal FinalPrice { get; set; }
        public decimal OriginalPrice { get; set; }
        public decimal DiscountPercentage { get; set; } = 0.15m;

        public bool isActive { get; set; } = true;

        public RoomsPromotional roomsPromotional { get; set; } = new RoomsPromotional();

    }
}

