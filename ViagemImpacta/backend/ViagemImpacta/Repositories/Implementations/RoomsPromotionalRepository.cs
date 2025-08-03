using Microsoft.EntityFrameworkCore;
using ViagemImpacta.Data;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories.Interfaces;

namespace ViagemImpacta.Repositories.Implementations
{
    public class RoomsPromotionalRepository : Repository<RoomsPromotional>, IRoomsPromotionalRepository
    {
        private readonly AgenciaDbContext _context;

        public RoomsPromotionalRepository(AgenciaDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<RoomsPromotional?> GetRoomPromotionalByIdAsync(int idRoomsPromotional)
        {
            return await _context.RoomsPromotional
                .FirstOrDefaultAsync(RP => RP.RoomsPromotionalId == idRoomsPromotional);
        }

        public async Task<bool> RoomsAvailableAsync(int PromotionId)
        {
            var roomsAvailable = await _context.RoomsPromotional
                .Where(RP => RP.active)
                .FirstOrDefaultAsync(RP => RP.PromotionId == PromotionId);

            if(roomsAvailable.TotalRoomsReserved < roomsAvailable.TotalRoomsAvailable)
            {
                return true;
            }
            else
            {
                return false;
            }


        }
    }
}
