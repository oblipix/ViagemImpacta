using Microsoft.AspNetCore.Mvc;
using ViagemImpacta.Services;

namespace ViagemImpacta.Controllers.ApiControllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HotelTestController : ControllerBase
    {
        private readonly IHotelTestService _hotelTestService;

        public HotelTestController(IHotelTestService hotelTestService)
        {
            _hotelTestService = hotelTestService;
        }

        [HttpGet("hotels-with-room-types")]
        public async Task<IActionResult> GetHotelsWithRoomTypes()
        {
            var result = await _hotelTestService.GetHotelsWithRoomTypesAsync();
            if (result.Success)
                return Ok(result.Data);
            return BadRequest(new { error = result.Error });
        }

        [HttpGet("availability/{roomTypeId}")]
        public async Task<IActionResult> GetAvailability(int roomTypeId, [FromQuery] DateTime? startDate = null, [FromQuery] int days = 7)
        {
            var result = await _hotelTestService.GetAvailabilityAsync(roomTypeId, startDate, days);
            if (result.Success)
                return Ok(result.Data);
            return BadRequest(new { error = result.Error });
        }

        [HttpGet("multi-date-availability")]
        public async Task<IActionResult> GetMultiDateAvailability([FromQuery] int days = 7)
        {
            var result = await _hotelTestService.GetMultiDateAvailabilityAsync(days);
            if (result.Success)
                return Ok(result.Data);
            return BadRequest(new { error = result.Error });
        }

        [HttpPost("simulate-reservation")]
        public async Task<IActionResult> SimulateReservation([FromBody] ReservationRequest request)
        {
            var result = await _hotelTestService.SimulateReservationAsync(request);
            if (result.Success)
                return Ok(result.Data);
            return BadRequest(new { error = result.Error });
        }
    }

    public class ReservationRequest
    {
        public int RoomTypeId { get; set; }
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
        public int Quantity { get; set; } = 1;
    }
}
