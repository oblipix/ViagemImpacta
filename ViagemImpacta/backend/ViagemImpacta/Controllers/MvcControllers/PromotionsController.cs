using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using ViagemImpacta.DTO.Promotion;
using ViagemImpacta.Models;
using ViagemImpacta.Services.Interfaces;

namespace ViagemImpacta.Controllers.MvcControllers
{
    [Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme, Roles = "Admin, Attendant")]
    public class PromotionsController : Controller
    {
        private readonly IPromotionService _service;
        private readonly IHotelService _hotelService;
        private readonly IMapper _mapper;

        public PromotionsController(IPromotionService service, IHotelService hotelService, IMapper mapper)
        {
            _service = service;
            _hotelService = hotelService;
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
            if (id == null)
                return NotFound();

            var promotion = await _service.GetPromotionByIdAsync(id.Value);
            if (promotion == null)
                return NotFound();

            return View(promotion);
        }

        // GET: Promotions/Create
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create()
        {
            // Buscar todos os hotéis para o dropdown
            var hotels = await _hotelService.GetAllHotelsAsync();
            ViewBag.Hotels = new SelectList(hotels.Select(h => new { 
                HotelId = h.HotelId, 
                DisplayName = $"{h.Name} - {h.City}" 
            }), "HotelId", "DisplayName");
            
            return View();
        }

        // POST: Promotions/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create(CreatePromotionDTO dto)
        {
            // Normalizar as datas para comparação (remover componente de hora)
            var today = DateTime.Today;
            var startDate = dto.StartDate.Date;
            var endDate = dto.EndDate.Date;
            var checkIn = dto.CheckIn.Date;
            var checkOut = dto.CheckOut.Date;

            // Validações de data
            if (startDate < today)
            {
                ModelState.AddModelError("StartDate", "Data de início deve ser hoje ou no futuro.");
            }

            if (endDate < startDate)
            {
                ModelState.AddModelError("EndDate", "Data de fim deve ser posterior à data de início.");
            }

            if (checkIn < today)
            {
                ModelState.AddModelError("CheckIn", "Data de check-in deve ser hoje ou no futuro.");
            }

            if (checkOut <= checkIn)
            {
                ModelState.AddModelError("CheckOut", "Data de check-out deve ser posterior à data de check-in.");
            }

            if (!ModelState.IsValid)
            {
                // Recarregar dados para dropdown em caso de erro
                var hotels = await _hotelService.GetAllHotelsAsync();
                ViewBag.Hotels = new SelectList(hotels.Select(h => new { 
                    HotelId = h.HotelId, 
                    DisplayName = $"{h.Name} - {h.City}" 
                }), "HotelId", "DisplayName");
                
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
                
                // Recarregar dados para dropdown em caso de erro
                var hotels = await _hotelService.GetAllHotelsAsync();
                ViewBag.Hotels = new SelectList(hotels.Select(h => new { 
                    HotelId = h.HotelId, 
                    DisplayName = $"{h.Name} - {h.City}" 
                }), "HotelId", "DisplayName");
                
                return View(dto);
            }
        }
    }
}
