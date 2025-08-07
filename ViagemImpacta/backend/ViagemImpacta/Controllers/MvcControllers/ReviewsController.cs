using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ViagemImpacta.Models;
using ViagemImpacta.Services.Interfaces;

namespace ViagemImpacta.Controllers.MvcControllers
{
    [Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme, Roles = "Admin")]
    public class ReviewsController : Controller
    {
        private readonly IReviewService _reviewService;
        private readonly IHotelService _hotelService;
        private readonly IUserService _userService;

        public ReviewsController(IReviewService reviewService, IHotelService hotelService, IUserService userService)
        {
            _reviewService = reviewService;
            _hotelService = hotelService;
            _userService = userService;
        }

        // GET: Reviews
        public async Task<IActionResult> Index()
        {
            var reviews = await _reviewService.GetAllReviewsAsync();
            return View(reviews);
        }

        // GET: Reviews/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
                return NotFound();
            var review = await _reviewService.GetReviewByIdAsync(id.Value);
            if (review == null)
                return NotFound();
            return View(review);
        }

        // GET: Reviews/Delete/5
        public async Task<IActionResult> DeleteMVC(int? id)
        {
            if (id == null)
                return NotFound();
            var review = await _reviewService.GetReviewByIdAsync(id.Value);
            if (review == null)
                return NotFound();
            return View("Delete", review);
        }

        // POST: Reviews/Delete/5
        [HttpPost]
        [ActionName("DeleteMVC")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            try
            {
                var result = await _reviewService.DeleteReviewAsync(id);
                if (!result)
                {
                    TempData["Error"] = "Não foi possível excluir a avaliação. Ela pode não existir.";
                }
                else
                {
                    TempData["Success"] = "Avaliação excluída com sucesso.";
                }
            }
            catch (Exception ex)
            {
                TempData["Error"] = $"Erro ao excluir a avaliação: {ex.Message}";
            }
            
            return RedirectToAction(nameof(Index));
        }
    }
}
