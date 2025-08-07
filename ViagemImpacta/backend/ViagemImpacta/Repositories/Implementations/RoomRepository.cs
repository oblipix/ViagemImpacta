using Microsoft.EntityFrameworkCore;
using ViagemImpacta.Data;
using ViagemImpacta.Models;
using ViagemImpacta.Models.Enums;
using ViagemImpacta.Repositories.Interfaces;

namespace ViagemImpacta.Repositories.Implementations
{
    public class RoomRepository : Repository<Room>, IRoomRepository
    {
        private readonly AgenciaDbContext _context;

        public RoomRepository(AgenciaDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Room>> GetRoomsByHotelIdAsync(int hotelId)
        {
            return await _context.Rooms
                .Include(r => r.Hotel)
                .Where(r => r.HotelId == hotelId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Room>> GetAvailableRoomsAsync(int hotelId, DateTime checkIn, DateTime checkOut)
        {
            // Buscar quartos que não têm reservas conflitantes no período
            var unavailableRoomIds = await _context.Reservations
                .Where(r => r.HotelId == hotelId &&
                           r.IsConfirmed &&
                           ((r.CheckIn < checkOut && r.CheckOut > checkIn)))
                .Select(r => r.RoomId)
                .Distinct()
                .ToListAsync();

            return await _context.Rooms
                .Include(r => r.Hotel)
                .Where(r => r.HotelId == hotelId && 

                           !unavailableRoomIds.Contains(r.RoomId))
                .ToListAsync();
        }

        public async Task<Room?> GetRoomWithHotelAsync(int roomId)
        {
            return await _context.Rooms
                .Include(r => r.Hotel)
                .FirstOrDefaultAsync(r => r.RoomId == roomId);
        }

        public async Task<decimal> GetPriceRoomByHotelAndType(int hotelId, RoomType roomTypeId)
        {
            return await _context.Rooms
                .Where(r => r.HotelId == hotelId && r.TypeName == roomTypeId)
                .Select(r => r.AverageDailyPrice)
                .FirstOrDefaultAsync();
        }
    }
}
