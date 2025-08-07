using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using ViagemImpacta.Controllers.ApiControllers;
using ViagemImpacta.DTO.HotelDTO;
using ViagemImpacta.DTO.RoomDTO;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories.Interfaces;
using ViagemImpacta.Services.Interfaces;
using AutoMapper;
using FluentAssertions;
using ViagemImpacta.UnitTests.Helpers;
using Microsoft.EntityFrameworkCore;
using ViagemImpacta.Data;
using ViagemImpacta.Repositories;
using ViagemImpacta.Models.Enums;

namespace ViagemImpacta.UnitTests.Controllers
{
    public class FrontendIntegrationTests : IDisposable
    {
        private readonly Mock<IUnitOfWork> _mockUnitOfWork;
        private readonly Mock<IMapper> _mockMapper;
        private readonly Mock<IHotelService> _mockHotelService;
        private readonly Mock<ILogger<HotelsController>> _mockLogger;
        private readonly HotelsController _controller;
        private readonly AgenciaDbContext _context;
        private readonly IMapper _realMapper;

        public FrontendIntegrationTests()
        {
            // Setup in-memory database
            var options = new DbContextOptionsBuilder<AgenciaDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            _context = new AgenciaDbContext(options);

            // Setup real mapper
            var mapperConfig = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Hotel, HotelDto>();
                cfg.CreateMap<Room, RoomDto>();
            });
            _realMapper = mapperConfig.CreateMapper();

            // Setup mocks
            _mockUnitOfWork = new Mock<IUnitOfWork>();
            _mockMapper = new Mock<IMapper>();
            _mockHotelService = new Mock<IHotelService>();
            _mockLogger = new Mock<ILogger<HotelsController>>();

            // Setup controller with real mapper
            _controller = new HotelsController(_mockUnitOfWork.Object, _realMapper, _mockHotelService.Object);

            // Seed test data
            SeedTestData();
        }

        private void SeedTestData()
        {
            // Criar hotéis de teste simples
            var hotel1 = new Hotel
            {
                HotelId = 1,
                Name = "Hotel Copacabana Palace",
                Description = "Hotel luxuoso na praia de Copacabana",
                City = "Rio de Janeiro",
                Stars = 5,
                Wifi = true,
                Parking = true,
                Rooms = new List<Room>
                {
                    new Room
                    {
                        RoomId = 1,
                        HotelId = 1,
                        TypeName = RoomType.Standard,
                        TotalRooms = 10,
                        Capacity = 2,
                        AverageDailyPrice = 300.00M,
                        Description = "Quarto padrão"
                    }
                }
            };

            var hotel2 = new Hotel
            {
                HotelId = 2,
                Name = "Hotel Ipanema",
                Description = "Hotel confortável em Ipanema",
                City = "Rio de Janeiro",
                Stars = 4,
                Wifi = true,
                Parking = false,
                Rooms = new List<Room>
                {
                    new Room
                    {
                        RoomId = 2,
                        HotelId = 2,
                        TypeName = RoomType.Luxo,
                        TotalRooms = 5,
                        Capacity = 3,
                        AverageDailyPrice = 500.00M,
                        Description = "Quarto de luxo"
                    }
                }
            };

            _context.Hotels.AddRange(hotel1, hotel2);
            _context.SaveChanges();
        }

        // ✅ TESTE 1: Busca por destino válido
        [Fact]
        public async Task SearchHotels_WithValidDestination_ShouldReturnHotels()
        {
            // Arrange
            var hotels = _context.Hotels.Include(h => h.Rooms).ToList();

            _mockUnitOfWork.Setup(x => x.Hotels.SearchHotelsAsync(
                "Rio de Janeiro", null, null, null, null, null, null, null, null))
                .ReturnsAsync(hotels);

            // Act
            var result = await _controller.SearchHotels(
                destination: "Rio de Janeiro",
                guests: null,
                minPrice: null,
                maxPrice: null,
                stars: null,
                roomType: null,
                amenities: null,
                checkIn: null,
                checkOut: null);

            // Assert
            result.Should().NotBeNull();
            var okResult = result.Result as OkObjectResult;
            okResult.Should().NotBeNull();
            okResult!.StatusCode.Should().Be(200);
        }

        // ✅ TESTE 2: Busca com datas válidas
        [Fact]
        public async Task SearchHotels_WithValidDates_ShouldReturnHotels()
        {
            // Arrange
            var hotels = _context.Hotels.Include(h => h.Rooms).ToList();

            _mockUnitOfWork.Setup(x => x.Hotels.SearchHotelsAsync(
                null, null, null, null, null, null, null, "2025-08-10", "2025-08-15"))
                .ReturnsAsync(hotels);

            // Act
            var result = await _controller.SearchHotels(
                destination: null,
                guests: null,
                minPrice: null,
                maxPrice: null,
                stars: null,
                roomType: null,
                amenities: null,
                checkIn: "2025-08-10",
                checkOut: "2025-08-15");

            // Assert
            result.Should().NotBeNull();
            var okResult = result.Result as OkObjectResult;
            okResult.Should().NotBeNull();
            okResult!.StatusCode.Should().Be(200);
        }

        // ✅ TESTE 3: Busca com preço válido
        [Fact]
        public async Task SearchHotels_WithValidPrice_ShouldReturnHotels()
        {
            // Arrange
            var hotels = _context.Hotels.Include(h => h.Rooms).ToList();

            _mockUnitOfWork.Setup(x => x.Hotels.SearchHotelsAsync(
                null, 200.00M, 400.00M, null, null, null, null, null, null))
                .ReturnsAsync(hotels);

            // Act
            var result = await _controller.SearchHotels(
                destination: null,
                guests: null,
                minPrice: 200.00M,
                maxPrice: 400.00M,
                stars: null,
                roomType: null,
                amenities: null,
                checkIn: null,
                checkOut: null);

            // Assert
            result.Should().NotBeNull();
            var okResult = result.Result as OkObjectResult;
            okResult.Should().NotBeNull();
            okResult!.StatusCode.Should().Be(200);
        }

        // ✅ TESTE 4: Busca com hóspedes válidos
        [Fact]
        public async Task SearchHotels_WithValidGuests_ShouldReturnHotels()
        {
            // Arrange
            var hotels = _context.Hotels.Include(h => h.Rooms).ToList();

            _mockUnitOfWork.Setup(x => x.Hotels.SearchHotelsAsync(
                null, null, null, null, null, null, 2, null, null))
                .ReturnsAsync(hotels);

            // Act
            var result = await _controller.SearchHotels(
                destination: null,
                guests: 2,
                minPrice: null,
                maxPrice: null,
                stars: null,
                roomType: null,
                amenities: null,
                checkIn: null,
                checkOut: null);

            // Assert
            result.Should().NotBeNull();
            var okResult = result.Result as OkObjectResult;
            okResult.Should().NotBeNull();
            okResult!.StatusCode.Should().Be(200);
        }

        // ✅ TESTE 5: Busca com estrelas válidas
        [Fact]
        public async Task SearchHotels_WithValidStars_ShouldReturnHotels()
        {
            // Arrange
            var hotels = _context.Hotels.Include(h => h.Rooms).ToList();

            _mockUnitOfWork.Setup(x => x.Hotels.SearchHotelsAsync(
                null, null, null, 5, null, null, null, null, null))
                .ReturnsAsync(hotels);

            // Act
            var result = await _controller.SearchHotels(
                destination: null,
                guests: null,
                minPrice: null,
                maxPrice: null,
                stars: 5,
                roomType: null,
                amenities: null,
                checkIn: null,
                checkOut: null);

            // Assert
            result.Should().NotBeNull();
            var okResult = result.Result as OkObjectResult;
            okResult.Should().NotBeNull();
            okResult!.StatusCode.Should().Be(200);
        }

        // ❌ TESTE 6: Datas inválidas (fail-fast)
        [Fact]
        public async Task SearchHotels_WithInvalidDates_ShouldReturnBadRequest()
        {
            // Act
            var result = await _controller.SearchHotels(
                destination: null,
                guests: null,
                minPrice: null,
                maxPrice: null,
                stars: null,
                roomType: null,
                amenities: null,
                checkIn: "2025-08-15", // Check-out antes do check-in
                checkOut: "2025-08-10");

            // Assert
            result.Should().NotBeNull();
            var badRequestResult = result.Result as BadRequestObjectResult;
            badRequestResult.Should().NotBeNull();
            badRequestResult!.StatusCode.Should().Be(400);
        }

        // ❌ TESTE 7: Preço inválido (fail-fast)
        [Fact]
        public async Task SearchHotels_WithInvalidPrice_ShouldReturnBadRequest()
        {
            // Act
            var result = await _controller.SearchHotels(
                destination: null,
                guests: null,
                minPrice: 500.00M, // Preço mínimo maior que máximo
                maxPrice: 300.00M,
                stars: null,
                roomType: null,
                amenities: null,
                checkIn: null,
                checkOut: null);

            // Assert
            result.Should().NotBeNull();
            var badRequestResult = result.Result as BadRequestObjectResult;
            badRequestResult.Should().NotBeNull();
            badRequestResult!.StatusCode.Should().Be(400);
        }

        // ❌ TESTE 8: Hóspedes inválidos (fail-fast)
        [Fact]
        public async Task SearchHotels_WithInvalidGuests_ShouldReturnBadRequest()
        {
            // Act
            var result = await _controller.SearchHotels(
                destination: null,
                guests: 0, // Hóspedes deve ser > 0
                minPrice: null,
                maxPrice: null,
                stars: null,
                roomType: null,
                amenities: null,
                checkIn: null,
                checkOut: null);

            // Assert
            result.Should().NotBeNull();
            var badRequestResult = result.Result as BadRequestObjectResult;
            badRequestResult.Should().NotBeNull();
            badRequestResult!.StatusCode.Should().Be(400);
        }

        // ❌ TESTE 9: Estrelas inválidas (fail-fast)
        [Fact]
        public async Task SearchHotels_WithInvalidStars_ShouldReturnBadRequest()
        {
            // Act
            var result = await _controller.SearchHotels(
                destination: null,
                guests: null,
                minPrice: null,
                maxPrice: null,
                stars: 6, // Estrelas deve ser 1-5
                roomType: null,
                amenities: null,
                checkIn: null,
                checkOut: null);

            // Assert
            result.Should().NotBeNull();
            var badRequestResult = result.Result as BadRequestObjectResult;
            badRequestResult.Should().NotBeNull();
            badRequestResult!.StatusCode.Should().Be(400);
        }

        // ❌ TESTE 10: Datas passadas (fail-fast)
        [Fact]
        public async Task SearchHotels_WithPastDates_ShouldReturnBadRequest()
        {
            // Act
            var result = await _controller.SearchHotels(
                destination: null,
                guests: null,
                minPrice: null,
                maxPrice: null,
                stars: null,
                roomType: null,
                amenities: null,
                checkIn: "2020-01-01", // Data no passado
                checkOut: "2020-01-05");

            // Assert
            result.Should().NotBeNull();
            var badRequestResult = result.Result as BadRequestObjectResult;
            badRequestResult.Should().NotBeNull();
            badRequestResult!.StatusCode.Should().Be(400);
        }

        // ✅ TESTE 11: Busca com amenity WiFi
        [Fact]
        public async Task SearchHotels_WithWifiAmenity_ShouldReturnHotels()
        {
            // Arrange
            var hotels = _context.Hotels.Include(h => h.Rooms).ToList();

            _mockUnitOfWork.Setup(x => x.Hotels.SearchHotelsAsync(
                null, null, null, null, null, "wifi", null, null, null))
                .ReturnsAsync(hotels);

            // Act
            var result = await _controller.SearchHotels(
                destination: null,
                guests: null,
                minPrice: null,
                maxPrice: null,
                stars: null,
                roomType: null,
                amenities: "wifi",
                checkIn: null,
                checkOut: null);

            // Assert
            result.Should().NotBeNull();
            var okResult = result.Result as OkObjectResult;
            okResult.Should().NotBeNull();
            okResult!.StatusCode.Should().Be(200);
        }

        // ✅ TESTE 12: Busca com múltiplas amenities
        [Fact]
        public async Task SearchHotels_WithMultipleAmenities_ShouldReturnHotels()
        {
            // Arrange
            var hotels = _context.Hotels.Include(h => h.Rooms).ToList();

            _mockUnitOfWork.Setup(x => x.Hotels.SearchHotelsAsync(
                null, null, null, null, null, "wifi,parking,pool", null, null, null))
                .ReturnsAsync(hotels);

            // Act
            var result = await _controller.SearchHotels(
                destination: null,
                guests: null,
                minPrice: null,
                maxPrice: null,
                stars: null,
                roomType: null,
                amenities: "wifi,parking,pool",
                checkIn: null,
                checkOut: null);

            // Assert
            result.Should().NotBeNull();
            var okResult = result.Result as OkObjectResult;
            okResult.Should().NotBeNull();
            okResult!.StatusCode.Should().Be(200);
        }

        // ✅ TESTE 13: Busca com amenity Pool
        [Fact]
        public async Task SearchHotels_WithPoolAmenity_ShouldReturnHotels()
        {
            // Arrange
            var hotels = _context.Hotels.Include(h => h.Rooms).ToList();

            _mockUnitOfWork.Setup(x => x.Hotels.SearchHotelsAsync(
                null, null, null, null, null, "pool", null, null, null))
                .ReturnsAsync(hotels);

            // Act
            var result = await _controller.SearchHotels(
                destination: null,
                guests: null,
                minPrice: null,
                maxPrice: null,
                stars: null,
                roomType: null,
                amenities: "pool",
                checkIn: null,
                checkOut: null);

            // Assert
            result.Should().NotBeNull();
            var okResult = result.Result as OkObjectResult;
            okResult.Should().NotBeNull();
            okResult!.StatusCode.Should().Be(200);
        }

        // ✅ TESTE 14: Busca com amenity Restaurant
        [Fact]
        public async Task SearchHotels_WithRestaurantAmenity_ShouldReturnHotels()
        {
            // Arrange
            var hotels = _context.Hotels.Include(h => h.Rooms).ToList();

            _mockUnitOfWork.Setup(x => x.Hotels.SearchHotelsAsync(
                null, null, null, null, null, "restaurant", null, null, null))
                .ReturnsAsync(hotels);

            // Act
            var result = await _controller.SearchHotels(
                destination: null,
                guests: null,
                minPrice: null,
                maxPrice: null,
                stars: null,
                roomType: null,
                amenities: "restaurant",
                checkIn: null,
                checkOut: null);

            // Assert
            result.Should().NotBeNull();
            var okResult = result.Result as OkObjectResult;
            okResult.Should().NotBeNull();
            okResult!.StatusCode.Should().Be(200);
        }

        // ✅ TESTE 15: Busca com amenity Bar
        [Fact]
        public async Task SearchHotels_WithBarAmenity_ShouldReturnHotels()
        {
            // Arrange
            var hotels = _context.Hotels.Include(h => h.Rooms).ToList();

            _mockUnitOfWork.Setup(x => x.Hotels.SearchHotelsAsync(
                null, null, null, null, null, "bar", null, null, null))
                .ReturnsAsync(hotels);

            // Act
            var result = await _controller.SearchHotels(
                destination: null,
                guests: null,
                minPrice: null,
                maxPrice: null,
                stars: null,
                roomType: null,
                amenities: "bar",
                checkIn: null,
                checkOut: null);

            // Assert
            result.Should().NotBeNull();
            var okResult = result.Result as OkObjectResult;
            okResult.Should().NotBeNull();
            okResult!.StatusCode.Should().Be(200);
        }

        // ✅ TESTE 16: Busca com amenity RoomService
        [Fact]
        public async Task SearchHotels_WithRoomServiceAmenity_ShouldReturnHotels()
        {
            // Arrange
            var hotels = _context.Hotels.Include(h => h.Rooms).ToList();

            _mockUnitOfWork.Setup(x => x.Hotels.SearchHotelsAsync(
                null, null, null, null, null, "roomService", null, null, null))
                .ReturnsAsync(hotels);

            // Act
            var result = await _controller.SearchHotels(
                destination: null,
                guests: null,
                minPrice: null,
                maxPrice: null,
                stars: null,
                roomType: null,
                amenities: "roomService",
                checkIn: null,
                checkOut: null);

            // Assert
            result.Should().NotBeNull();
            var okResult = result.Result as OkObjectResult;
            okResult.Should().NotBeNull();
            okResult!.StatusCode.Should().Be(200);
        }

        // ✅ TESTE 17: Busca com amenity Accessibility
        [Fact]
        public async Task SearchHotels_WithAccessibilityAmenity_ShouldReturnHotels()
        {
            // Arrange
            var hotels = _context.Hotels.Include(h => h.Rooms).ToList();

            _mockUnitOfWork.Setup(x => x.Hotels.SearchHotelsAsync(
                null, null, null, null, null, "accessibility", null, null, null))
                .ReturnsAsync(hotels);

            // Act
            var result = await _controller.SearchHotels(
                destination: null,
                guests: null,
                minPrice: null,
                maxPrice: null,
                stars: null,
                roomType: null,
                amenities: "accessibility",
                checkIn: null,
                checkOut: null);

            // Assert
            result.Should().NotBeNull();
            var okResult = result.Result as OkObjectResult;
            okResult.Should().NotBeNull();
            okResult!.StatusCode.Should().Be(200);
        }

        // ✅ TESTE 18: Busca com amenity BreakfastIncludes
        [Fact]
        public async Task SearchHotels_WithBreakfastAmenity_ShouldReturnHotels()
        {
            // Arrange
            var hotels = _context.Hotels.Include(h => h.Rooms).ToList();

            _mockUnitOfWork.Setup(x => x.Hotels.SearchHotelsAsync(
                null, null, null, null, null, "breakfastIncludes", null, null, null))
                .ReturnsAsync(hotels);

            // Act
            var result = await _controller.SearchHotels(
                destination: null,
                guests: null,
                minPrice: null,
                maxPrice: null,
                stars: null,
                roomType: null,
                amenities: "breakfastIncludes",
                checkIn: null,
                checkOut: null);

            // Assert
            result.Should().NotBeNull();
            var okResult = result.Result as OkObjectResult;
            okResult.Should().NotBeNull();
            okResult!.StatusCode.Should().Be(200);
        }

        // ✅ TESTE 19: Busca com tipo de quarto Suite
        [Fact]
        public async Task SearchHotels_WithSuiteRoomType_ShouldReturnHotels()
        {
            // Arrange
            var hotels = _context.Hotels.Include(h => h.Rooms).ToList();

            _mockUnitOfWork.Setup(x => x.Hotels.SearchHotelsAsync(
                null, null, null, null, "Suite", null, null, null, null))
                .ReturnsAsync(hotels);

            // Act
            var result = await _controller.SearchHotels(
                destination: null,
                guests: null,
                minPrice: null,
                maxPrice: null,
                stars: null,
                roomType: "Suite",
                amenities: null,
                checkIn: null,
                checkOut: null);

            // Assert
            result.Should().NotBeNull();
            var okResult = result.Result as OkObjectResult;
            okResult.Should().NotBeNull();
            okResult!.StatusCode.Should().Be(200);
        }

        // ✅ TESTE 20: Busca com tipo de quarto Standard
        [Fact]
        public async Task SearchHotels_WithStandardRoomType_ShouldReturnHotels()
        {
            // Arrange
            var hotels = _context.Hotels.Include(h => h.Rooms).ToList();

            _mockUnitOfWork.Setup(x => x.Hotels.SearchHotelsAsync(
                null, null, null, null, "Standard", null, null, null, null))
                .ReturnsAsync(hotels);

            // Act
            var result = await _controller.SearchHotels(
                destination: null,
                guests: null,
                minPrice: null,
                maxPrice: null,
                stars: null,
                roomType: "Standard",
                amenities: null,
                checkIn: null,
                checkOut: null);

            // Assert
            result.Should().NotBeNull();
            var okResult = result.Result as OkObjectResult;
            okResult.Should().NotBeNull();
            okResult!.StatusCode.Should().Be(200);
        }

        // ✅ TESTE 21: Busca com tipo de quarto Luxo
        [Fact]
        public async Task SearchHotels_WithLuxoRoomType_ShouldReturnHotels()
        {
            // Arrange
            var hotels = _context.Hotels.Include(h => h.Rooms).ToList();

            _mockUnitOfWork.Setup(x => x.Hotels.SearchHotelsAsync(
                null, null, null, null, "Luxo", null, null, null, null))
                .ReturnsAsync(hotels);

            // Act
            var result = await _controller.SearchHotels(
                destination: null,
                guests: null,
                minPrice: null,
                maxPrice: null,
                stars: null,
                roomType: "Luxo",
                amenities: null,
                checkIn: null,
                checkOut: null);

            // Assert
            result.Should().NotBeNull();
            var okResult = result.Result as OkObjectResult;
            okResult.Should().NotBeNull();
            okResult!.StatusCode.Should().Be(200);
        }

        // ✅ TESTE 22: Busca com amenities em português
        [Fact]
        public async Task SearchHotels_WithPortugueseAmenities_ShouldReturnHotels()
        {
            // Arrange
            var hotels = _context.Hotels.Include(h => h.Rooms).ToList();

            _mockUnitOfWork.Setup(x => x.Hotels.SearchHotelsAsync(
                null, null, null, null, null, "academia,estacionamento,restaurante", null, null, null))
                .ReturnsAsync(hotels);

            // Act
            var result = await _controller.SearchHotels(
                destination: null,
                guests: null,
                minPrice: null,
                maxPrice: null,
                stars: null,
                roomType: null,
                amenities: "academia,estacionamento,restaurante",
                checkIn: null,
                checkOut: null);

            // Assert
            result.Should().NotBeNull();
            var okResult = result.Result as OkObjectResult;
            okResult.Should().NotBeNull();
            okResult!.StatusCode.Should().Be(200);
        }

        // ✅ TESTE 23: Busca com amenities case-insensitive
        [Fact]
        public async Task SearchHotels_WithCaseInsensitiveAmenities_ShouldReturnHotels()
        {
            // Arrange
            var hotels = _context.Hotels.Include(h => h.Rooms).ToList();

            _mockUnitOfWork.Setup(x => x.Hotels.SearchHotelsAsync(
                null, null, null, null, null, "WiFi,PARKING,Gym", null, null, null))
                .ReturnsAsync(hotels);

            // Act
            var result = await _controller.SearchHotels(
                destination: null,
                guests: null,
                minPrice: null,
                maxPrice: null,
                stars: null,
                roomType: null,
                amenities: "WiFi,PARKING,Gym",
                checkIn: null,
                checkOut: null);

            // Assert
            result.Should().NotBeNull();
            var okResult = result.Result as OkObjectResult;
            okResult.Should().NotBeNull();
            okResult!.StatusCode.Should().Be(200);
        }

        // ✅ TESTE 24: Busca com amenities vazias
        [Fact]
        public async Task SearchHotels_WithEmptyAmenities_ShouldReturnHotels()
        {
            // Arrange
            var hotels = _context.Hotels.Include(h => h.Rooms).ToList();

            _mockUnitOfWork.Setup(x => x.Hotels.SearchHotelsAsync(
                null, null, null, null, null, "", null, null, null))
                .ReturnsAsync(hotels);

            // Act
            var result = await _controller.SearchHotels(
                destination: null,
                guests: null,
                minPrice: null,
                maxPrice: null,
                stars: null,
                roomType: null,
                amenities: "",
                checkIn: null,
                checkOut: null);

            // Assert
            result.Should().NotBeNull();
            var okResult = result.Result as OkObjectResult;
            okResult.Should().NotBeNull();
            okResult!.StatusCode.Should().Be(200);
        }

        // ✅ TESTE 25: Busca com amenities inválidas (deve ignorar)
        [Fact]
        public async Task SearchHotels_WithInvalidAmenities_ShouldReturnHotels()
        {
            // Arrange
            var hotels = _context.Hotels.Include(h => h.Rooms).ToList();

            _mockUnitOfWork.Setup(x => x.Hotels.SearchHotelsAsync(
                null, null, null, null, null, "invalidAmenity,wifi,pool", null, null, null))
                .ReturnsAsync(hotels);

            // Act
            var result = await _controller.SearchHotels(
                destination: null,
                guests: null,
                minPrice: null,
                maxPrice: null,
                stars: null,
                roomType: null,
                amenities: "invalidAmenity,wifi,pool",
                checkIn: null,
                checkOut: null);

            // Assert
            result.Should().NotBeNull();
            var okResult = result.Result as OkObjectResult;
            okResult.Should().NotBeNull();
            okResult!.StatusCode.Should().Be(200);
        }

        // ✅ TESTE 26: Busca com combinação complexa de filtros
        [Fact]
        public async Task SearchHotels_WithComplexFilters_ShouldReturnHotels()
        {
            // Arrange
            var hotels = _context.Hotels.Include(h => h.Rooms).ToList();

            _mockUnitOfWork.Setup(x => x.Hotels.SearchHotelsAsync(
                "Rio de Janeiro", 200.00M, 500.00M, 5, "Suite", "wifi,pool", 2, "2025-08-10", "2025-08-15"))
                .ReturnsAsync(hotels);

            // Act
            var result = await _controller.SearchHotels(
                destination: "Rio de Janeiro",
                guests: 2,
                minPrice: 200.00M,
                maxPrice: 500.00M,
                stars: 5,
                roomType: "Suite",
                amenities: "wifi,pool",
                checkIn: "2025-08-10",
                checkOut: "2025-08-15");

            // Assert
            result.Should().NotBeNull();
            var okResult = result.Result as OkObjectResult;
            okResult.Should().NotBeNull();
            okResult!.StatusCode.Should().Be(200);
        }

        public void Dispose()
        {
            _context?.Dispose();
        }
    }
}