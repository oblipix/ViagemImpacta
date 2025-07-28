using ViagemImpacta.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ViagemImpacta.Repositories.Interfaces
{
    public interface IRoomTypeRepository
    {
        Task<List<RoomType>> GetAllAsync();
        Task<RoomType?> GetByIdAsync(int id);
        Task<List<RoomType>> GetByHotelIdAsync(int hotelId);
        Task AddAsync(RoomType roomType);
        Task UpdateAsync(RoomType roomType);
        Task DeleteAsync(int id);
    }
}
