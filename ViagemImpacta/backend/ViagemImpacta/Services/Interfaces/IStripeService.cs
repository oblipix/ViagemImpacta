using ViagemImpacta.Models;

namespace ViagemImpacta.Services.Interfaces
{
    public interface IStripeService
    {
        decimal GetBalance();
        Task<string> CreateCheckout(Reservation result);
    }
}
