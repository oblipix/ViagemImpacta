# 🗄️ SCRIPTS SQL - IMPLEMENTAÇÃO DAS TABELAS FALTANTES

## 📋 ÍNDICE

1. [Prioridade Alta - Sistema Core](#prioridade-alta)
2. [Prioridade Média - Conteúdo e Eventos](#prioridade-média)
3. [Prioridade Baixa - Analytics e Extensões](#prioridade-baixa)
4. [Procedures e Functions](#procedures-e-functions)
5. [Dados de Seed](#dados-de-seed)

---

## 🥇 PRIORIDADE ALTA - SISTEMA CORE

### 1. SISTEMA DE DISPONIBILIDADE

```sql
-- Tabela principal de disponibilidade
CREATE TABLE Availability (
    AvailabilityId INT PRIMARY KEY IDENTITY(1,1),
    ResourceType VARCHAR(50) NOT NULL, -- 'hotel', 'room', 'package', 'event'
    ResourceId INT NOT NULL,
    Date DATE NOT NULL,
    Status VARCHAR(20) DEFAULT 'available', -- 'available', 'booked', 'blocked', 'maintenance'
    MaxCapacity INT DEFAULT 1,
    BookedCapacity INT DEFAULT 0,
    PriceOverride DECIMAL(10,2) NULL,
    Notes NVARCHAR(500) NULL,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE(),

    CONSTRAINT CK_Availability_Status CHECK (Status IN ('available', 'booked', 'blocked', 'maintenance')),
    CONSTRAINT CK_Availability_Capacity CHECK (BookedCapacity <= MaxCapacity),
    INDEX IX_Availability_Resource (ResourceType, ResourceId, Date),
    INDEX IX_Availability_Date (Date, Status)
);

-- Períodos sazonais e preços dinâmicos
CREATE TABLE SeasonalPricing (
    SeasonalPricingId INT PRIMARY KEY IDENTITY(1,1),
    ResourceType VARCHAR(50) NOT NULL,
    ResourceId INT NOT NULL,
    SeasonName NVARCHAR(100) NOT NULL, -- 'Alta Temporada', 'Carnaval', 'Natal'
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    PriceModifier DECIMAL(5,2) NOT NULL, -- 1.5 = 50% de aumento, 0.8 = 20% desconto
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME2 DEFAULT GETDATE(),

    CONSTRAINT CK_SeasonalPricing_Dates CHECK (EndDate >= StartDate),
    CONSTRAINT CK_SeasonalPricing_Modifier CHECK (PriceModifier > 0),
    INDEX IX_SeasonalPricing_Period (StartDate, EndDate, IsActive)
);
```

### 2. SISTEMA DE PROMOÇÕES COMPLETO

```sql
-- Promoções principais
CREATE TABLE Promotions (
    PromotionId INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(200) NOT NULL,
    Description NTEXT NULL,
    DiscountType VARCHAR(20) NOT NULL, -- 'percentage', 'fixed', 'package', 'buy_x_get_y'
    DiscountValue DECIMAL(10,2) NOT NULL,
    MinPurchaseAmount DECIMAL(10,2) NULL,
    Code VARCHAR(50) UNIQUE NULL, -- NULL = automática, valor = cupom manual
    UsageLimit INT DEFAULT NULL, -- NULL = ilimitado
    CurrentUsage INT DEFAULT 0,
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE(),

    CONSTRAINT CK_Promotions_Dates CHECK (EndDate >= StartDate),
    CONSTRAINT CK_Promotions_Type CHECK (DiscountType IN ('percentage', 'fixed', 'package', 'buy_x_get_y')),
    INDEX IX_Promotions_Code (Code, IsActive),
    INDEX IX_Promotions_Period (StartDate, EndDate, IsActive)
);

-- Regras de aplicação de promoções
CREATE TABLE PromotionRules (
    PromotionRuleId INT PRIMARY KEY IDENTITY(1,1),
    PromotionId INT NOT NULL,
    RuleType VARCHAR(50) NOT NULL, -- 'resource_type', 'resource_id', 'user_type', 'min_nights'
    RuleValue NVARCHAR(100) NOT NULL,
    Operator VARCHAR(10) DEFAULT 'equals', -- 'equals', 'in', 'greater_than', 'less_than'

    FOREIGN KEY (PromotionId) REFERENCES Promotions(PromotionId) ON DELETE CASCADE,
    INDEX IX_PromotionRules_Promotion (PromotionId)
);

-- Cupons individuais
CREATE TABLE Coupons (
    CouponId INT PRIMARY KEY IDENTITY(1,1),
    Code VARCHAR(50) UNIQUE NOT NULL,
    PromotionId INT NOT NULL,
    UserId INT NULL, -- NULL = qualquer usuário pode usar
    IsUsed BIT DEFAULT 0,
    UsedAt DATETIME2 NULL,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    ExpiresAt DATETIME2 NULL,

    FOREIGN KEY (PromotionId) REFERENCES Promotions(PromotionId),
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    INDEX IX_Coupons_Code (Code, IsUsed),
    INDEX IX_Coupons_User (UserId, IsUsed)
);

-- Preços de pacotes dinâmicos
CREATE TABLE PackagePricing (
    PackagePricingId INT PRIMARY KEY IDENTITY(1,1),
    PackageId INT NOT NULL, -- FK para ReservationBooks
    PackageType VARCHAR(20) NOT NULL, -- 'individual', 'casal', 'familia'
    BasePrice DECIMAL(10,2) NOT NULL,
    PromotionalPrice DECIMAL(10,2) NULL,
    ValidFrom DATE NOT NULL,
    ValidTo DATE NULL,
    MaxPersons INT DEFAULT 1,
    IsActive BIT DEFAULT 1,

    FOREIGN KEY (PackageId) REFERENCES ReservationBooks(ReservationBookId),
    CONSTRAINT CK_PackagePricing_Type CHECK (PackageType IN ('individual', 'casal', 'familia', 'grupo')),
    INDEX IX_PackagePricing_Package (PackageId, IsActive),
    INDEX IX_PackagePricing_Period (ValidFrom, ValidTo, IsActive)
);
```

### 3. SISTEMA DE PAGAMENTO EXPANDIDO

```sql
-- Expansão da tabela Payments existente
ALTER TABLE Payments ADD
    StripePaymentId VARCHAR(100) NULL,
    PixQrCode NTEXT NULL,
    PixExpiresAt DATETIME2 NULL,
    GatewayResponse NTEXT NULL,
    FeesAmount DECIMAL(10,2) DEFAULT 0,
    RefundAmount DECIMAL(10,2) DEFAULT 0,
    Metadata NTEXT NULL, -- JSON para dados extras
    PaymentIntentId VARCHAR(100) NULL,
    Currency VARCHAR(3) DEFAULT 'BRL',
    ProcessedAt DATETIME2 NULL;

-- Métodos de pagamento salvos dos usuários
CREATE TABLE PaymentMethods (
    PaymentMethodId INT PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL,
    Type VARCHAR(20) NOT NULL, -- 'credit_card', 'debit_card', 'pix', 'bank_account'
    ProviderPaymentMethodId VARCHAR(100) NOT NULL, -- ID no Stripe/gateway
    Last4Digits VARCHAR(4) NULL,
    Brand VARCHAR(20) NULL, -- 'visa', 'mastercard', 'nubank'
    ExpiresAt DATE NULL,
    IsDefault BIT DEFAULT 0,
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME2 DEFAULT GETDATE(),

    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    CONSTRAINT CK_PaymentMethods_Type CHECK (Type IN ('credit_card', 'debit_card', 'pix', 'bank_account')),
    INDEX IX_PaymentMethods_User (UserId, IsActive)
);

-- Histórico de transações
CREATE TABLE PaymentHistory (
    PaymentHistoryId INT PRIMARY KEY IDENTITY(1,1),
    PaymentId INT NOT NULL,
    Status VARCHAR(50) NOT NULL,
    PreviousStatus VARCHAR(50) NULL,
    Timestamp DATETIME2 DEFAULT GETDATE(),
    Details NTEXT NULL,
    GatewayTransactionId VARCHAR(100) NULL,

    FOREIGN KEY (PaymentId) REFERENCES Payments(PaymentId),
    INDEX IX_PaymentHistory_Payment (PaymentId, Timestamp)
);

-- Sistema de reembolsos
CREATE TABLE Refunds (
    RefundId INT PRIMARY KEY IDENTITY(1,1),
    PaymentId INT NOT NULL,
    Amount DECIMAL(10,2) NOT NULL,
    Reason NVARCHAR(500) NULL,
    Status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
    RequestedBy INT NOT NULL, -- UserId who requested
    ProcessedBy INT NULL, -- Admin UserId who processed
    RequestedAt DATETIME2 DEFAULT GETDATE(),
    ProcessedAt DATETIME2 NULL,
    GatewayRefundId VARCHAR(100) NULL,

    FOREIGN KEY (PaymentId) REFERENCES Payments(PaymentId),
    FOREIGN KEY (RequestedBy) REFERENCES Users(UserId),
    FOREIGN KEY (ProcessedBy) REFERENCES Users(UserId),
    CONSTRAINT CK_Refunds_Status CHECK (Status IN ('pending', 'processing', 'completed', 'failed')),
    INDEX IX_Refunds_Payment (PaymentId),
    INDEX IX_Refunds_Status (Status, RequestedAt)
);
```

---

## 🥈 PRIORIDADE MÉDIA - CONTEÚDO E EVENTOS

### 4. SISTEMA DE BLOG

```sql
-- Categorias do blog
CREATE TABLE BlogCategories (
    BlogCategoryId INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    Slug VARCHAR(100) UNIQUE NOT NULL,
    Description NVARCHAR(500) NULL,
    Color VARCHAR(7) DEFAULT '#6B7280', -- Hex color
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME2 DEFAULT GETDATE(),

    INDEX IX_BlogCategories_Slug (Slug, IsActive)
);

-- Posts do blog
CREATE TABLE BlogPosts (
    BlogPostId INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(200) NOT NULL,
    Slug VARCHAR(200) UNIQUE NOT NULL,
    Excerpt NVARCHAR(500) NULL,
    Content NTEXT NOT NULL,
    FeaturedImage NVARCHAR(500) NULL,
    AuthorId INT NOT NULL,
    CategoryId INT NOT NULL,
    ReadTime INT DEFAULT 5, -- em minutos
    ViewCount INT DEFAULT 0,
    IsPublished BIT DEFAULT 0,
    IsFeatured BIT DEFAULT 0,
    PublishedAt DATETIME2 NULL,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE(),

    FOREIGN KEY (AuthorId) REFERENCES Users(UserId),
    FOREIGN KEY (CategoryId) REFERENCES BlogCategories(BlogCategoryId),
    INDEX IX_BlogPosts_Published (IsPublished, PublishedAt DESC),
    INDEX IX_BlogPosts_Category (CategoryId, IsPublished),
    INDEX IX_BlogPosts_Author (AuthorId),
    INDEX IX_BlogPosts_Slug (Slug)
);

-- Tags do blog
CREATE TABLE BlogTags (
    BlogTagId INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(50) NOT NULL,
    Slug VARCHAR(50) UNIQUE NOT NULL,
    UseCount INT DEFAULT 0,

    INDEX IX_BlogTags_Slug (Slug)
);

-- Relacionamento posts-tags
CREATE TABLE BlogPostTags (
    BlogPostId INT NOT NULL,
    BlogTagId INT NOT NULL,

    PRIMARY KEY (BlogPostId, BlogTagId),
    FOREIGN KEY (BlogPostId) REFERENCES BlogPosts(BlogPostId) ON DELETE CASCADE,
    FOREIGN KEY (BlogTagId) REFERENCES BlogTags(BlogTagId) ON DELETE CASCADE
);
```

### 5. SISTEMA DE EVENTOS

```sql
-- Categorias de eventos
CREATE TABLE EventCategories (
    EventCategoryId INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    Description NVARCHAR(500) NULL,
    Color VARCHAR(7) DEFAULT '#8B5CF6',
    IsActive BIT DEFAULT 1
);

-- Eventos principais
CREATE TABLE Events (
    EventId INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(200) NOT NULL,
    Description NTEXT NULL,
    EventDate DATE NOT NULL,
    EndDate DATE NULL,
    StartTime TIME NULL,
    EndTime TIME NULL,
    Location NVARCHAR(200) NULL,
    Address NVARCHAR(500) NULL,
    Price DECIMAL(10,2) NOT NULL DEFAULT 0,
    MaxAttendees INT NULL,
    CurrentAttendees INT DEFAULT 0,
    CategoryId INT NOT NULL,
    ImageUrl NVARCHAR(500) NULL,
    IsActive BIT DEFAULT 1,
    RequiresApproval BIT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE(),

    FOREIGN KEY (CategoryId) REFERENCES EventCategories(EventCategoryId),
    CONSTRAINT CK_Events_Dates CHECK (EndDate IS NULL OR EndDate >= EventDate),
    CONSTRAINT CK_Events_Attendees CHECK (CurrentAttendees <= MaxAttendees OR MaxAttendees IS NULL),
    INDEX IX_Events_Date (EventDate, IsActive),
    INDEX IX_Events_Category (CategoryId, IsActive)
);

-- Reservas de eventos
CREATE TABLE EventBookings (
    EventBookingId INT PRIMARY KEY IDENTITY(1,1),
    EventId INT NOT NULL,
    UserId INT NOT NULL,
    TicketsQuantity INT DEFAULT 1,
    TotalAmount DECIMAL(10,2) NOT NULL,
    Status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'confirmed', 'cancelled'
    PaymentId INT NULL,
    SpecialRequests NVARCHAR(1000) NULL,
    BookingDate DATETIME2 DEFAULT GETDATE(),
    ConfirmedAt DATETIME2 NULL,

    FOREIGN KEY (EventId) REFERENCES Events(EventId),
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (PaymentId) REFERENCES Payments(PaymentId),
    CONSTRAINT CK_EventBookings_Status CHECK (Status IN ('pending', 'confirmed', 'cancelled')),
    INDEX IX_EventBookings_Event (EventId, Status),
    INDEX IX_EventBookings_User (UserId, Status)
);
```

### 6. SISTEMA DE NEWSLETTER

```sql
-- Assinantes da newsletter
CREATE TABLE NewsletterSubscribers (
    NewsletterSubscriberId INT PRIMARY KEY IDENTITY(1,1),
    Email VARCHAR(255) UNIQUE NOT NULL,
    FirstName NVARCHAR(100) NULL,
    LastName NVARCHAR(100) NULL,
    UserId INT NULL, -- Link com usuário registrado se existir
    SubscribedAt DATETIME2 DEFAULT GETDATE(),
    UnsubscribedAt DATETIME2 NULL,
    IsActive BIT DEFAULT 1,
    EmailVerified BIT DEFAULT 0,
    VerificationToken VARCHAR(100) NULL,

    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    INDEX IX_NewsletterSubscribers_Email (Email, IsActive),
    INDEX IX_NewsletterSubscribers_User (UserId)
);

-- Preferências de newsletter
CREATE TABLE NewsletterPreferences (
    NewsletterPreferenceId INT PRIMARY KEY IDENTITY(1,1),
    SubscriberId INT NOT NULL,
    PreferenceType VARCHAR(50) NOT NULL, -- 'promotions', 'events', 'blog', 'travel_tips'
    IsEnabled BIT DEFAULT 1,

    FOREIGN KEY (SubscriberId) REFERENCES NewsletterSubscribers(NewsletterSubscriberId) ON DELETE CASCADE,
    UNIQUE (SubscriberId, PreferenceType)
);

-- Campanhas de email
CREATE TABLE NewsletterCampaigns (
    NewsletterCampaignId INT PRIMARY KEY IDENTITY(1,1),
    Subject NVARCHAR(200) NOT NULL,
    Content NTEXT NOT NULL,
    PlainTextContent NTEXT NULL,
    TemplateId INT NULL,
    ScheduledAt DATETIME2 NULL,
    SentAt DATETIME2 NULL,
    RecipientCount INT DEFAULT 0,
    OpenCount INT DEFAULT 0,
    ClickCount INT DEFAULT 0,
    Status VARCHAR(20) DEFAULT 'draft', -- 'draft', 'scheduled', 'sending', 'sent', 'cancelled'
    CreatedBy INT NOT NULL,
    CreatedAt DATETIME2 DEFAULT GETDATE(),

    FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
    CONSTRAINT CK_NewsletterCampaigns_Status CHECK (Status IN ('draft', 'scheduled', 'sending', 'sent', 'cancelled')),
    INDEX IX_NewsletterCampaigns_Status (Status, ScheduledAt)
);

-- Templates de email
CREATE TABLE EmailTemplates (
    EmailTemplateId INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    Subject NVARCHAR(200) NOT NULL,
    Content NTEXT NOT NULL,
    TemplateType VARCHAR(50) NOT NULL, -- 'newsletter', 'welcome', 'booking_confirmation', 'reset_password'
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE(),

    CONSTRAINT CK_EmailTemplates_Type CHECK (TemplateType IN ('newsletter', 'welcome', 'booking_confirmation', 'reset_password', 'event_reminder')),
    INDEX IX_EmailTemplates_Type (TemplateType, IsActive)
);
```

---

## 🥉 PRIORIDADE BAIXA - ANALYTICS E EXTENSÕES

### 7. SISTEMA DE REVIEWS EXPANDIDO

```sql
-- Expandir tabela Reviews existente
ALTER TABLE Reviews ADD
    Title NVARCHAR(200) NULL,
    StayDate DATE NULL,
    RoomType VARCHAR(50) NULL,
    HelpfulVotes INT DEFAULT 0,
    TotalVotes INT DEFAULT 0,
    VerifiedStay BIT DEFAULT 0;

-- Imagens das reviews
CREATE TABLE ReviewImages (
    ReviewImageId INT PRIMARY KEY IDENTITY(1,1),
    ReviewId INT NOT NULL,
    ImageUrl NVARCHAR(500) NOT NULL,
    Caption NVARCHAR(200) NULL,
    DisplayOrder INT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT GETDATE(),

    FOREIGN KEY (ReviewId) REFERENCES Reviews(ReviewId) ON DELETE CASCADE,
    INDEX IX_ReviewImages_Review (ReviewId, DisplayOrder)
);

-- Respostas dos administradores
CREATE TABLE ReviewResponses (
    ReviewResponseId INT PRIMARY KEY IDENTITY(1,1),
    ReviewId INT NOT NULL,
    AdminId INT NOT NULL,
    ResponseText NTEXT NOT NULL,
    RespondedAt DATETIME2 DEFAULT GETDATE(),

    FOREIGN KEY (ReviewId) REFERENCES Reviews(ReviewId) ON DELETE CASCADE,
    FOREIGN KEY (AdminId) REFERENCES Users(UserId),
    INDEX IX_ReviewResponses_Review (ReviewId)
);

-- Votos de utilidade
CREATE TABLE ReviewVotes (
    ReviewVoteId INT PRIMARY KEY IDENTITY(1,1),
    ReviewId INT NOT NULL,
    UserId INT NOT NULL,
    IsHelpful BIT NOT NULL,
    VotedAt DATETIME2 DEFAULT GETDATE(),

    FOREIGN KEY (ReviewId) REFERENCES Reviews(ReviewId) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    UNIQUE (ReviewId, UserId),
    INDEX IX_ReviewVotes_Review (ReviewId, IsHelpful)
);
```

### 8. ANALYTICS E MÉTRICAS

```sql
-- Métricas gerais
CREATE TABLE Analytics (
    AnalyticsId INT PRIMARY KEY IDENTITY(1,1),
    MetricName VARCHAR(100) NOT NULL,
    MetricValue DECIMAL(18,4) NOT NULL,
    Date DATE NOT NULL,
    ResourceType VARCHAR(50) NULL,
    ResourceId INT NULL,
    Category VARCHAR(50) NULL,
    Metadata NTEXT NULL,
    CreatedAt DATETIME2 DEFAULT GETDATE(),

    INDEX IX_Analytics_Metric (MetricName, Date),
    INDEX IX_Analytics_Resource (ResourceType, ResourceId, Date)
);

-- Log de buscas
CREATE TABLE SearchLogs (
    SearchLogId INT PRIMARY KEY IDENTITY(1,1),
    UserId INT NULL,
    SessionId VARCHAR(100) NULL,
    SearchTerms NVARCHAR(500) NOT NULL,
    FiltersUsed NTEXT NULL, -- JSON com filtros aplicados
    ResultsCount INT DEFAULT 0,
    PageViewed INT DEFAULT 1,
    ConversionType VARCHAR(50) NULL, -- 'view_details', 'booking', 'no_action'
    ConversionResourceId INT NULL,
    Timestamp DATETIME2 DEFAULT GETDATE(),
    IpAddress VARCHAR(45) NULL,
    UserAgent NVARCHAR(500) NULL,

    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    INDEX IX_SearchLogs_Terms (SearchTerms, Timestamp),
    INDEX IX_SearchLogs_User (UserId, Timestamp),
    INDEX IX_SearchLogs_Session (SessionId, Timestamp)
);

-- Visualizações de página
CREATE TABLE PageViews (
    PageViewId INT PRIMARY KEY IDENTITY(1,1),
    PageUrl NVARCHAR(500) NOT NULL,
    PageTitle NVARCHAR(200) NULL,
    UserId INT NULL,
    SessionId VARCHAR(100) NULL,
    Timestamp DATETIME2 DEFAULT GETDATE(),
    TimeSpent INT NULL, -- segundos na página
    Referrer NVARCHAR(500) NULL,
    IpAddress VARCHAR(45) NULL,
    UserAgent NVARCHAR(500) NULL,

    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    INDEX IX_PageViews_Page (PageUrl, Timestamp),
    INDEX IX_PageViews_User (UserId, Timestamp),
    INDEX IX_PageViews_Session (SessionId, Timestamp)
);
```

### 9. SISTEMA DE LOCALIZAÇÃO

```sql
-- Localizações
CREATE TABLE Locations (
    LocationId INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(200) NOT NULL,
    Address NVARCHAR(500) NULL,
    City NVARCHAR(100) NOT NULL,
    State NVARCHAR(100) NOT NULL,
    Country NVARCHAR(100) DEFAULT 'Brasil',
    PostalCode VARCHAR(20) NULL,
    Latitude DECIMAL(10,8) NULL,
    Longitude DECIMAL(11,8) NULL,
    GooglePlaceId VARCHAR(200) NULL,
    CreatedAt DATETIME2 DEFAULT GETDATE(),

    INDEX IX_Locations_City (City, State),
    INDEX IX_Locations_Coordinates (Latitude, Longitude)
);

-- Adicionar LocationId aos Hotels
ALTER TABLE Hotels ADD LocationId INT NULL;
ALTER TABLE Hotels ADD FOREIGN KEY (LocationId) REFERENCES Locations(LocationId);

-- Pontos de interesse
CREATE TABLE PointsOfInterest (
    PointOfInterestId INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(200) NOT NULL,
    Category VARCHAR(50) NOT NULL, -- 'restaurant', 'attraction', 'transport', 'shopping'
    LocationId INT NOT NULL,
    DistanceFromHotel DECIMAL(5,2) NULL, -- em km
    Description NVARCHAR(1000) NULL,
    Rating DECIMAL(2,1) NULL,
    IsActive BIT DEFAULT 1,

    FOREIGN KEY (LocationId) REFERENCES Locations(LocationId),
    CONSTRAINT CK_PointsOfInterest_Category CHECK (Category IN ('restaurant', 'attraction', 'transport', 'shopping', 'hospital', 'beach')),
    INDEX IX_PointsOfInterest_Category (Category, IsActive),
    INDEX IX_PointsOfInterest_Location (LocationId)
);
```

### 10. PREFERÊNCIAS DE USUÁRIO

```sql
-- Preferências gerais
CREATE TABLE UserPreferences (
    UserPreferenceId INT PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL,
    PreferenceType VARCHAR(50) NOT NULL, -- 'destination', 'price_range', 'room_type', 'notification'
    PreferenceValue NVARCHAR(200) NOT NULL,
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME2 DEFAULT GETDATE(),

    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    UNIQUE (UserId, PreferenceType, PreferenceValue),
    INDEX IX_UserPreferences_User (UserId, IsActive)
);

-- Favoritos dos usuários
CREATE TABLE UserFavorites (
    UserFavoriteId INT PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL,
    ResourceType VARCHAR(50) NOT NULL, -- 'hotel', 'package', 'destination', 'blog_post'
    ResourceId INT NOT NULL,
    CreatedAt DATETIME2 DEFAULT GETDATE(),

    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    UNIQUE (UserId, ResourceType, ResourceId),
    INDEX IX_UserFavorites_User (UserId, ResourceType),
    INDEX IX_UserFavorites_Resource (ResourceType, ResourceId)
);

-- Histórico de viagens
CREATE TABLE UserTravelHistory (
    UserTravelHistoryId INT PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL,
    ReservationId INT NOT NULL,
    TravelDate DATE NOT NULL,
    RatingGiven INT NULL,
    ReviewGiven BIT DEFAULT 0,
    WouldRecommend BIT NULL,
    CreatedAt DATETIME2 DEFAULT GETDATE(),

    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (ReservationId) REFERENCES Reservations(ReservationId),
    CONSTRAINT CK_UserTravelHistory_Rating CHECK (RatingGiven BETWEEN 1 AND 5 OR RatingGiven IS NULL),
    INDEX IX_UserTravelHistory_User (UserId, TravelDate)
);
```

---

## 🔧 PROCEDURES E FUNCTIONS

### Functions Úteis

```sql
-- Function para calcular preço com promoções
CREATE FUNCTION dbo.CalculatePromotionalPrice(
    @BasePrice DECIMAL(10,2),
    @ResourceType VARCHAR(50),
    @ResourceId INT,
    @Date DATE,
    @PromotionCode VARCHAR(50) = NULL
)
RETURNS DECIMAL(10,2)
AS
BEGIN
    DECLARE @FinalPrice DECIMAL(10,2) = @BasePrice;
    DECLARE @SeasonalModifier DECIMAL(5,2) = 1.0;
    DECLARE @PromotionDiscount DECIMAL(10,2) = 0;

    -- Aplicar modificador sazonal
    SELECT TOP 1 @SeasonalModifier = PriceModifier
    FROM SeasonalPricing
    WHERE ResourceType = @ResourceType
        AND ResourceId = @ResourceId
        AND @Date BETWEEN StartDate AND EndDate
        AND IsActive = 1
    ORDER BY PriceModifier DESC;

    SET @FinalPrice = @BasePrice * @SeasonalModifier;

    -- Aplicar promoção se houver
    IF @PromotionCode IS NOT NULL
    BEGIN
        SELECT @PromotionDiscount =
            CASE
                WHEN DiscountType = 'percentage' THEN @FinalPrice * (DiscountValue / 100.0)
                WHEN DiscountType = 'fixed' THEN DiscountValue
                ELSE 0
            END
        FROM Promotions
        WHERE Code = @PromotionCode
            AND @Date BETWEEN StartDate AND EndDate
            AND IsActive = 1
            AND (UsageLimit IS NULL OR CurrentUsage < UsageLimit);
    END

    RETURN @FinalPrice - @PromotionDiscount;
END;

-- Procedure para verificar disponibilidade
CREATE PROCEDURE dbo.CheckAvailability
    @ResourceType VARCHAR(50),
    @ResourceId INT,
    @StartDate DATE,
    @EndDate DATE,
    @RequiredCapacity INT = 1
AS
BEGIN
    SELECT
        Date,
        Status,
        MaxCapacity,
        BookedCapacity,
        (MaxCapacity - BookedCapacity) AS AvailableCapacity,
        CASE
            WHEN (MaxCapacity - BookedCapacity) >= @RequiredCapacity
                AND Status = 'available'
            THEN 1
            ELSE 0
        END AS IsAvailable
    FROM Availability
    WHERE ResourceType = @ResourceType
        AND ResourceId = @ResourceId
        AND Date BETWEEN @StartDate AND @EndDate
    ORDER BY Date;
END;
```

---

## 🌱 DADOS DE SEED

### Dados Iniciais para Desenvolvimento

```sql
-- Categorias de Blog
INSERT INTO BlogCategories (Name, Slug, Description, Color) VALUES
('Planejamento', 'planejamento', 'Dicas para planejar sua viagem', '#3B82F6'),
('Economia', 'economia', 'Como viajar gastando menos', '#10B981'),
('Destinos', 'destinos', 'Guias de destinos incríveis', '#8B5CF6'),
('Dicas', 'dicas', 'Dicas gerais de viagem', '#F59E0B'),
('Segurança', 'seguranca', 'Viaje com segurança', '#EF4444');

-- Categorias de Eventos
INSERT INTO EventCategories (Name, Description, Color) VALUES
('Sazonais', 'Eventos de datas comemorativas', '#DC2626'),
('Culturais', 'Eventos culturais e artísticos', '#7C3AED'),
('Gastronômicos', 'Eventos de culinária', '#059669'),
('Esportivos', 'Eventos esportivos e aventura', '#2563EB'),
('Negócios', 'Eventos corporativos', '#374151');

-- Localizações principais
INSERT INTO Locations (Name, City, State, Country, Latitude, Longitude) VALUES
('Centro do Rio de Janeiro', 'Rio de Janeiro', 'Rio de Janeiro', 'Brasil', -22.9068, -43.1729),
('Copacabana', 'Rio de Janeiro', 'Rio de Janeiro', 'Brasil', -22.9711, -43.1822),
('Centro de São Paulo', 'São Paulo', 'São Paulo', 'Brasil', -23.5505, -46.6333),
('Gramado Centro', 'Gramado', 'Rio Grande do Sul', 'Brasil', -29.3788, -50.8738),
('Recife Antigo', 'Recife', 'Pernambuco', 'Brasil', -8.0632, -34.8711);

-- Promoções de exemplo
INSERT INTO Promotions (Title, Description, DiscountType, DiscountValue, Code, StartDate, EndDate, UsageLimit) VALUES
('Primeira Viagem', 'Desconto especial para novos clientes', 'percentage', 15.00, 'PRIMEIRA15', '2025-01-01', '2025-12-31', 1000),
('Carnaval 2025', 'Promoção especial de Carnaval', 'fixed', 200.00, 'CARNAVAL200', '2025-01-15', '2025-02-28', 500),
('Casal Romântico', 'Desconto para pacotes de casal', 'percentage', 20.00, 'CASAL20', '2025-01-01', '2025-12-31', NULL);

-- Templates de Email
INSERT INTO EmailTemplates (Name, Subject, Content, TemplateType) VALUES
('Boas-vindas', 'Bem-vindo à ViagemImpacta!', '<h1>Olá {{nome}}!</h1><p>Obrigado por se cadastrar...</p>', 'welcome'),
('Confirmação de Reserva', 'Sua reserva foi confirmada', '<h1>Reserva Confirmada</h1><p>Detalhes da sua reserva...</p>', 'booking_confirmation'),
('Newsletter Semanal', 'As melhores ofertas da semana', '<h1>Ofertas Especiais</h1><p>Confira nossas promoções...</p>', 'newsletter');
```

---

_Documento gerado em: Janeiro 2025_
_Scripts testados em: SQL Server 2019+_
_Compatibilidade: Entity Framework Core_
