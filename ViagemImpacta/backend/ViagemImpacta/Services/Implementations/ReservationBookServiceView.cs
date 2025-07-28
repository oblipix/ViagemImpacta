using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ViagemImpacta.DTO.ReservationBookDTO;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories;
using ViagemImpacta.Services.Interfaces;

namespace ViagemImpacta.Services.Implementations
{
    public class ReservationBookServiceView : IReservationBookServiceView
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ReservationBookServiceView(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        
        public async Task<IEnumerable<ReservationBookDto>> GetAllPackagesAsync()
        {
            var packages = await _unitOfWork.ReservationBooks.GetActivePackagesAsync();
            return _mapper.Map<IEnumerable<ReservationBookDto>>(packages);
        }

        public async Task<ReservationBookDto?> GetPackageByIdAsync(int id)
        {
            var package = await _unitOfWork.ReservationBooks.GetPackageWithDetailsAsync(id);
            return package == null ? null : _mapper.Map<ReservationBookDto>(package);
        }

        public async Task<ReservationBook> CreatePackageAsync(ReservationBook package, List<int> hotelIds)
        {
            package.CreatedAt = DateTime.UtcNow;
            package.UpdatedAt = DateTime.UtcNow;

            var selectedHotels = new List<Hotel>();
            foreach (var hotelId in hotelIds)
            {
                var hotel = await _unitOfWork.Hotels.GetByIdAsync(hotelId);
                if (hotel != null)
                {
                    selectedHotels.Add(hotel);
                }
            }
            package.Hotels = selectedHotels;

            await _unitOfWork.ReservationBooks.AddAsync(package);
            await _unitOfWork.CommitAsync();

            return package;
        }

        public async Task<bool> UpdatePackageAsync(ReservationBook package, List<int> hotelIds)
        {
            var existingPackage = await _unitOfWork.ReservationBooks.GetPackageWithDetailsAsync(package.ReservationBookId);
            if (existingPackage == null) return false;

            _mapper.Map(package, existingPackage);

            var selectedHotels = new List<Hotel>();
            foreach (var hotelId in hotelIds)
            {
                var hotel = await _unitOfWork.Hotels.GetByIdAsync(hotelId);
                if (hotel != null)
                {
                    selectedHotels.Add(hotel);
                }
            }
            existingPackage.Hotels = selectedHotels;

            await _unitOfWork.ReservationBooks.UpdateAsync(existingPackage);
            await _unitOfWork.CommitAsync();

            return true;
        }

        public async Task<bool> DeletePackageAsync(int id)
        {
            var packageToDelete = await _unitOfWork.ReservationBooks.GetPackageWithDetailsAsync(id);
            if (packageToDelete == null) return false;

            packageToDelete.Active = false;
            await _unitOfWork.ReservationBooks.UpdateAsync(packageToDelete);
            await _unitOfWork.CommitAsync();

            return true;
        }

        public async Task<IEnumerable<Hotel>> GetAllHotelsAsync()
        {
            return await _unitOfWork.Hotels.GetAllAsync();
        }

        public async Task<IEnumerable<ReservationBookDto>> SearchPackagesAsync(string searchTerm)
        {
            var packages = await _unitOfWork.ReservationBooks.GetPackagesAsync(
                p => p.Active && (p.Title.Contains(searchTerm) || p.Description.Contains(searchTerm)));
            return _mapper.Map<IEnumerable<ReservationBookDto>>(packages);
        }

        public async Task<IEnumerable<ReservationBookDto>> GetPackagesWithFiltersAsync(string? destination, decimal? minPrice, decimal? maxPrice, DateTime? checkIn, DateTime? checkOut, bool? promotion, int skip, int take)
        {
            var packages = await _unitOfWork.ReservationBooks.GetPackagesAsync(
                p => p.Active &&
                    (string.IsNullOrEmpty(destination) || p.Destination.Contains(destination)) &&
                    (!minPrice.HasValue || p.FinalPrice >= minPrice.Value) &&
                    (!maxPrice.HasValue || p.FinalPrice <= maxPrice.Value) &&
                    (!checkIn.HasValue || p.CheckIn >= checkIn.Value) &&
                    (!checkOut.HasValue || p.CheckOut <= checkOut.Value) &&
                    (!promotion.HasValue || p.Promotion == promotion.Value),
                skip,
                take);
            return _mapper.Map<IEnumerable<ReservationBookDto>>(packages);
        }
    }
}
