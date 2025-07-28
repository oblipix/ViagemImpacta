using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ViagemImpacta.DTO;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories;

namespace ViagemImpacta.Services.Interfaces
{
    public class HotelService : IHotelService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public HotelService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<HotelDto>> GetAllHotelsAsync()
        {
            var hotels = await _unitOfWork.Hotels.GetAllAsync();
            return _mapper.Map<IEnumerable<HotelDto>>(hotels);
        }

        public async Task<Hotel?> GetHotelWithRoomsAsync(int hotelId)
        {
            return await _unitOfWork.Hotels.GetByIdAsync(hotelId);
        }

        public async Task<Hotel?> GetHotelByIdAsync(int hotelId)
        {
            return await _unitOfWork.Hotels.GetByIdAsync(hotelId);
        }

        public async Task<Hotel> CreateHotelAsync(Hotel hotel)
        {
            await _unitOfWork.Hotels.AddAsync(hotel);
            await _unitOfWork.CommitAsync();
            return hotel;
        }

        public async Task UpdateHotelAsync(Hotel hotel)
        {
            var existingHotel = await _unitOfWork.Hotels.GetByIdAsync(hotel.HotelId);
            if (existingHotel == null) return;

            _mapper.Map(hotel, existingHotel);

            var roomsToRemove = existingHotel.Rooms.Where(dbRoom => !hotel.Rooms.Any(formRoom => formRoom.RoomId == dbRoom.RoomId)).ToList();
            foreach (var room in roomsToRemove) existingHotel.Rooms.Remove(room);

            foreach (var formRoom in hotel.Rooms)
            {
                var dbRoom = existingHotel.Rooms.FirstOrDefault(r => r.RoomId == formRoom.RoomId);
                if (dbRoom != null)
                {
                    _mapper.Map(formRoom, dbRoom);
                }
                else
                {
                    existingHotel.Rooms.Add(formRoom);
                }
            }

            await _unitOfWork.Hotels.UpdateAsync(existingHotel);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteHotelAsync(int hotelId)
        {
            var hotel = await _unitOfWork.Hotels.GetByIdAsync(hotelId);
            if (hotel == null) return;

            await _unitOfWork.Hotels.DeleteAsync(hotelId);
            await _unitOfWork.CommitAsync();
        }

        public async Task<IEnumerable<HotelDto>> GetHotelsWithFiltersAsync(string? hotelAddress, int? minStars, int? maxPrice, int? guestCount)
        {
            IEnumerable<Hotel> hotels = await _unitOfWork.Hotels.GetAllAsync(); // Start with IEnumerable

            if (!string.IsNullOrEmpty(hotelAddress))
                hotels = hotels.Where(h => h.City != null && h.City.Contains(hotelAddress, StringComparison.OrdinalIgnoreCase));
            if (minStars.HasValue)
                hotels = hotels.Where(h => h.Stars >= minStars.Value);

            return _mapper.Map<IEnumerable<HotelDto>>(hotels);
        }
    }
}
