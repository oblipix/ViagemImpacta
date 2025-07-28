using System;
using System.Threading.Tasks;
using ViagemImpacta.Controllers.ApiControllers;

namespace ViagemImpacta.Services
{
    public interface IHotelTestService
    {
        Task<(bool Success, object? Data, string? Error)> GetHotelsWithRoomTypesAsync();
        Task<(bool Success, object? Data, string? Error)> GetAvailabilityAsync(int roomTypeId, DateTime? startDate, int days);
        Task<(bool Success, object? Data, string? Error)> GetMultiDateAvailabilityAsync(int days);
        Task<(bool Success, object? Data, string? Error)> SimulateReservationAsync(ReservationRequest request);
    }
}
