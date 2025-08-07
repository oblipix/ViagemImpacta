using Microsoft.AspNetCore.Mvc;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories;
using AutoMapper;
using ViagemImpacta.DTO.HotelDTO;
using ViagemImpacta.Services.Interfaces;

namespace ViagemImpacta.Controllers.ApiControllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HotelsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IHotelService _hotelService;

        public HotelsController(IUnitOfWork unitOfWork, IMapper mapper, IHotelService hotelService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _hotelService = hotelService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<HotelDto>>> GetAllHotels()
        {
            var hotels = await _unitOfWork.Hotels.GetAllHotelsWithRoomsAsync();
            var hotelDtos = _mapper.Map<IEnumerable<HotelDto>>(hotels);
            return Ok(hotelDtos);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<HotelDto>> GetHotel(int id)
        {
            if (id <= 0)
                return BadRequest("ID deve ser maior que zero");

            var hotel = await _unitOfWork.Hotels.GetHotelWithRoomsAsync(id);
            var hotelDto = _mapper.Map<HotelDto>(hotel);

            if (hotel == null)
                return NotFound($"Hotel com ID {id} não encontrado");

            return Ok(hotelDto);
        }

        [HttpGet("search")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<HotelDto>>> SearchHotels(
            [FromQuery] string? destination,
            [FromQuery] int? guests,
            [FromQuery] decimal? minPrice,
            [FromQuery] decimal? maxPrice,
            [FromQuery] int? stars,
            [FromQuery] string? roomType,
            [FromQuery] string? amenities,
            [FromQuery] string? checkIn,
            [FromQuery] string? checkOut,
            [FromQuery] string? sortBy = null)
        {
            // Validação de parâmetros de entrada
            var validationErrors = ValidateSearchParameters(minPrice, maxPrice, stars, guests, checkIn, checkOut);
            
            if (validationErrors.Any())
            {
                return BadRequest(new { 
                    Message = "Parâmetros de busca inválidos", 
                    Errors = validationErrors 
                });
            }

            // Execução da busca no repositório
            var hotels = await _unitOfWork.Hotels.SearchHotelsAsync(
                destination,
                minPrice,
                maxPrice,
                stars,
                roomType,
                amenities,
                guests,
                checkIn,
                checkOut,
                sortBy
            );

            var hotelDtos = _mapper.Map<IEnumerable<HotelDto>>(hotels);
            return Ok(hotelDtos);
        }

        /// <summary>
        /// Valida os parâmetros de busca antes de processar a consulta
        /// </summary>
        private List<string> ValidateSearchParameters(
            decimal? minPrice, 
            decimal? maxPrice, 
            int? stars, 
            int? guests, 
            string? checkIn, 
            string? checkOut)
        {
            var errors = new List<string>();

            // Validação de preços
            if (minPrice.HasValue && minPrice.Value < 0)
            {
                errors.Add($"Preço mínimo não pode ser negativo: {minPrice.Value}");
            }

            if (maxPrice.HasValue && maxPrice.Value < 0)
            {
                errors.Add($"Preço máximo não pode ser negativo: {maxPrice.Value}");
            }

            if (minPrice.HasValue && maxPrice.HasValue && minPrice.Value > maxPrice.Value)
            {
                errors.Add($"Preço mínimo ({minPrice.Value}) não pode ser maior que preço máximo ({maxPrice.Value})");
            }

            // Validação de estrelas (hotéis têm de 1 a 5 estrelas)
            if (stars.HasValue && (stars.Value < 1 || stars.Value > 5))
            {
                errors.Add($"Estrelas devem estar entre 1 e 5: {stars.Value}");
            }

            // Validação de hóspedes
            if (guests.HasValue && guests.Value <= 0)
            {
                errors.Add($"Número de hóspedes deve ser maior que zero: {guests.Value}");
            }

            // Validação de datas
            if (!string.IsNullOrWhiteSpace(checkIn) && !string.IsNullOrWhiteSpace(checkOut))
            {
                if (!DateTime.TryParse(checkIn, out var checkInDate) ||
                    !DateTime.TryParse(checkOut, out var checkOutDate))
                {
                    errors.Add("Formato de data inválido");
                }
                else if (checkOutDate <= checkInDate)
                {
                    errors.Add("Data de check-out deve ser posterior à data de check-in");
                }
                else if (checkInDate < DateTime.Today)
                {
                    errors.Add("Não é possível buscar reservas para datas passadas");
                }
            }

            return errors;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<HotelDto>> CreateHotel([FromBody] HotelDto hotelDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var hotel = _mapper.Map<Hotel>(hotelDto);
            var createdHotel = await _hotelService.CreateHotelAsync(hotel);
            var resultDto = _mapper.Map<HotelDto>(createdHotel);

            return CreatedAtAction(nameof(GetHotel), new { id = createdHotel.HotelId }, resultDto);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<HotelDto>> UpdateHotel(int id, [FromBody] HotelDto hotelDto)
        {
            if (id != hotelDto.HotelId)
                return BadRequest("ID na URL não corresponde ao ID do hotel");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingHotel = await _hotelService.GetHotelByIdAsync(id);
            if (existingHotel == null)
                return NotFound($"Hotel com ID {id} não encontrado");

            var hotel = _mapper.Map<Hotel>(hotelDto);
            await _hotelService.UpdateHotelAsync(hotel);

            var updatedHotel = await _hotelService.GetHotelWithRoomsAsync(id);
            var resultDto = _mapper.Map<HotelDto>(updatedHotel);

            return Ok(resultDto);
        }
    }
}