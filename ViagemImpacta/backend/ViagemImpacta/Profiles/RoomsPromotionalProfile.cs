using AutoMapper;
using ViagemImpacta.DTO.Promotion;
using ViagemImpacta.Models;

namespace ViagemImpacta.Profiles
{
    public class RoomsPromotionalProfile : Profile
    {
        public RoomsPromotionalProfile()
        {
            CreateMap<CreateRoomsPromotionDTO, RoomsPromotional>();
        }
    }
}
