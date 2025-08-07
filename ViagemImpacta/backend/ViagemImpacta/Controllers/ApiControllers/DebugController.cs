using Microsoft.AspNetCore.Mvc;
using ViagemImpacta.Repositories.Interfaces;
using ViagemImpacta.Repositories;
using ViagemImpacta.Models;
using System.Text.Json;

namespace ViagemImpacta.Controllers.ApiControllers
{
    /// <summary>
    /// ⚠️ CONTROLLER TEMPORÁRIO PARA DEBUG
    /// Este controller deve ser removido em produção.
    /// Os testes foram movidos para ViagemImpacta.Tests/Controllers/DebugControllerTests.cs
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class DebugController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public DebugController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// Endpoint para testar o sistema de debug do Fail-Fast
        /// ⚠️ REMOVER EM PRODUÇÃO - Usar testes unitários em ViagemImpacta.Tests
        /// </summary>
        [HttpGet("test-failfast")]
        public async Task<IActionResult> TestFailFast(
            [FromQuery] string? destination,
            [FromQuery] decimal? minPrice,
            [FromQuery] decimal? maxPrice,
            [FromQuery] int? stars,
            [FromQuery] string? roomType,
            [FromQuery] string? amenities,
            [FromQuery] int? guests,
            [FromQuery] string? checkIn,
            [FromQuery] string? checkOut)
        {
            var results = await _unitOfWork.Hotels.SearchHotelsAsync(
                destination, minPrice, maxPrice, stars, roomType,
                amenities, guests, checkIn, checkOut);

            return Ok(new
            {
                Message = "⚠️ DEBUG ENDPOINT - Check logs for debug information. Use unit tests instead!",
                ResultCount = results.Count(),
                Timestamp = DateTime.UtcNow,
                Parameters = new
                {
                    destination,
                    minPrice,
                    maxPrice,
                    stars,
                    roomType,
                    amenities,
                    guests,
                    checkIn,
                    checkOut
                }
            });
        }

        /// <summary>
        /// Endpoint para criar hotel de teste para performance tests
        /// ⚠️ REMOVER EM PRODUÇÃO
        /// </summary>
        [HttpPost("seed-hotel")]
        public async Task<IActionResult> SeedHotel([FromBody] SeedHotelRequest request)
        {
            try
            {
                var hotel = new Hotel
                {
                    Name = request.Name,
                    City = request.City,
                    Stars = request.Stars,
                    Description = $"Hotel de teste para performance - {request.Name}",
                    HotelAddress = $"Endereço de teste - {request.City}",
                    Phone = "(11) 99999-9999",
                    Rating = request.Stars // Rating baseado nas estrelas
                };

                // Configurar amenities baseado na string recebida
                var amenities = request.Amenities.Split(',', StringSplitOptions.RemoveEmptyEntries);
                foreach (var amenity in amenities)
                {
                    var cleanAmenity = amenity.Trim();
                    switch (cleanAmenity.ToLower())
                    {
                        case "wifi":
                            hotel.Wifi = true;
                            break;
                        case "pool":
                            hotel.Pool = true;
                            break;
                        case "restaurant":
                            hotel.Restaurant = true;
                            break;
                        case "bar":
                            hotel.Bar = true;
                            break;
                        case "roomservice":
                        case "serviço de quarto":
                            hotel.RoomService = true;
                            break;
                        case "accessibility":
                        case "acessibilidade":
                            hotel.Accessibility = true;
                            break;
                        case "breakfastincludes":
                        case "café da manhã incluído":
                            hotel.BreakfastIncludes = true;
                            break;
                        case "gym":
                        case "academia":
                            hotel.Gym = true;
                            break;
                        case "parking":
                        case "estacionamento":
                            hotel.Parking = true;
                            break;
                        case "warmpool":
                        case "piscina aquecida":
                            hotel.WarmPool = true;
                            break;
                        case "theater":
                        case "teatro":
                            hotel.Theater = true;
                            break;
                        case "garden":
                        case "jardim":
                            hotel.Garden = true;
                            break;
                        case "petfriendly":
                        case "aceita pets":
                            hotel.PetFriendly = true;
                            break;
                    }
                }

                await _unitOfWork.Hotels.AddAsync(hotel);
                await _unitOfWork.CommitAsync();

                return Ok(new
                {
                    Message = "Hotel de teste criado com sucesso",
                    HotelId = hotel.HotelId,
                    Name = hotel.Name,
                    City = hotel.City,
                    Stars = hotel.Stars,
                    Amenities = request.Amenities
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    Message = "Erro ao criar hotel de teste",
                    Error = ex.Message
                });
            }
        }

        /// <summary>
        /// Endpoint para limpar dados de teste criados pelo performance test
        /// ⚠️ REMOVER EM PRODUÇÃO
        /// </summary>
        [HttpPost("cleanup-test-data")]
        public async Task<IActionResult> CleanupTestData()
        {
            try
            {
                var testHotels = await _unitOfWork.Hotels.GetAllAsync();
                var hotelsToRemove = testHotels.Where(h => 
                    h.Name != null && h.Name.Contains("Hotel") && 
                    (h.Name.Contains("Copacabana") || h.Name.Contains("Ipanema") || 
                     h.Name.Contains("Leblon") || h.Name.Contains("São Paulo") || 
                     h.Name.Contains("Paulista") || h.Name.Contains("Jardins") ||
                     h.Name.Contains("Brasília") || h.Name.Contains("Asa Norte") ||
                     h.Name.Contains("Plano Piloto") || h.Name.Contains("Salvador") ||
                     h.Name.Contains("Pelourinho") || h.Name.Contains("Fortaleza") ||
                     h.Name.Contains("Beira Mar") || h.Name.Contains("Recife") ||
                     h.Name.Contains("Boa Viagem") || h.Name.Contains("Belo Horizonte") ||
                     h.Name.Contains("Savassi") || h.Name.Contains("Curitiba") ||
                     h.Name.Contains("Batel") || h.Name.Contains("Porto Alegre"))).ToList();

                foreach (var hotel in hotelsToRemove)
                {
                    _unitOfWork.Hotels.Remove(hotel);
                }

                await _unitOfWork.CommitAsync();

                return Ok(new
                {
                    Message = "Dados de teste removidos com sucesso",
                    HotelsRemoved = hotelsToRemove.Count
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    Message = "Erro ao limpar dados de teste",
                    Error = ex.Message
                });
            }
        }
    }

    public class SeedHotelRequest
    {
        public string Name { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public int Stars { get; set; }
        public string Amenities { get; set; } = string.Empty;
    }
}
