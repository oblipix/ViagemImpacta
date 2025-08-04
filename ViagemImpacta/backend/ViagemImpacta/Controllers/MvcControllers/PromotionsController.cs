using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ViagemImpacta.DTO.Promotion;
using ViagemImpacta.Models;
using ViagemImpacta.Services.Interfaces;

namespace ViagemImpacta.Controllers.MvcControllers
{
    [Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme, Roles = "Admin, Attendant")]
    public class PromotionsController : Controller
    {
        private readonly IPromotionService _service;
        private readonly IMapper _mapper;

        public PromotionsController(IPromotionService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        // GET: Promotions
        public async Task<IActionResult> Index()
        {
            var allPromotionsActive = await _service.GetActivePromotionsAsync();
            return View(allPromotionsActive);
        }

        // GET: Promotions/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            var Idpromotion = (int)id.Value;
            if (Idpromotion == null)
            {
                return NotFound();
            }
            var promotion = await _service.GetPromotionByIdAsync(Idpromotion);
            if (promotion == null)
            {
                return NotFound();
            }
            return View(promotion);

        }

        // GET: Promotions/Create
        [Authorize(Roles = "Admin")]
        public IActionResult Create()
        {
            return View();
        }

        // POST: Promotions/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create(CreatePromotionDTO dto)
        {
            if (dto.StartDate < DateTime.UtcNow.Date || dto.StartDate > dto.EndDate)
            {
                ModelState.AddModelError("", "Data de início deve ser hoje ou futura e anterior à data de fim.");
                return View(dto);
            }

            if (!ModelState.IsValid)
            {
                return View(dto);
            }

            try
            {
                await _service.CreatePromotionAsync(dto);
                return RedirectToAction(nameof(Index));
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", $"Erro ao criar promoção: {ex.Message}");
                return View(dto);
            }
        }
    }
}
