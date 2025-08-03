using AutoMapper;
using ViagemImpacta.DTO.Promotion;

namespace ViagemImpacta.Profiles
{
    public class RoomsPromotional : Profile
    {

        public RoomsPromotional()
        {
            CreateMap<CreateRoomsPromotionDTO, RoomsPromotional>();
        }
        
    }
}
