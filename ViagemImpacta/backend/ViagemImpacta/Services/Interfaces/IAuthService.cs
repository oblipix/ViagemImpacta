using ViagemImpacta.Models;

namespace ViagemImpacta.Services.Interfaces
{
    public interface IAuthService
    {
        Task AuthenticationWithCookies(User user);
        Task CloseAdminSession();
    }
}
