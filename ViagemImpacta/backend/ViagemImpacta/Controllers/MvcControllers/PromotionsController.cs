﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspNetCoreGeneratedDocument;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ViagemImpacta.Data;
using ViagemImpacta.DTO.Promotion;
using ViagemImpacta.Models;
using ViagemImpacta.Services.Interfaces;

namespace ViagemImpacta.Controllers.MvcControllers
{
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
            //var agenciaDbContext = _context.Promotions.Include(p => p.Hotel);
            //return View(await agenciaDbContext.ToListAsync());
            return View();
        }

        // GET: Promotions/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            //if (id == null)
            //{
            //    return NotFound();
            //}

            //var promotion = await _context.Promotions
            //    .Include(p => p.Hotel)
            //    .FirstOrDefaultAsync(m => m.PromotionId == id);
            //if (promotion == null)
            //{promotion
            //    return NotFound();
            //}

            return View();
        }

        // GET: Promotions/Create
        public IActionResult Create()
        {
            //ViewData["HotelId"] = new SelectList(_context.Hotels, "HotelId", "City");
            
            return View();
        }

        // POST: Promotions/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(CreatePromotionDTO dto)
        {
            if (dto.StartDate < DateTime.UtcNow.Date || dto.StartDate > dto.EndDate)
            {
                return BadRequest();

            }
            var promotionCreate = await _service.CreatePromotionAsync(dto);

            return View(promotionCreate);
        }

        // GET: Promotions/Edit/5
        //public async Task<IActionResult> Edit(int? id)
        //{
        //    if (id == null)
        //    {
        //        return NotFound();
        //    }

        //    var promotion = await _context.Promotions.FindAsync(id);
        //    if (promotion == null)
        //    {
        //        return NotFound();
        //    }
        //    ViewData["HotelId"] = new SelectList(_context.Hotels, "HotelId", "City", promotion.HotelId);
        //    return View(promotion);
        //}

        // POST: Promotions/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> Edit(int id, [Bind("PromotionId,TitlePromotion,Description,StartDate,EndDate,CheckIn,CheckOut,HotelId,FinalPrice,OriginalPrice,DiscountPercentage,IsActive,CreatedAt,RoomsPromotionalId")] Promotion promotion)
        //{
        //    if (id != promotion.PromotionId)
        //    {
        //        return NotFound();
        //    }

        //    if (ModelState.IsValid)
        //    {
        //        try
        //        {
        //            _context.Update(promotion);
        //            await _context.SaveChangesAsync();
        //        }
        //        catch (DbUpdateConcurrencyException)
        //        {
        //            if (!PromotionExists(promotion.PromotionId))
        //            {
        //                return NotFound();
        //            }
        //            else
        //            {
        //                throw;
        //            }
        //        }
        //        return RedirectToAction(nameof(Index));
        //    }
        //    ViewData["HotelId"] = new SelectList(_context.Hotels, "HotelId", "City", promotion.HotelId);
        //    return View(promotion);
        //}

        // GET: Promotions/Delete/5
        //public async Task<IActionResult> Delete(int? id)
        //{
        //    if (id == null)
        //    {
        //        return NotFound();
        //    }

        //    var promotion = await _context.Promotions
        //        .Include(p => p.Hotel)
        //        .FirstOrDefaultAsync(m => m.PromotionId == id);
        //    if (promotion == null)
        //    {
        //        return NotFound();
        //    }

        //    return View(promotion);
        //}

        // POST: Promotions/Delete/5
        //    [HttpPost, ActionName("Delete")]
        //    [ValidateAntiForgeryToken]
        //    public async Task<IActionResult> DeleteConfirmed(int id)
        //    {
        //        var promotion = await _context.Promotions.FindAsync(id);
        //        if (promotion != null)
        //        {
        //            _context.Promotions.Remove(promotion);
        //        }

        //        await _context.SaveChangesAsync();
        //        return RedirectToAction(nameof(Index));
        //    }

        //    private bool PromotionExists(int id)
        //    {
        //        return _context.Promotions.Any(e => e.PromotionId == id);
        //    }
        //}
    }
}
