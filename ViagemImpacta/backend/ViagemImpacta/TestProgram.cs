using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using ViagemImpacta.Data;
using ViagemImpacta.Profiles;
using ViagemImpacta.Repositories;
using ViagemImpacta.Repositories.Implementations;
using ViagemImpacta.Repositories.Interfaces;
using ViagemImpacta.Services;
using ViagemImpacta.Services.Implementations;
using ViagemImpacta.Services.Interfaces;
using ViagemImpacta.Setup;
using Settings = ViagemImpacta.Settings;

namespace ViagemImpacta;

/// <summary>
/// Classe pública para testes de integração
/// </summary>
public class TestProgram
{
    public static WebApplication CreateTestApplication(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        var key = Encoding.ASCII.GetBytes(Settings.Secret);

        // Adiciona o Application Insights
        builder.Services.AddApplicationInsightsTelemetry();

        builder.Services.AddControllersWithViews();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler =
                    System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
            });

        builder.Services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "Viagem Impacta API",
                Version = "v1",
                Description = "API para gerenciamento de pacotes de viagem"
            });

            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
            {
                Name = "Authorization",
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer",
                BearerFormat = "JWT",
                In = ParameterLocation.Header,
                Description = $@"Autorização JWT usando o Bearer.
                </br>Coloque 'Bearer'[espaço] e então o seu token em seguida.
                </br>Exemplo: \'Bearer 12345abcdef\'</br>",
            });

            c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    new string [] {}
                }
            });
        });

        builder.Services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.RequireHttpsMetadata = false;
            options.SaveToken = true;
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero // Remove the default 5 minutes clock skew
            };
        })
        .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
        {
            options.LoginPath = "/Admins/Index";
            options.AccessDeniedPath = "/Admins/AccessDenied";
            options.ExpireTimeSpan = TimeSpan.FromHours(2);
            options.SlidingExpiration = true;
            options.Cookie.IsEssential = true;
        });

        builder.Services.AddAuthorization();
        builder.Services.AddControllers();

        // Configuração do Entity Framework
        builder.Services.AddDbContext<AgenciaDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

        // Configuração do AutoMapper
        builder.Services.AddAutoMapper(typeof(HotelProfile));

        // Configuração dos Repositories
        builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
        builder.Services.AddScoped<IHotelRepository, HotelRepository>();
        builder.Services.AddScoped<IUserRepository, UserRepository>();
        builder.Services.AddScoped<IReservationRepository, ReservationRepository>();
        builder.Services.AddScoped<IRoomRepository, RoomRepository>();
        builder.Services.AddScoped<ITravellerRepository, TravellerRepository>();
        builder.Services.AddScoped<IPasswordResetTokenRepository, PasswordResetTokenRepository>();
        builder.Services.AddScoped<IPromotionRepository, PromotionRepository>();
        builder.Services.AddScoped<IRoomsPromotionalRepository, RoomsPromotionRepository>();
        builder.Services.AddScoped<IReviewRepository, ReviewRepository>();

        // Configuração dos Services (apenas os que têm interface e existem)
        builder.Services.AddScoped<IHotelService, HotelService>();
        builder.Services.AddScoped<IReservationService, ReservationService>();
        builder.Services.AddScoped<IUserService, UserService>();
        builder.Services.AddScoped<IReviewService, ReviewService>();
        builder.Services.AddScoped<IDashboardService, DashboardService>();
        builder.Services.AddScoped<IHotelMappingService, HotelMappingService>();

        // Services sem interface (registrados diretamente)
        builder.Services.AddScoped<AuthService>();
        builder.Services.AddHttpContextAccessor();

        // Configuração do Stripe
        builder.Services.Configure<StripeModel>(builder.Configuration.GetSection("Stripe"));

        // Configuração do SMTP
        builder.Services.Configure<SmtpOptions>(builder.Configuration.GetSection("Smtp"));

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (!app.Environment.IsDevelopment())
        {
            app.UseExceptionHandler("/Home/Error");
            app.UseHsts();
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles();

        app.UseRouting();

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllerRoute(
            name: "default",
            pattern: "{controller=Home}/{action=Index}/{id?}");

        app.MapControllers();

        return app;
    }
} 