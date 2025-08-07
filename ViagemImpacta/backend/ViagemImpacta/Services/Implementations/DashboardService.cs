using Microsoft.EntityFrameworkCore;
using ViagemImpacta.Data;
using ViagemImpacta.Models.Dashboard;
using ViagemImpacta.Services.Interfaces;

namespace ViagemImpacta.Services.Implementations
{
    public class DashboardService : IDashboardService
    {
        private readonly AgenciaDbContext _context;

        public DashboardService(AgenciaDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<HotelRevenueData>> GetHotelRevenueDataAsync()
        {
            return await _context.Reservations
                .Where(r => r.IsConfirmed && !r.IsCanceled)
                .Include(r => r.Hotel)
                .GroupBy(r => new { r.HotelId, r.Hotel.Name, r.Hotel.City, r.Hotel.Stars })
                .Select(g => new HotelRevenueData
                {
                    HotelName = g.Key.Name ?? "Hotel Desconhecido",
                    Revenue = g.Sum(r => r.TotalPrice),
                    ReservationCount = g.Count(),
                    City = g.Key.City ?? "Cidade Desconhecida",
                    Stars = g.Key.Stars
                })
                .OrderByDescending(h => h.Revenue)
                .ToListAsync();
        }

        public async Task<IEnumerable<ReservationStatusData>> GetReservationStatusDataAsync()
        {
            var totalReservations = await _context.Reservations.CountAsync();

            if (totalReservations == 0)
                return new List<ReservationStatusData>();

            var statusData = new List<ReservationStatusData>();

            var confirmedCount = await _context.Reservations
                .CountAsync(r => r.IsConfirmed && !r.IsCanceled);
            statusData.Add(new ReservationStatusData
            {
                Status = "Confirmadas",
                Count = confirmedCount,
                Percentage = (decimal)confirmedCount / totalReservations * 100
            });

            var pendingCount = await _context.Reservations
                .CountAsync(r => !r.IsConfirmed && !r.IsCanceled);
            statusData.Add(new ReservationStatusData
            {
                Status = "Pendentes",
                Count = pendingCount,
                Percentage = (decimal)pendingCount / totalReservations * 100
            });

            var canceledCount = await _context.Reservations
                .CountAsync(r => r.IsCanceled);
            statusData.Add(new ReservationStatusData
            {
                Status = "Canceladas",
                Count = canceledCount,
                Percentage = (decimal)canceledCount / totalReservations * 100
            });

            return statusData;
        }
    }
}