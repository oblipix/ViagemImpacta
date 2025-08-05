using AutoMapper;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using ViagemImpacta.DTO.Promotion;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories;
using ViagemImpacta.Repositories.Interfaces;
using ViagemImpacta.Services.Interfaces;

namespace ViagemImpacta.Services.Implementations
{
    public class PromotionService : IPromotionService
    {

        private readonly TimeZoneInfo BrazilTimeZone = TimeZoneInfo.FindSystemTimeZoneById("E. South America Standard Time");
        private readonly IUnitOfWork _unititOfWork;
        private readonly IMapper _mapper;

        public PromotionService(IUnitOfWork unititOfWork, IMapper mapper)
        {
            _unititOfWork = unititOfWork;
            _mapper = mapper;
        }

        public async Task<Promotion?> CreatePromotionAsync(CreatePromotionDTO dto)
        {



            if (dto.RoomType.Equals("Standard"))
            {
                dto.RoomID = Models.Enums.RoomType.Standard;
            }
            else if (dto.RoomType.Equals("Luxo"))
            {
                dto.RoomID = Models.Enums.RoomType.Luxo;
            }
            else if (dto.RoomType.Equals("Suite"))
            {
                dto.RoomID = Models.Enums.RoomType.Suite;
            }

            var dailyPrice = await _unititOfWork.Rooms.GetPriceRoomByHotelAndType(dto.HotelId, dto.RoomID);
            var originalPrice = dailyPrice * (dto.CheckOut - dto.CheckIn).Days;
            var calcDiscaunt = originalPrice * (dto.DiscountPercentage / 100);
            var finalPrice = originalPrice - calcDiscaunt;
            dto.FinalPrice = finalPrice;


            var promocao = _mapper.Map<Promotion>(dto);
            promocao.Hotel = await _unititOfWork.Hotels.GetHotelByIdAsync(dto.HotelId);
            promocao.OriginalPrice = originalPrice;
            promocao.DiscountPercentage = dto.DiscountPercentage;
            promocao.CreatedAt = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, BrazilTimeZone);


            await _unititOfWork.Promotions.AddAsync(promocao);
            await _unititOfWork.CommitAsync();


            var quantidadeQuartosPromocao = new CreateRoomsPromotionDTO
            {
                IdHotelPromotion = dto.HotelId,
                TypeName = dto.RoomType,
                TotalRoomsAvailable = dto.TotalRoomsAvailable,
                TotalRoomsReserved = 0,
                Capacity = 4,
                PromotionId = promocao.PromotionId
            };
            var roomsPromotional = _mapper.Map<RoomsPromotional>(quantidadeQuartosPromocao);

            await _unititOfWork.RoomsPromotions.CreateRoomsPromotion(roomsPromotional);
            await _unititOfWork.CommitAsync();


            return promocao;
        }

        public async Task<IEnumerable<Promotion>> GetActivePromotionsAsync()
        {
            return await _unititOfWork.Promotions.GetActivePromotionsAsync();
        }

        public async Task<Promotion> GetPromotionByIdAsync(int idPromotion)
        {
            return await _unititOfWork.Promotions.GetPromotionByIdAsync(idPromotion);
        }

    }
}
