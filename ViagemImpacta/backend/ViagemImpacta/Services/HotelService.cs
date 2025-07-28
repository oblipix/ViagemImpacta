using System.Collections.Generic;
using System.Threading.Tasks;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories;

namespace ViagemImpacta.Services
{
    public class HotelService : IHotelService
    {
        private readonly IUnitOfWork _unitOfWork;
        public HotelService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<Hotel>> GetAllHotelsAsync()
        {
            return await _unitOfWork.Hotels.GetAllAsync();
        }

        public async Task<Hotel?> GetHotelByIdAsync(int id)
        {
            return await _unitOfWork.Hotels.GetByIdAsync(id);
        }

        public async Task AddHotelAsync(Hotel hotel)
        {
            await _unitOfWork.Hotels.AddAsync(hotel);
            await _unitOfWork.CommitAsync();
        }

        public async Task UpdateHotelAsync(Hotel hotel)
        {
            await _unitOfWork.Hotels.UpdateAsync(hotel);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteHotelAsync(int id)
        {
            await _unitOfWork.Hotels.DeleteAsync(id);
            await _unitOfWork.CommitAsync();
        }
    }
}
