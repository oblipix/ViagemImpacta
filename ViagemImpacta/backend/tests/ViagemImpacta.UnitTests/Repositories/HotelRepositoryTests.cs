using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using ViagemImpacta.Data;
using ViagemImpacta.Models;
using ViagemImpacta.Models.Enums;
using ViagemImpacta.Repositories.Implementations;
using ViagemImpacta.UnitTests.Helpers;
using Xunit;
using FluentAssertions;

namespace ViagemImpacta.UnitTests.Repositories
{
    public class HotelRepositoryTests : IDisposable
    {
        private readonly AgenciaDbContext _context;
        private readonly HotelRepository _repository;
        private readonly Mock<ILogger<HotelRepository>> _loggerMock;

        public HotelRepositoryTests()
        {
            // Configurar banco em memória para testes
            var options = new DbContextOptionsBuilder<AgenciaDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new AgenciaDbContext(options);
            _loggerMock = new Mock<ILogger<HotelRepository>>();
            _repository = new HotelRepository(_context, _loggerMock.Object);

            // Seed dados de teste
            SeedTestData();
        }

        private void SeedTestData()
        {
            // Criar hotéis de teste com quartos
            var hotel1 = HotelBuilder.Create()
                .WithId(1)
                .WithName("Hotel Teste 1")
                .WithStars(4)
                .Build();

            var hotel2 = HotelBuilder.Create()
                .WithId(2)
                .WithName("Hotel Teste 2")
                .WithStars(5)
                .Build();

            // Adicionar quartos aos hotéis
            hotel1.Rooms = new List<Room>
            {
                new Room
                {
                    RoomId = 1,
                    HotelId = 1,
                    TypeName = RoomType.Standard,
                    Capacity = 2,
                    TotalRooms = 5,
                    AverageDailyPrice = 200.00m
                },
                new Room
                {
                    RoomId = 2,
                    HotelId = 1,
                    TypeName = RoomType.Luxo,
                    Capacity = 3,
                    TotalRooms = 3,
                    AverageDailyPrice = 350.00m
                }
            };

            hotel2.Rooms = new List<Room>
            {
                new Room
                {
                    RoomId = 3,
                    HotelId = 2,
                    TypeName = RoomType.Suite,
                    Capacity = 4,
                    TotalRooms = 2,
                    AverageDailyPrice = 500.00m
                }
            };

            _context.Hotels.AddRange(hotel1, hotel2);
            _context.SaveChanges();
        }

        [Fact]
        public async Task SearchHotels_WithValidDateRange_ShouldReturnHotelsWithAvailableRooms()
        {
            // Arrange
            var checkIn = DateTime.Now.AddDays(30).ToString("yyyy-MM-dd");
            var checkOut = DateTime.Now.AddDays(35).ToString("yyyy-MM-dd");

            // Act
            var result = await _repository.SearchHotelsAsync(
                destination: null,
                minPrice: null,
                maxPrice: null,
                stars: null,
                roomType: null,
                amenities: null,
                guests: null,
                checkIn: checkIn,
                checkOut: checkOut
            );

            // Assert
            result.Should().NotBeNull();
            result.Should().HaveCount(2); // Ambos os hotéis têm quartos disponíveis
            result.Should().OnlyContain(h => h.Rooms.Any(r => r.TotalRooms > 0));
        }

        [Fact]
        public async Task SearchHotels_WithInvalidDateRange_CheckOutBeforeCheckIn_ShouldReturnEmptyList()
        {
            // Arrange
            var checkIn = DateTime.Now.AddDays(35).ToString("yyyy-MM-dd");
            var checkOut = DateTime.Now.AddDays(30).ToString("yyyy-MM-dd"); // Check-out antes do check-in

            // Act
            var result = await _repository.SearchHotelsAsync(
                destination: null,
                minPrice: null,
                maxPrice: null,
                stars: null,
                roomType: null,
                amenities: null,
                guests: null,
                checkIn: checkIn,
                checkOut: checkOut
            );

            // Assert
            result.Should().NotBeNull();
            result.Should().BeEmpty(); // Deve retornar lista vazia para datas inválidas
        }

        [Fact]
        public async Task SearchHotels_WithSameCheckInAndCheckOut_ShouldReturnEmptyList()
        {
            // Arrange
            var checkIn = DateTime.Now.AddDays(30).ToString("yyyy-MM-dd");
            var checkOut = checkIn; // Mesma data

            // Act
            var result = await _repository.SearchHotelsAsync(
                destination: null,
                minPrice: null,
                maxPrice: null,
                stars: null,
                roomType: null,
                amenities: null,
                guests: null,
                checkIn: checkIn,
                checkOut: checkOut
            );

            // Assert
            result.Should().NotBeNull();
            result.Should().BeEmpty(); // Deve retornar lista vazia para datas iguais
        }

        [Fact]
        public async Task SearchHotels_WithPastDates_ShouldReturnEmptyList()
        {
            // Arrange
            var checkIn = DateTime.Now.AddDays(-30).ToString("yyyy-MM-dd");
            var checkOut = DateTime.Now.AddDays(-25).ToString("yyyy-MM-dd");

            // Act
            var result = await _repository.SearchHotelsAsync(
                destination: null,
                minPrice: null,
                maxPrice: null,
                stars: null,
                roomType: null,
                amenities: null,
                guests: null,
                checkIn: checkIn,
                checkOut: checkOut
            );

            // Assert
            result.Should().NotBeNull();
            result.Should().BeEmpty(); // Deve retornar lista vazia para datas passadas
        }

        [Fact]
        public async Task SearchHotels_WithInvalidDateFormat_ShouldReturnEmptyList()
        {
            // Arrange
            var checkIn = "data-invalida";
            var checkOut = "outra-data-invalida";

            // Act
            var result = await _repository.SearchHotelsAsync(
                destination: null,
                minPrice: null,
                maxPrice: null,
                stars: null,
                roomType: null,
                amenities: null,
                guests: null,
                checkIn: checkIn,
                checkOut: checkOut
            );

            // Assert
            result.Should().NotBeNull();
            result.Should().BeEmpty(); // Deve retornar lista vazia para formato inválido
        }

        [Fact]
        public async Task SearchHotels_WithOnlyCheckIn_ShouldReturnAllHotels()
        {
            // Arrange
            var checkIn = DateTime.Now.AddDays(30).ToString("yyyy-MM-dd");

            // Act
            var result = await _repository.SearchHotelsAsync(
                destination: null,
                minPrice: null,
                maxPrice: null,
                stars: null,
                roomType: null,
                amenities: null,
                guests: null,
                checkIn: checkIn,
                checkOut: null
            );

            // Assert
            result.Should().NotBeNull();
            result.Should().HaveCount(2); // Deve retornar todos os hotéis quando só check-in é fornecido
        }

        [Fact]
        public async Task SearchHotels_WithOnlyCheckOut_ShouldReturnAllHotels()
        {
            // Arrange
            var checkOut = DateTime.Now.AddDays(35).ToString("yyyy-MM-dd");

            // Act
            var result = await _repository.SearchHotelsAsync(
                destination: null,
                minPrice: null,
                maxPrice: null,
                stars: null,
                roomType: null,
                amenities: null,
                guests: null,
                checkIn: null,
                checkOut: checkOut
            );

            // Assert
            result.Should().NotBeNull();
            result.Should().HaveCount(2); // Deve retornar todos os hotéis quando só check-out é fornecido
        }

        [Fact]
        public async Task SearchHotels_WithValidDateRangeAndGuests_ShouldFilterByCapacity()
        {
            // Arrange
            var checkIn = DateTime.Now.AddDays(30).ToString("yyyy-MM-dd");
            var checkOut = DateTime.Now.AddDays(35).ToString("yyyy-MM-dd");
            var guests = 4; // Apenas o hotel 2 tem quarto com capacidade 4

            // Act
            var result = await _repository.SearchHotelsAsync(
                destination: null,
                minPrice: null,
                maxPrice: null,
                stars: null,
                roomType: null,
                amenities: null,
                guests: guests,
                checkIn: checkIn,
                checkOut: checkOut
            );

            // Assert
            result.Should().NotBeNull();
            result.Should().HaveCount(1); // Apenas hotel 2 tem quarto com capacidade 4
            result.First().HotelId.Should().Be(2);
        }





        [Fact]
        public async Task SearchHotels_WithoutDateRange_ShouldReturnAllHotels()
        {
            // Act
            var result = await _repository.SearchHotelsAsync(
                destination: null,
                minPrice: null,
                maxPrice: null,
                stars: null,
                roomType: null,
                amenities: null,
                guests: null,
                checkIn: null,
                checkOut: null
            );

            // Assert
            result.Should().NotBeNull();
            result.Should().HaveCount(2); // Deve retornar todos os hotéis quando não há filtro de data
        }

        public void Dispose()
        {
            _context?.Dispose();
        }
    }
} 