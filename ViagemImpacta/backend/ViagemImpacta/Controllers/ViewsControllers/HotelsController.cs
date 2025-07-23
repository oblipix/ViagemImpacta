﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ViagemImpacta.Models;
using ViagemImpacta.Services.Interfaces; // Importa a interface do serviço
using ViagemImpacta.Models;
namespace ViagemImpacta.Controllers
{
    public class HotelsController : Controller
    {
        private readonly IHotelService _hotelService;

        public HotelsController(IHotelService hotelService)
        {
            _hotelService = hotelService;
        }

        public async Task<IActionResult> Index()
        {
            var hotels = await _hotelService.GetAllHotelsAsync();
            return View(hotels);
        }


       

        public IActionResult Create()
        {
            return View();
        }
        

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Hotel hotel) 
        {
            if (ModelState.IsValid)
            {
                await _hotelService.CreateHotelAsync(hotel);
                return RedirectToAction(nameof(Index));
            }
            return View(hotel);
        }
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            // Chama o serviço para buscar o hotel com seus quartos
            var hotel = await _hotelService.GetHotelWithRoomsAsync(id.Value);

            if (hotel == null)
            {
                return NotFound();
            }

            return View(hotel);
        }
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var hotel = await _hotelService.GetHotelWithRoomsAsync(id.Value);

            if (hotel == null)
            {
                return NotFound();
            }

            return View(hotel);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, Hotel hotel)
        {
            if (id != hotel.HotelId)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                await _hotelService.UpdateHotelAsync(hotel);
                return RedirectToAction(nameof(Index));
            }
            return View(hotel);
        }


        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var hotel = await _hotelService.GetHotelByIdAsync(id.Value);
            if (hotel == null)
            {
                return NotFound();
            }

            return View(hotel);
        }

        
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            await _hotelService.DeleteHotelAsync(id);
            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Search(string? location, int? minStars)
        {
            ViewBag.Location = location;
            ViewBag.MinStars = minStars;

            var hotels = await _hotelService.GetHotelsWithFiltersAsync(location, minStars, null, null);

            return View(hotels);
        }
    }
}