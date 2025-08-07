namespace ViagemImpacta.Models.Dashboard;

public class DashboardStats
{
    public int TotalHotels { get; set; }
    public int TotalReservations { get; set; }
    public int TotalUsers { get; set; }
    public decimal TotalRevenue { get; set; }
    public int ReservationsThisMonth { get; set; }
    public decimal RevenueThisMonth { get; set; }
    public int PendingReservations { get; set; }
    public int ConfirmedReservations { get; set; }
    public int CanceledReservations { get; set; }
    public decimal AverageReservationValue { get; set; }
    public int TotalRooms { get; set; }
    public decimal OccupancyRate { get; set; }
}
