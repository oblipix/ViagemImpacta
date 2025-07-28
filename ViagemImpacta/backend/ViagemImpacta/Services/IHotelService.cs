using System.Collections.Generic;
using System.Threading.Tasks;
using ViagemImpacta.Models;

namespace ViagemImpacta.Services
{
    public interface IHotelService
    {
        Task<List<Hotel>> GetAllHotelsAsync();
        Task<Hotel?> GetHotelByIdAsync(int id);
        Task AddHotelAsync(Hotel hotel);
        Task UpdateHotelAsync(Hotel hotel);
        Task DeleteHotelAsync(int id);
    }
}
