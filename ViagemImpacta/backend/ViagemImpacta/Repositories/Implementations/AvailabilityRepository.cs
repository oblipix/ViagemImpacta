using Microsoft.EntityFrameworkCore;
using ViagemImpacta.Data;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ViagemImpacta.Repositories.Implementations
{
    public class AvailabilityRepository : IAvailabilityRepository
    {
        private readonly AgenciaDbContext _context;

        public AvailabilityRepository(AgenciaDbContext context)
        {
            _context = context;
        }

        public async Task<List<Availability>> GetByRoomTypeAndDateRangeAsync(int roomTypeId, DateTime startDate, DateTime endDate)
        {
            return await _context.Availabilities
                .Include(a => a.RoomType)
                .ThenInclude(rt => rt!.Hotel)
                .Where(a => a.RoomTypeId == roomTypeId && a.Date >= startDate && a.Date < endDate)
                .OrderBy(a => a.Date)
                .ToListAsync();
        }

        public async Task<List<Availability>> GetByDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            return await _context.Availabilities
                .Include(a => a.RoomType)
                .ThenInclude(rt => rt!.Hotel)
                .Where(a => a.Date >= startDate && a.Date < endDate)
                .OrderBy(a => a.Date)
                .ToListAsync();
        }

        public async Task<Availability?> GetByRoomTypeAndDateAsync(int roomTypeId, DateTime date)
        {
            return await _context.Availabilities
                .Include(a => a.RoomType)
                .FirstOrDefaultAsync(a => a.RoomTypeId == roomTypeId && a.Date == date);
        }

        public async Task AddAsync(Availability availability)
        {
            await _context.Availabilities.AddAsync(availability);
        }

        public Task UpdateAsync(Availability availability)
        {
            _context.Availabilities.Update(availability);
            return Task.CompletedTask;
        }

        public async Task DeleteAsync(int id)
        {
            var availability = await _context.Availabilities.FindAsync(id);
            if (availability != null)
                _context.Availabilities.Remove(availability);
        }
    }
}
