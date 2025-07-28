using ViagemImpacta.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ViagemImpacta.Repositories
{
    public interface IHotelRepository
    {
        Task<List<Hotel>> GetAllAsync();
        Task<Hotel?> GetByIdAsync(int id);
        Task AddAsync(Hotel hotel);
        Task UpdateAsync(Hotel hotel);
        Task DeleteAsync(int id);

        // Métodos customizados
        Task<IEnumerable<Hotel>> GetHotelsByStarsAsync(int stars);
        Task<IEnumerable<Hotel>> GetHotelsWithAmenitiesAsync(bool wifi, bool parking, bool gym);
        Task<IEnumerable<Hotel>> SearchAvailableHotelsAsync(
            string? destination,
            DateTime checkIn,
            DateTime checkOut,
            int guests,
            int? minStars = null,
            bool? wifi = null,
            bool? parking = null,
            decimal? minPrice = null,
            decimal? maxPrice = null);
    }
}
