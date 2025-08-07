using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using ViagemImpacta.Data;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories.Interfaces;
using ViagemImpacta.Models.Enums;

namespace ViagemImpacta.Repositories.Implementations
{

    public class HotelRepository : Repository<Hotel>, IHotelRepository
    {

        private new AgenciaDbContext _context;
        private readonly ILogger<HotelRepository> _logger;


        public HotelRepository(AgenciaDbContext context, ILogger<HotelRepository> logger) : base(context)
        {
            _context = context;
            _logger = logger;
        }


        public async Task<IEnumerable<Hotel>> GetHotelsByStarsAsync(int stars)
        {
            return await _context.Hotels
            .Where(h => h.Stars == stars)
            .ToListAsync();
        }

        public async Task<Hotel> GetHotelByIdAsync(int id)
        {
            return await _context.Hotels
                                .Include(h => h.Rooms)
                .FirstOrDefaultAsync(h => h.HotelId == id)
                ?? throw new KeyNotFoundException($"Hotel with ID {id} not found.");
        }


        public async Task<IEnumerable<Hotel>> GetHotelsWithAmenitiesAsync(bool wifi, bool parking, bool gym)
        {

            return await _context.Hotels
                .Where(h => (!wifi || h.Wifi) &&
                           (!parking || h.Parking) &&
                           (!gym || h.Gym))
                .ToListAsync();
        }

        public async Task<Hotel?> GetHotelWithRoomsAsync(int id)
        {
            return await _context.Hotels
                .AsNoTracking()
                .Include(h => h.Rooms)
                .FirstOrDefaultAsync(h => h.HotelId == id);
        }


        public async Task<IEnumerable<Hotel>> GetAllHotelsWithRoomsAsync()
        {
            return await _context.Hotels
                .AsNoTracking()
                .Include(h => h.Rooms)
                .ToListAsync();
        }


        public async Task<IEnumerable<Hotel>> SearchHotelsAsync(
            string? destination,
            decimal? minPrice,
            decimal? maxPrice,
            int? stars,
            string? roomType,
            string? amenities,
            int? guests,
            string? checkIn,
            string? checkOut)
        {
            var query = _context.Hotels.AsNoTracking().Include(h => h.Rooms).AsQueryable();

            // Filtro por destino
            if (!string.IsNullOrWhiteSpace(destination))
            {
                var searchTerm = destination.ToLowerInvariant();
                query = query.Where(h =>
                    (h.Description != null && h.Description.ToLower().Contains(searchTerm)) ||
                    (h.City != null && h.City.ToLower().Contains(searchTerm)) ||
                    (h.HotelAddress != null && h.HotelAddress.ToLower().Contains(searchTerm)));
            }

            // Filtro por preço aplicado no banco de dados
            if (minPrice.HasValue || maxPrice.HasValue)
            {
                if (minPrice.HasValue)
                {
                    query = query.Where(h => h.Rooms.Any(r => r.AverageDailyPrice >= minPrice.Value));
                }
                if (maxPrice.HasValue)
                {
                    query = query.Where(h => h.Rooms.Any(r => r.AverageDailyPrice <= maxPrice.Value));
                }
            }

            // Filtro por estrelas
            if (stars.HasValue)
            {
                query = query.Where(h => h.Stars == stars.Value);
            }

            var hotels = await query.ToListAsync();

            // Pós-processamento: Aplicar filtros específicos de preço nos quartos após carregar
            if (minPrice.HasValue || maxPrice.HasValue)
            {
                var filteredHotels = new List<Hotel>();

                foreach (var hotel in hotels)
                {
                    var filteredRooms = hotel.Rooms
                        .Where(r => (!minPrice.HasValue || r.AverageDailyPrice >= minPrice.Value) &&
                                   (!maxPrice.HasValue || r.AverageDailyPrice <= maxPrice.Value))
                        .ToList();

                    if (filteredRooms.Any())
                    {
                        // Cria uma cópia do hotel com apenas quartos na faixa de preço
                        var hotelCopy = new Hotel
                        {
                            HotelId = hotel.HotelId,
                            Name = hotel.Name,
                            Description = hotel.Description,
                            HotelAddress = hotel.HotelAddress,
                            City = hotel.City,
                            Stars = hotel.Stars,
                            Wifi = hotel.Wifi,
                            Parking = hotel.Parking,
                            Gym = hotel.Gym,
                            Restaurant = hotel.Restaurant,
                            Bar = hotel.Bar,
                            Pool = hotel.Pool,
                            RoomService = hotel.RoomService,
                            Accessibility = hotel.Accessibility,
                            PetFriendly = hotel.PetFriendly,
                            WarmPool = hotel.WarmPool,
                            Theater = hotel.Theater,
                            Garden = hotel.Garden,
                            BreakfastIncludes = hotel.BreakfastIncludes,
                            ImageUrls = hotel.ImageUrls,
                            Rooms = filteredRooms
                        };
                        filteredHotels.Add(hotelCopy);
                    }
                }

                hotels = filteredHotels;
            }

            // Filtro por tipo de quarto específico (aplicado após carregar)
            if (!string.IsNullOrWhiteSpace(roomType))
            {
                if (Enum.TryParse<RoomType>(roomType, true, out var parsedType))
                {
                    var filteredHotels = new List<Hotel>();

                    foreach (var hotel in hotels)
                    {
                        // Filtra apenas quartos do tipo específico solicitado
                        var roomsOfRequestedType = hotel.Rooms
                            .Where(r => r.TypeName == parsedType)
                            .ToList();

                        if (roomsOfRequestedType.Any())
                        {
                            // Cria uma cópia do hotel com apenas os quartos do tipo solicitado
                            var hotelCopy = new Hotel
                            {
                                HotelId = hotel.HotelId,
                                Name = hotel.Name,
                                Description = hotel.Description,
                                HotelAddress = hotel.HotelAddress,
                                City = hotel.City,
                                Stars = hotel.Stars,
                                Wifi = hotel.Wifi,
                                Parking = hotel.Parking,
                                Gym = hotel.Gym,
                                Restaurant = hotel.Restaurant,
                                Bar = hotel.Bar,
                                Pool = hotel.Pool,
                                RoomService = hotel.RoomService,
                                Accessibility = hotel.Accessibility,
                                PetFriendly = hotel.PetFriendly,
                                WarmPool = hotel.WarmPool,
                                Theater = hotel.Theater,
                                Garden = hotel.Garden,
                                BreakfastIncludes = hotel.BreakfastIncludes,
                                ImageUrls = hotel.ImageUrls,
                                Rooms = roomsOfRequestedType
                            };
                            filteredHotels.Add(hotelCopy);
                        }
                    }

                    hotels = filteredHotels;
                }
            }

            // Filtro por amenidades
            if (!string.IsNullOrWhiteSpace(amenities))
            {
                var amenityList = amenities.Split(',').Select(a => a.Trim()).ToList();
                foreach (var amenity in amenityList)
                {
                    var trimmedAmenity = amenity.Trim().ToLowerInvariant();

                    switch (trimmedAmenity)
                    {
                        case "wifi":
                            hotels = hotels.Where(h => h.Wifi).ToList();
                            break;
                        case "parking":
                        case "estacionamento":
                            hotels = hotels.Where(h => h.Parking).ToList();
                            break;
                        case "gym":
                        case "academia":
                            hotels = hotels.Where(h => h.Gym).ToList();
                            break;
                        case "restaurant":
                        case "restaurante":
                            hotels = hotels.Where(h => h.Restaurant).ToList();
                            break;
                        case "bar":
                            hotels = hotels.Where(h => h.Bar).ToList();
                            break;
                        case "roomService":
                        case "serviço de quarto":
                        case "servico de quarto":
                            hotels = hotels.Where(h => h.RoomService).ToList();
                            break;
                        case "accessibility":
                        case "acessibilidade":
                            hotels = hotels.Where(h => h.Accessibility).ToList();
                            break;
                        case "warmPool":
                        case "piscina aquecida":
                            hotels = hotels.Where(h => h.WarmPool).ToList();
                            break;
                        case "theater":
                        case "sala de cinema":
                            hotels = hotels.Where(h => h.Theater).ToList();
                            break;
                        case "garden":
                        case "jardim amplo":
                            hotels = hotels.Where(h => h.Garden).ToList();
                            break;
                        case "petFriendly":
                        case "aceita animais":
                            hotels = hotels.Where(h => h.PetFriendly).ToList();
                            break;
                        case "pool":
                        case "piscina":
                            hotels = hotels.Where(h => h.Pool).ToList();
                            break;
                        case "breakfastIncludes":
                        case "café da manhã incluso":
                        case "cafe da manha incluso":
                            hotels = hotels.Where(h => h.BreakfastIncludes).ToList();
                            break;
                    }
                }
            }

            // Filtro por capacidade de hóspedes
            if (guests.HasValue)
            {
                hotels = hotels.Where(h => h.Rooms.Any(r => r.Capacity >= guests.Value)).ToList();
            }

            // Filtro por disponibilidade de datas (query otimizada)
            if (!string.IsNullOrWhiteSpace(checkIn) && !string.IsNullOrWhiteSpace(checkOut))
            {
                if (!DateTime.TryParse(checkIn, out var checkInDate) ||
                    !DateTime.TryParse(checkOut, out var checkOutDate))
                {
                    return Enumerable.Empty<Hotel>(); // Retorna vazio se datas inválidas
                }

                // Validações adicionais de datas
                if (checkOutDate <= checkInDate || checkInDate < DateTime.Today)
                {
                    return Enumerable.Empty<Hotel>(); // Retorna vazio se datas inválidas
                }

                // Busca todas as reservas conflitantes de uma vez
                var allRoomIds = hotels.SelectMany(h => h.Rooms).Select(r => r.RoomId).ToList();

                var conflictingReservations = await _context.Reservations
                    .Where(r => r.RoomId.HasValue && 
                               allRoomIds.Contains(r.RoomId.Value) &&
                               r.IsConfirmed &&
                               !r.IsCanceled &&
                               r.CheckIn < checkOutDate &&
                               r.CheckOut > checkInDate)
                    .GroupBy(r => r.RoomId.Value)
                    .Select(g => new { RoomId = g.Key, Count = g.Count() })
                    .ToDictionaryAsync(x => x.RoomId, x => x.Count);

                var filteredHotels = new List<Hotel>();

                foreach (var hotel in hotels)
                {
                    var availableRooms = new List<Room>();

                    foreach (var room in hotel.Rooms)
                    {
                        var conflictCount = conflictingReservations.GetValueOrDefault(room.RoomId, 0);
                        var availableCount = room.TotalRooms - conflictCount;

                        if (availableCount > 0)
                        {
                            // Cria uma cópia do quarto com a disponibilidade atualizada
                            var availableRoom = new Room
                            {
                                RoomId = room.RoomId,
                                HotelId = room.HotelId,
                                TypeName = room.TypeName,
                                TotalRooms = availableCount,
                                Capacity = room.Capacity,
                                AverageDailyPrice = room.AverageDailyPrice,
                                Description = room.Description
                            };
                            availableRooms.Add(availableRoom);
                        }
                    }

                    if (availableRooms.Any())
                    {
                        // Cria uma cópia do hotel com apenas quartos disponíveis
                        var hotelCopy = new Hotel
                        {
                            HotelId = hotel.HotelId,
                            Name = hotel.Name,
                            Description = hotel.Description,
                            HotelAddress = hotel.HotelAddress,
                            City = hotel.City,
                            Stars = hotel.Stars,
                            Wifi = hotel.Wifi,
                            Parking = hotel.Parking,
                            Gym = hotel.Gym,
                            Restaurant = hotel.Restaurant,
                            Bar = hotel.Bar,
                            Pool = hotel.Pool,
                            RoomService = hotel.RoomService,
                            Accessibility = hotel.Accessibility,
                            PetFriendly = hotel.PetFriendly,
                            WarmPool = hotel.WarmPool,
                            Theater = hotel.Theater,
                            Garden = hotel.Garden,
                            BreakfastIncludes = hotel.BreakfastIncludes,
                            ImageUrls = hotel.ImageUrls,
                            Rooms = availableRooms
                        };
                        filteredHotels.Add(hotelCopy);
                    }
                }

                hotels = filteredHotels;
            }

            return hotels;
        }
    }
}
