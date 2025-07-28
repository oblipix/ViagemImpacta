using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViagemImpacta.Controllers.ApiControllers;
using ViagemImpacta.Repositories;

namespace ViagemImpacta.Services
{
    public class HotelTestService : IHotelTestService
    {
        private readonly IUnitOfWork _unitOfWork;

        public HotelTestService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<(bool Success, object? Data, string? Error)> GetHotelsWithRoomTypesAsync()
        {
            try
            {
                var hotels = await _unitOfWork.Hotels.GetAllAsync();
                var roomTypeIds = hotels.SelectMany(h => h.RoomTypes ?? new List<Models.RoomType>()).Select(rt => rt.RoomTypeId).ToList();
                var today = DateTime.Today;
                var availabilities = new Dictionary<int, int>();
                foreach (var roomTypeId in roomTypeIds)
                {
                    var availability = await _unitOfWork.Availabilities.GetByRoomTypeAndDateAsync(roomTypeId, today);
                    availabilities[roomTypeId] = availability?.AvailableQuantity ?? 0;
                }

                var result = hotels.Select(h => new
                {
                    h.HotelId,
                    h.Name,
                    h.City,
                    h.Stars,
                    h.HotelAddress,
                    RoomTypes = (h.RoomTypes ?? new List<Models.RoomType>()).Select(rt => new
                    {
                        rt.RoomTypeId,
                        rt.Name,
                        rt.Description,
                        rt.TotalQuantity,
                        rt.BasePrice,
                        rt.MaxOccupancy,
                        AvailableToday = availabilities.ContainsKey(rt.RoomTypeId) ? availabilities[rt.RoomTypeId] : 0
                    }).ToList()
                }).ToList();

                return (true, result, null);
            }
            catch (Exception ex)
            {
                return (false, null, ex.Message);
            }
        }

        public async Task<(bool Success, object? Data, string? Error)> GetAvailabilityAsync(int roomTypeId, DateTime? startDate, int days)
        {
            try
            {
                var start = startDate ?? DateTime.Today;
                var end = start.AddDays(days);

                var availabilities = await _unitOfWork.Availabilities
                    .GetByRoomTypeAndDateRangeAsync(roomTypeId, start, end);

                var result = availabilities.Select(a => new
                {
                    a.Date,
                    a.AvailableQuantity,
                    RoomType = new
                    {
                        a.RoomType!.Name,
                        a.RoomType.TotalQuantity,
                        Hotel = a.RoomType.Hotel!.Name
                    }
                }).ToList();

                return (true, result, null);
            }
            catch (Exception ex)
            {
                return (false, null, ex.Message);
            }
        }

        public async Task<(bool Success, object? Data, string? Error)> GetMultiDateAvailabilityAsync(int days)
        {
            try
            {
                var today = DateTime.Today;
                var result = new List<object>();
                var hotels = await _unitOfWork.Hotels.GetAllAsync();
                var roomTypeIds = hotels.SelectMany(h => h.RoomTypes ?? new List<Models.RoomType>()).Select(rt => rt.RoomTypeId).Distinct().ToList();

                // Pré-carregar todas as disponibilidades necessárias
                var allAvailabilities = new Dictionary<(int, DateTime), int>();
                for (int i = 0; i < days; i++)
                {
                    var currentDate = today.AddDays(i);
                    foreach (var roomTypeId in roomTypeIds)
                    {
                        var availability = await _unitOfWork.Availabilities.GetByRoomTypeAndDateAsync(roomTypeId, currentDate);
                        allAvailabilities[(roomTypeId, currentDate)] = availability?.AvailableQuantity ?? 0;
                    }
                }

                for (int i = 0; i < days; i++)
                {
                    var currentDate = today.AddDays(i);
                    var dayData = hotels.Select(h => new
                    {
                        HotelId = h.HotelId,
                        HotelName = h.Name,
                        Date = currentDate.ToString("dd/MM/yyyy"),
                        DayOfWeek = currentDate.ToString("dddd", new System.Globalization.CultureInfo("pt-BR")),
                        RoomTypes = (h.RoomTypes ?? new List<Models.RoomType>()).Select(rt => new
                        {
                            RoomTypeId = rt.RoomTypeId,
                            RoomTypeName = rt.Name,
                            TotalQuantity = rt.TotalQuantity,
                            BasePrice = rt.BasePrice,
                            AvailableQuantity = allAvailabilities.TryGetValue((rt.RoomTypeId, currentDate), out var qty) ? qty : 0,
                            OccupancyPercentage = CalculateOccupancyPercentage(rt.TotalQuantity, qty)
                        }).ToList()
                    }).ToList();
                    result.AddRange(dayData);
                }

                return (true, result, null);
            }
            catch (Exception ex)
            {
                return (false, null, ex.Message);
            }
        }

        public async Task<(bool Success, object? Data, string? Error)> SimulateReservationAsync(ReservationRequest request)
        {
            try
            {
                var roomType = await _unitOfWork.RoomTypes.GetByIdAsync(request.RoomTypeId);
                if (roomType == null)
                {
                    return (false, null, "Tipo de quarto não encontrado");
                }

                var reservationDays = new List<string>();
                var currentDate = request.CheckIn.Date;

                // Verificar disponibilidade para todos os dias
                while (currentDate < request.CheckOut.Date)
                {
                    var availability = await _unitOfWork.Availabilities
                        .GetByRoomTypeAndDateAsync(request.RoomTypeId, currentDate);

                    if (availability == null || availability.AvailableQuantity < request.Quantity)
                    {
                        return (false, null, $"Não há disponibilidade suficiente para {currentDate:dd/MM/yyyy}");
                    }

                    reservationDays.Add(currentDate.ToString("dd/MM/yyyy"));
                    currentDate = currentDate.AddDays(1);
                }

                // Simular a reserva diminuindo a disponibilidade
                currentDate = request.CheckIn.Date;
                while (currentDate < request.CheckOut.Date)
                {
                    var availability = await _unitOfWork.Availabilities
                        .GetByRoomTypeAndDateAsync(request.RoomTypeId, currentDate);

                    if (availability != null)
                    {
                        availability.AvailableQuantity -= request.Quantity;
                        await _unitOfWork.Availabilities.UpdateAsync(availability);
                    }

                    currentDate = currentDate.AddDays(1);
                }

                await _unitOfWork.CommitAsync();

                var result = new
                {
                    message = "Reserva simulada com sucesso!",
                    hotel = roomType.Hotel!.Name,
                    roomType = roomType.Name,
                    quantity = request.Quantity,
                    checkIn = request.CheckIn.ToString("dd/MM/yyyy"),
                    checkOut = request.CheckOut.ToString("dd/MM/yyyy"),
                    daysReserved = reservationDays
                };

                return (true, result, null);
            }
            catch (Exception ex)
            {
                return (false, null, ex.Message);
            }
        }

        private async Task<int> GetAvailableQuantityForToday(int roomTypeId)
        {
            var availability = await _unitOfWork.Availabilities
                .GetByRoomTypeAndDateAsync(roomTypeId, DateTime.Today);
            return availability?.AvailableQuantity ?? 0;
        }

        private async Task<int> GetAvailableQuantityForDate(int roomTypeId, DateTime date)
        {
            var availability = await _unitOfWork.Availabilities
                .GetByRoomTypeAndDateAsync(roomTypeId, date);
            return availability?.AvailableQuantity ?? 0;
        }

        private static int CalculateOccupancyPercentage(int totalQuantity, int availableQuantity)
        {
            if (totalQuantity == 0) return 0;
            return (int)Math.Round((double)(totalQuantity - availableQuantity) / totalQuantity * 100);
        }
    }
}
