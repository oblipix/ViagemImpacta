namespace ViagemImpacta.Models
{
    public class Reservation
    {
        public int ReservationId { get; set; }
        public int UserId { get; set; } //user de quem fez a reserva (codigo)
        public User? User { get; set; } //user que fez a reserva 
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public decimal FinalPrice { get; set; }
        public bool Active { get; set; }
        public int HotelId { get; set; }
        public Hotel Hotel { get; set; }
        public ICollection<Traveller>? Travellers { get; set; }

    }
      
    }

