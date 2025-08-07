using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using ViagemImpacta.Models;
using ViagemImpacta.Services.Implementations;
using ViagemImpacta.Services.Interfaces;
using ViagemImpacta.ViewModels;

namespace ViagemImpacta.Controllers.MvcControllers;

public class AdminsController : Controller
{
    private readonly IUserService _userService;
    private readonly AuthService _authService;
    private readonly StripeService _stripeService;
    private readonly IDashboardService _dashboardService;

    public AdminsController(IUserService userService, AuthService authService, StripeService stripeService, IDashboardService dashboardService)
    {
        _userService = userService;
        _authService = authService;
        _stripeService = stripeService;
        _dashboardService = dashboardService;
    }

    public IActionResult Index()
    {
        return View();
    }

    [Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme, Roles = "Admin, Attendant")]
    public async Task<IActionResult> Dashboard()
    {
        try
        {
            var balance = _stripeService.GetBalance();
            ViewBag.Balance = balance;
            var userName = HttpContext.User.FindFirst(ClaimTypes.Name)?.Value;
            var userRole = HttpContext.User.FindFirst(ClaimTypes.Role)?.Value;
            ViewBag.Name = userName;
            ViewBag.Role = userRole;

            var hotelRevenueData = await _dashboardService.GetHotelRevenueDataAsync();
            var reservationStatusData = await _dashboardService.GetReservationStatusDataAsync();

            ViewBag.HotelRevenueData = hotelRevenueData;
            ViewBag.ReservationStatusData = reservationStatusData;

            return View();
        }
        catch (Exception ex)
        {
            ModelState.AddModelError(string.Empty, $"Erro ao carregar dados do dashboard: {ex.Message}");
            return RedirectToAction("Dashboard");
        }
    }

    [Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme, Roles = "Admin, Attendant")]
    public async Task<IActionResult> FaturamentoDetalhado()
    {
        try
        {
            var userName = HttpContext.User.FindFirst(ClaimTypes.Name)?.Value;
            var userRole = HttpContext.User.FindFirst(ClaimTypes.Role)?.Value;
            ViewBag.Name = userName;
            ViewBag.Role = userRole;

            // Passar dados para a view
            ViewBag.HotelRevenueData = await _dashboardService.GetHotelRevenueDataAsync(); ;
            ViewBag.ReservationStatusData = await _dashboardService.GetReservationStatusDataAsync();

            return View();
        }
        catch (Exception ex)
        {
            ModelState.AddModelError(string.Empty, $"Erro ao carregar dados do dashboard: {ex.Message}");
            return RedirectToAction("Dashboard");
        }
    }

    [HttpPost, ActionName("Index")]
    public async Task<ActionResult<User>> Login(ReadAdminViewModel model)
    {
        if (!ModelState.IsValid) return View(model);

        try
        {
            var admin = await _userService.GetUserByEmail(model.Email);
            if (admin == null || !BCrypt.Net.BCrypt.Verify(model.Password, admin.Password))
            {
                ModelState.AddModelError("", "E-mail ou senha inválidos.");
                return View(model);
            }

            await _authService.AuthenticationWithCookies(admin);

            return RedirectToAction("Dashboard");
        }
        catch (Exception ex)
        {
            ModelState.AddModelError(string.Empty, $"Erro ao fazer login: {ex.Message}");
            return View(model);
        }
    }

    [HttpPost]
    public async Task<IActionResult> Logout()
    {
        try
        {
            await _authService.CloseAdminSession();
            return RedirectToAction("Index", "Admins");
        }
        catch (Exception ex)
        {
            ModelState.AddModelError(string.Empty, $"Erro ao fazer logout: {ex.Message}");
            return RedirectToAction("Dashboard");
        }
    }

    public IActionResult AccessDenied()
    {
        return View();
    }
}
