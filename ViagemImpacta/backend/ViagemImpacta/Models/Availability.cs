namespace ViagemImpacta.Models
{
    public class Availability
    {
        public int AvailabilityId { get; set; }
        public int RoomTypeId { get; set; }
        public RoomType? RoomType { get; set; }
        public DateTime Date { get; set; }
        public int AvailableQuantity { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}