namespace ViagemImpacta.Models.Dashboard;

public class HotelRevenueData
{
    public string HotelName { get; set; } = string.Empty;
    public decimal Revenue { get; set; }
    public int ReservationCount { get; set; }
    public string City { get; set; } = string.Empty;
    public int Stars { get; set; }
}
