using ViagemImpacta.Models.Dashboard;

namespace ViagemImpacta.Services.Interfaces
{
    public interface IDashboardService
    {
        Task<IEnumerable<HotelRevenueData>> GetHotelRevenueDataAsync();
        Task<IEnumerable<ReservationStatusData>> GetReservationStatusDataAsync();
    }
}