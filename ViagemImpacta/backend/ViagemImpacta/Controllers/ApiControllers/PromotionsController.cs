using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ViagemImpacta.DTO.ReservationDTO;
using ViagemImpacta.Models;
using ViagemImpacta.Services.Implementations;

namespace ViagemImpacta.Controllers.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PromotionsController : ControllerBase
    {
        public readonly PromotionService _promotionService;

        public PromotionsController(PromotionService promotionService)
        {
            _promotionService = promotionService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Promotion>>> GetAllPromotionsActive()
        {
            var promotions = await _promotionService.GetActivePromotionsAsync();
            return Ok(promotions);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Promotion>> GetPromotionsById(int id)
        {
            var promotions = await _promotionService.GetPromotionByIdAsync(id);
            return Ok(promotions);
        }

    }
}
