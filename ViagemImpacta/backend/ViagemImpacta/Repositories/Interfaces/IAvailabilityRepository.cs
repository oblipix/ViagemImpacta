using ViagemImpacta.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ViagemImpacta.Repositories.Interfaces
{
    public interface IAvailabilityRepository
    {
        Task<List<Availability>> GetByRoomTypeAndDateRangeAsync(int roomTypeId, DateTime startDate, DateTime endDate);
        Task<List<Availability>> GetByDateRangeAsync(DateTime startDate, DateTime endDate);
        Task<Availability?> GetByRoomTypeAndDateAsync(int roomTypeId, DateTime date);
        Task AddAsync(Availability availability);
        Task UpdateAsync(Availability availability);
        Task DeleteAsync(int id);
    }
}
