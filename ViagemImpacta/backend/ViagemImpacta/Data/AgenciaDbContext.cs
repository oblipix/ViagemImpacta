using Microsoft.EntityFrameworkCore;
using ViagemImpacta.Models;

namespace ViagemImpacta.Data
{
    public class AgenciaDbContext : DbContext
    {
        public AgenciaDbContext(DbContextOptions<AgenciaDbContext> options) : base(options) { }

        public DbSet<Hotel> Hotels { get; set; } = null!;
        public DbSet<Room> Rooms { get; set; } = null!;
        public DbSet<Review> Reviews { get; set; } = null!;
        public DbSet<ReservationBook> ReservationBooks { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Reservation> Reservations { get; set; } = null!;
        public DbSet<Payment> Payments { get; set; } = null!;
        public DbSet<RoomType> RoomTypes { get; set; } = null!;
        public DbSet<Availability> Availabilities { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuração explícita da relação Many-to-Many
            // O EF Core cria uma tabela de junção "HotelReservationBook" automaticamente
           

            modelBuilder.Entity<ReservationBook>(entity =>
            {
                entity.HasKey(e => e.ReservationBookId);
                entity.Property(e => e.Title).HasMaxLength(200);
                entity.Property(e => e.Description).HasMaxLength(1000);
                entity.Property(e => e.Destination).HasMaxLength(100);
                entity.Property(e => e.FinalPrice).HasColumnType("decimal(18,2)");
            });

            // Hotel configuration
            modelBuilder.Entity<Hotel>(entity =>
            {
                entity.HasKey(e => e.HotelId);
                entity.Property(e => e.Name).HasMaxLength(200).IsRequired();
                entity.Property(e => e.HotelAddress).HasMaxLength(300);
                entity.Property(e => e.Phone).HasMaxLength(20);
            });

            // User configuration
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.UserId);
                entity.Property(e => e.Email).HasMaxLength(100).IsRequired();
                entity.Property(e => e.FirstName).HasMaxLength(50).IsRequired();
                entity.Property(e => e.LastName).HasMaxLength(50).IsRequired();
                entity.Property(e => e.Cpf).HasMaxLength(14);
                entity.Property(e => e.Phone).HasMaxLength(15);
            });

            // Seed Hotels data
            modelBuilder.Entity<Hotel>().HasData(
                new Hotel
                {
                    HotelId = 1,
                    Name = "Hotel Copacabana Palace",
                    Phone = "(21) 2548-7070",
                    HotelAddress = "Av. Atlântica, 1702 - Copacabana, Rio de Janeiro - RJ",
                    Image = "https://example.com/copacabana-palace.jpg",
                    City = "Rio de Janeiro",
                    Stars = 5,
                    Wifi = true,
                    Parking = true,
                    Gym = true,
                    Restaurant = true,
                    Bar = true,
                    RoomService = true,
                    Accessibility = true,
                    WarmPool = false,
                    Theater = false,
                    Garden = true,
                    PetFriendly = false,
                    Pool = true,
                    BreakfastIncludes = true
                },
                new Hotel
                {
                    HotelId = 2,
                    Name = "Fasano São Paulo",
                    Phone = "(11) 3896-4000",
                    HotelAddress = "Rua Vitório Fasano, 88 - Jardim Paulista, São Paulo - SP",
                    Image = "https://example.com/fasano-sp.jpg",
                    City = "São Paulo",
                    Stars = 5,
                    Wifi = true,
                    Parking = true,
                    Gym = true,
                    Restaurant = true,
                    Bar = true,
                    RoomService = true,
                    Accessibility = true,
                    WarmPool = false,
                    Theater = false,
                    Garden = false,
                    PetFriendly = true,
                    Pool = true,
                    BreakfastIncludes = true
                },
                new Hotel
                {
                    HotelId = 3,
                    Name = "Pousada Maravilha",
                    Phone = "(81) 3619-1453",
                    HotelAddress = "BR-363, s/n - Fernando de Noronha - PE",
                    Image = "https://example.com/pousada-maravilha.jpg",
                    City = "Fernando de Noronha",
                    Stars = 4,
                    Wifi = true,
                    Parking = false,
                    Gym = false,
                    Restaurant = true,
                    Bar = true,
                    RoomService = true,
                    Accessibility = false,
                    WarmPool = false,
                    Theater = false,
                    Garden = true,
                    PetFriendly = false,
                    Pool = true,
                    BreakfastIncludes = true
                },
                new Hotel
                {
                    HotelId = 4,
                    Name = "Hotel das Cataratas",
                    Phone = "(45) 2102-7000",
                    HotelAddress = "Parque Nacional do Iguaçu - Foz do Iguaçu - PR",
                    Image = "https://example.com/cataratas.jpg",
                    City = "Foz do Iguaçu",
                    Stars = 5,
                    Wifi = true,
                    Parking = true,
                    Gym = true,
                    Restaurant = true,
                    Bar = true,
                    RoomService = true,
                    Accessibility = true,
                    WarmPool = true,
                    Theater = false,
                    Garden = true,
                    PetFriendly = true,
                    Pool = true,
                    BreakfastIncludes = true
                },
                new Hotel
                {
                    HotelId = 5,
                    Name = "Vila Galé Salvador",
                    Phone = "(71) 2103-2000",
                    HotelAddress = "Rua da Passagem, 155 - Rio Vermelho, Salvador - BA",
                    Image = "https://example.com/vila-gale.jpg",
                    City = "Salvador",
                    Stars = 4,
                    Wifi = true,
                    Parking = true,
                    Gym = true,
                    Restaurant = true,
                    Bar = true,
                    RoomService = true,
                    Accessibility = true,
                    WarmPool = false,
                    Theater = false,
                    Garden = false,
                    PetFriendly = false,
                    Pool = true,
                    BreakfastIncludes = true
                },
                new Hotel
                {
                    HotelId = 6,
                    Name = "Hotel Unique",
                    Phone = "(11) 3055-4700",
                    HotelAddress = "Av. Brigadeiro Luís Antônio, 4700 - Jardim Paulista, São Paulo - SP",
                    Image = "https://example.com/unique.jpg",
                    City = "São Paulo",
                    Stars = 5,
                    Wifi = true,
                    Parking = true,
                    Gym = true,
                    Restaurant = true,
                    Bar = true,
                    RoomService = true,
                    Accessibility = true,
                    WarmPool = false,
                    Theater = false,
                    Garden = true,
                    PetFriendly = false,
                    Pool = true,
                    BreakfastIncludes = false
                }
            );

            // Seed ReservationBooks data
            modelBuilder.Entity<ReservationBook>().HasData(
                new ReservationBook
                {
                    ReservationBookId = 1,
                    Title = "Escapada Romântica no Rio",
                    Description = "Pacote completo com 3 dias no Hotel Copacabana Palace, incluindo café da manhã, spa e jantar no famoso restaurante do hotel.",
                    FinalPrice = 2500.00m,
                    Active = true,
                    Promotion = false,
                    CheckIn = new DateTime(2025, 2, 25),
                    CheckOut = new DateTime(2025, 2, 28),
                    CreatedAt = new DateTime(2025, 1, 25),
                    UpdatedAt = new DateTime(2025, 1, 25),
                    Destination = "Rio de Janeiro"
                },
                new ReservationBook
                {
                    ReservationBookId = 2,
                    Title = "Aventura em Noronha",
                    Description = "5 dias em Fernando de Noronha na Pousada Maravilha, com mergulho incluído e passeios pelas praias mais belas do Brasil.",
                    FinalPrice = 4200.00m,
                    Active = true,
                    Promotion = true,
                    CheckIn = new DateTime(2025, 3, 10),
                    CheckOut = new DateTime(2025, 3, 15),
                    CreatedAt = new DateTime(2025, 1, 25),
                    UpdatedAt = new DateTime(2025, 1, 25),
                    Destination = "Fernando de Noronha"
                },
                new ReservationBook
                {
                    ReservationBookId = 3,
                    Title = "Negócios e Lazer em SP",
                    Description = "4 dias no Fasano São Paulo, ideal para quem combina negócios com prazer. Inclui acesso ao spa e restaurante.",
                    FinalPrice = 3100.00m,
                    Active = true,
                    Promotion = false,
                    CheckIn = new DateTime(2025, 2, 10),
                    CheckOut = new DateTime(2025, 2, 14),
                    CreatedAt = new DateTime(2025, 1, 25),
                    UpdatedAt = new DateTime(2025, 1, 25),
                    Destination = "São Paulo"
                },
                new ReservationBook
                {
                    ReservationBookId = 4,
                    Title = "Cataratas do Iguaçu VIP",
                    Description = "3 dias no Hotel das Cataratas, único hotel dentro do Parque Nacional. Inclui todas as refeições e passeios.",
                    FinalPrice = 1800.00m,
                    Active = true,
                    Promotion = true,
                    CheckIn = new DateTime(2025, 3, 25),
                    CheckOut = new DateTime(2025, 3, 28),
                    CreatedAt = new DateTime(2025, 1, 25),
                    UpdatedAt = new DateTime(2025, 1, 25),
                    Destination = "Foz do Iguaçu"
                },
                new ReservationBook
                {
                    ReservationBookId = 5,
                    Title = "Salvador Cultural",
                    Description = "4 dias em Salvador no Vila Galé, com city tour pelo Pelourinho e apresentações de capoeira.",
                    FinalPrice = 1400.00m,
                    Active = true,
                    Promotion = false,
                    CheckIn = new DateTime(2025, 2, 20),
                    CheckOut = new DateTime(2025, 2, 24),
                    CreatedAt = new DateTime(2025, 1, 25),
                    UpdatedAt = new DateTime(2025, 1, 25),
                    Destination = "Salvador"
                },
                new ReservationBook
                {
                    ReservationBookId = 6,
                    Title = "Luxo em São Paulo",
                    Description = "2 dias no icônico Hotel Unique, com sua arquitetura diferenciada e vista panorâmica da cidade.",
                    FinalPrice = 2200.00m,
                    Active = true,
                    Promotion = true,
                    CheckIn = new DateTime(2025, 2, 15),
                    CheckOut = new DateTime(2025, 2, 17),
                    CreatedAt = new DateTime(2025, 1, 25),
                    UpdatedAt = new DateTime(2025, 1, 25),
                    Destination = "São Paulo"
                },
                new ReservationBook
                {
                    ReservationBookId = 7,
                    Title = "Tour Nordeste Completo",
                    Description = "Pacote de 7 dias visitando Salvador e Fernando de Noronha, com hospedagem em hotéis premium.",
                    FinalPrice = 5800.00m,
                    Active = true,
                    Promotion = false,
                    CheckIn = new DateTime(2025, 4, 20),
                    CheckOut = new DateTime(2025, 4, 27),
                    CreatedAt = new DateTime(2025, 1, 25),
                    UpdatedAt = new DateTime(2025, 1, 25),
                    Destination = "Salvador/Fernando de Noronha"
                }
            );

            // Para a relação many-to-many entre Hotel e ReservationBook, vamos configurar os dados na tabela de junção
            // Como é uma relação many-to-many sem entidade personalizada, usamos a configuração da tabela de junção
            modelBuilder.Entity<ReservationBook>()
                .HasMany(p => p.Hotels)
                .WithMany()
                .UsingEntity<Dictionary<string, object>>(
                    "ReservationBookHotels",
                    j => j
                        .HasOne<Hotel>()
                        .WithMany()
                        .HasForeignKey("HotelsHotelId")
                        .OnDelete(DeleteBehavior.Cascade),
                    j => j
                        .HasOne<ReservationBook>()
                        .WithMany()
                        .HasForeignKey("ReservationBookId")
                        .OnDelete(DeleteBehavior.Cascade),
                    j =>
                    {
                        j.HasKey("HotelsHotelId", "ReservationBookId");
                        j.HasData(
                            new { HotelsHotelId = 1, ReservationBookId = 1 }, // Copacabana Palace - Escapada Romântica
                            new { HotelsHotelId = 3, ReservationBookId = 2 }, // Pousada Maravilha - Aventura em Noronha
                            new { HotelsHotelId = 2, ReservationBookId = 3 }, // Fasano SP - Negócios e Lazer
                            new { HotelsHotelId = 4, ReservationBookId = 4 }, // Hotel das Cataratas - Cataratas VIP
                            new { HotelsHotelId = 5, ReservationBookId = 5 }, // Vila Galé - Salvador Cultural
                            new { HotelsHotelId = 6, ReservationBookId = 6 }, // Hotel Unique - Luxo em SP
                            new { HotelsHotelId = 5, ReservationBookId = 7 }, // Vila Galé - Tour Nordeste
                            new { HotelsHotelId = 3, ReservationBookId = 7 }  // Pousada Maravilha - Tour Nordeste
                        );
                    });
        }
    }
}
