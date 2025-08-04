﻿using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;
using ViagemImpacta.Data;
using ViagemImpacta.DTO.Promotion;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories.Interfaces;

namespace ViagemImpacta.Repositories.Implementations
{
    public class PromotionRepository : Repository<Promotion>, IPromotionRepository
    {
        private readonly AgenciaDbContext _context;
        public PromotionRepository(AgenciaDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Promotion>> GetActivePromotionsAsync()
        {
            var AllPromotionsActive = await _context.Promotions
                .Include(p => p.Hotel) // Incluir dados do hotel
                .Where(p => p.IsActive)
                .OrderByDescending(p => p.CreatedAt) // Ordenar por data de criação
                .AsNoTracking()
                .ToListAsync();
            
            Console.WriteLine($"Total de promoções ativas encontradas: {AllPromotionsActive.Count()}");
            
            return AllPromotionsActive;
        }

        public async Task<Promotion?> GetPromotionByIdAsync(int idPromotion)
        {
            return await _context.Promotions
                .Include(p => p.Hotel)
                .FirstOrDefaultAsync(p => p.PromotionId == idPromotion);
        }

        public async Task<IEnumerable<Promotion>> GetPromotionsByHotelIdAsync(int hotelId)
        {
            return await _context.Promotions
                .Where(p => p.HotelId == hotelId)
                .ToListAsync();
        }
    }
}
