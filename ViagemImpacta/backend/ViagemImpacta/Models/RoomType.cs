namespace ViagemImpacta.Models
{
    public class RoomType
    {
        public int RoomTypeId { get; set; }
        public int HotelId { get; set; }
        public Hotel? Hotel { get; set; }
        public string Name { get; set; } = string.Empty; // Ex: "Single Luxo"
        public string? Description { get; set; }
        public int TotalQuantity { get; set; }
        public decimal BasePrice { get; set; }
        public int MaxOccupancy { get; set; }
        public string? ImageUrl { get; set; }
        public bool IsActive { get; set; } = true;

        // Relacionamentos
        public ICollection<Room>? Rooms { get; set; }
        public ICollection<Availability>? Availabilities { get; set; }
    }
}
