﻿using ViagemImpacta.DTO.Promotion;
using ViagemImpacta.Models;

namespace ViagemImpacta.Repositories.Interfaces
{
    public interface IRoomsPromotionalRepository 
    {
        Task<bool> RoomsAvailableAsync(int PromotionId);
        Task<RoomsPromotional?> GetRoomPromotionalByIdAsync(int idRoomPromotional);

        Task<RoomsPromotional> CreateRoomsPromotion(RoomsPromotional roomsPromotional);

    }
}
