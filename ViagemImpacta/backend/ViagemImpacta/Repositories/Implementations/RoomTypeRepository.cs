using Microsoft.EntityFrameworkCore;
using ViagemImpacta.Data;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ViagemImpacta.Repositories.Implementations
{
    public class RoomTypeRepository : IRoomTypeRepository
    {
        private readonly AgenciaDbContext _context;

        public RoomTypeRepository(AgenciaDbContext context)
        {
            _context = context;
        }

        public async Task<List<RoomType>> GetAllAsync()
        {
            return await _context.RoomTypes
                .Include(rt => rt.Hotel)
                .ToListAsync();
        }

        public async Task<RoomType?> GetByIdAsync(int id)
        {
            return await _context.RoomTypes
                .Include(rt => rt.Hotel)
                .FirstOrDefaultAsync(rt => rt.RoomTypeId == id);
        }

        public async Task<List<RoomType>> GetByHotelIdAsync(int hotelId)
        {
            return await _context.RoomTypes
                .Include(rt => rt.Hotel)
                .Where(rt => rt.HotelId == hotelId)
                .ToListAsync();
        }

        public async Task AddAsync(RoomType roomType)
        {
            await _context.RoomTypes.AddAsync(roomType);
        }

        public Task UpdateAsync(RoomType roomType)
        {
            _context.RoomTypes.Update(roomType);
            return Task.CompletedTask;
        }

        public async Task DeleteAsync(int id)
        {
            var roomType = await _context.RoomTypes.FindAsync(id);
            if (roomType != null)
                _context.RoomTypes.Remove(roomType);
        }
    }
}
