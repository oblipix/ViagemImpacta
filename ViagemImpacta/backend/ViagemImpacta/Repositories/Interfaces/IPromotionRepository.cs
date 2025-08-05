using ViagemImpacta.Models;

namespace ViagemImpacta.Repositories.Interfaces
{
    public interface IPromotionRepository : IRepository<Promotion>
    {
        Task<Promotion?> GetPromotionByIdAsync(int idPromotion);

        Task<IEnumerable<Promotion>> GetActivePromotionsAsync();

        Task<IEnumerable<Promotion>> GetPromotionsByHotelIdAsync(int hotelId);
    }
}
