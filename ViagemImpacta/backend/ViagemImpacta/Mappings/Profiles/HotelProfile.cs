using AutoMapper;
using ViagemImpacta.Models;
using ViagemImpacta.DTO.Hotel;

namespace ViagemImpacta.Mappings.Profiles
{
    /// <summary>
    /// ?? AUTOMAPPER PROFILE - Hotel
    /// 
    /// Profile espec�fico para mapeamentos relacionados a hot�is.
    /// Mant�m separa��o clara de responsabilidades.
    /// 
    /// ?? RESPONSABILIDADES:
    /// - Mapeamentos Hotel ? HotelResponse
    /// - Mapeamentos Hotel ? HotelListResponse
    /// - Configura��es espec�ficas de Hotel
    /// </summary>
    public class HotelProfile : Profile
    {
        public HotelProfile()
        {
            ConfigureHotelMappings();
        }

        /// <summary>
        /// Configura��es de mapeamento para Hotel
        /// </summary>
        private void ConfigureHotelMappings()
        {
            // ?? ENTITY ? RESPONSE
            CreateMap<Hotel, HotelResponse>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.HotelId))
                .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.Image))
                .ForMember(dest => dest.HasWifi, opt => opt.MapFrom(src => src.Wifi))
                .ForMember(dest => dest.HasParking, opt => opt.MapFrom(src => src.Parking))
                .ForMember(dest => dest.HasGym, opt => opt.MapFrom(src => src.Gym))
                .ForMember(dest => dest.HasRestaurant, opt => opt.MapFrom(src => src.Restaurant));

            // ?? ENTITY ? LIST RESPONSE
            CreateMap<Hotel, HotelListResponse>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.HotelId))
                .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.Image))
                .ForMember(dest => dest.HasWifi, opt => opt.MapFrom(src => src.Wifi))
                .ForMember(dest => dest.HasParking, opt => opt.MapFrom(src => src.Parking));
        }
    }
}