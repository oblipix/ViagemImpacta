using System.ComponentModel.DataAnnotations;
using ViagemImpacta.Models;
using ViagemImpacta.Models.Enums;

namespace ViagemImpacta.DTO.Promotion
{
    public class CreatePromotionDTO
    {
        [Required(ErrorMessage = "Título da promoção é obrigatório.")]
        [MaxLength(100, ErrorMessage = "Título não pode exceder 100 caracteres.")]
        public string TitlePromotion { get; set; }

        [Required(ErrorMessage = "Descrição da promoção é obrigatória.")]
        [MaxLength(500, ErrorMessage = "Descrição não pode exceder 500 caracteres.")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Data de início é obrigatória.")]
        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }

        [Required(ErrorMessage = "Data de fim é obrigatória.")]
        [DataType(DataType.Date)]
        public DateTime EndDate { get; set; }
        
        [Required(ErrorMessage = "Data de check-in é obrigatória.")]
        [DataType(DataType.Date)]
        public DateTime CheckIn { get; set; }

        [Required(ErrorMessage = "Data de check-out é obrigatória.")]
        [DataType(DataType.Date)]
        public DateTime CheckOut { get; set; }

        [Required(ErrorMessage = "Hotel é obrigatório.")]
        public int HotelId { get; set; }

        [Required(ErrorMessage = "Tipo de quarto é obrigatório.")]
        public RoomType RoomType { get; set; }

        public RoomType RoomID { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Quantidade de quartos deve ser maior que 0.")]
        public int TotalRoomsAvailable { get; set; }

        public decimal FinalPrice { get; set; }
        public decimal OriginalPrice { get; set; }

        [Range(0.01, 100, ErrorMessage = "Desconto deve ser entre 0,01% e 100%.")]
        public decimal DiscountPercentage { get; set; } = 15.0m;

        [Required(ErrorMessage = "A imagem do Banner é obrigatória")]
        public string BannerPromotion { get; set; }

        public bool isActive { get; set; } = true;
    }
}

