# 📊 ANÁLISE DE REQUISITOS: COBERTURA DO BANCO DE DADOS vs SITE

## 🎯 RESUMO EXECUTIVO

Esta análise identifica lacunas entre as funcionalidades do site e a estrutura atual do banco de dados, especialmente para recursos de reserva, pagamento e conteúdo. O frontend possui muitas funcionalidades que dependem de dados mockados ou simulados, indicando a necessidade de expansão do schema do banco.

---

## 📋 ANÁLISE DO BANCO ATUAL

### ✅ TABELAS EXISTENTES (8 tabelas)

1. **Users** - Usuários completos ✅
2. **Hotels** - Hotéis com dados básicos ✅
3. **Rooms** - Quartos de hotéis ✅
4. **ReservationBooks** - Pacotes de viagem ✅
5. **ReservationBookHotels** - Relacionamento N:M ✅
6. **Reservations** - Reservas individuais ✅
7. **Payments** - Pagamentos básicos ✅
8. **Reviews** - Avaliações básicas ✅

### 🔧 ENUMS EXISTENTES

- **PaymentMethod** (PIX, Credit, Debit, Cash, BankTransfer)
- **ReviewStatus** (Pending, Approved, Rejected)
- **Roles** (Admin, Standard, Moderator)
- **RoomType** (Standard, Deluxe, Suite, Presidential)

---

## ❌ FUNCIONALIDADES SEM COBERTURA NO BANCO

### 🎨 1. BLOG E CONTEÚDO EDITORIAL

**Problema:** Todo conteúdo do blog é mockado no frontend

```javascript
// Dados mockados encontrados:
const blogPosts = [
  {
    id: 1,
    title: "10 Dicas Essenciais para Arrumar a Mala",
    author: "João Santos",
    publishedAt: "2025-01-12",
    readTime: "7 min",
    category: "Planejamento",
    fullContent: "<html>...",
    excerpt: "...",
  },
];
```

**Tabelas Faltantes:**

- `BlogPosts` (id, title, content, excerpt, author_id, category_id, published_at, read_time, featured_image)
- `BlogCategories` (id, name, slug, description)
- `BlogTags` (id, name, slug)
- `BlogPostTags` (post_id, tag_id)

### 📅 2. EVENTOS E AGENDA

**Problema:** Eventos estão hardcoded no frontend

```javascript
// Dados mockados:
const eventData = [
  {
    id: 201,
    title: "Natal Mágico na Serra Gaúcha",
    description: "...",
    imageUrl: "...",
    date: "24/12/2025",
  },
];
```

**Tabelas Faltantes:**

- `Events` (id, title, description, event_date, end_date, location, price, category, image_url, max_attendees, created_at)
- `EventCategories` (id, name, description)
- `EventBookings` (id, event_id, user_id, tickets_quantity, total_amount, booking_date, status)

### 🗓️ 3. DISPONIBILIDADE E CALENDÁRIO

**Problema:** Disponibilidade é simulada no frontend

```javascript
// Dados mockados:
const allReservationDates = [
  { promotionId: 18, date: "2025-12-24", status: "available" },
  { promotionId: 18, date: "2025-12-25", status: "booked" },
];
```

**Tabelas Faltantes:**

- `Availability` (id, resource_type, resource_id, date, status, max_capacity, booked_capacity)
- `BookingSlots` (id, availability_id, start_time, end_time, is_available)
- `SeasonalPricing` (id, resource_type, resource_id, start_date, end_date, price_modifier, is_active)

### 🎁 4. PROMOÇÕES E DESCONTOS

**Problema:** Promoções são hardcoded, sem sistema de cupons

```javascript
// Dados mockados:
const allPromotionalTravels = [
  {
    id: 13,
    title: "Carnaval Tripz Folia em Recife!",
    priceFrom: 2500.0,
    priceTo: 1999.0,
    packagePrices: { casal: 3800.0, solteiro: 1999.0 },
  },
];
```

**Tabelas Faltantes:**

- `Promotions` (id, title, description, discount_type, discount_value, start_date, end_date, code, usage_limit, current_usage)
- `PromotionRules` (id, promotion_id, rule_type, rule_value, operator)
- `Coupons` (id, code, promotion_id, user_id, used_at, is_active)
- `PackagePricing` (id, package_id, package_type, base_price, promotional_price, valid_from, valid_to)

### 📧 5. NEWSLETTER E MARKETING

**Problema:** Newsletter é apenas simulação no frontend

```javascript
// Funcionalidade mockada:
const handleSubscribe = async (email) => {
  // Simula uma chamada de API
  await new Promise((resolve) => setTimeout(resolve, 1500));
};
```

**Tabelas Faltantes:**

- `NewsletterSubscribers` (id, email, name, subscribed_at, is_active, preferences)
- `NewsletterCampaigns` (id, subject, content, sent_at, recipient_count, open_rate)
- `EmailTemplates` (id, name, subject, content, template_type, is_active)

### 💰 6. SISTEMA DE PAGAMENTO

**Problema:** Payment table é básica, falta detalhamento para Stripe

**Campos/Tabelas Faltantes:**

- `PaymentIntents` (id, stripe_intent_id, amount, currency, status, metadata)
- `PaymentMethods` (id, user_id, type, provider_id, is_default, expires_at)
- `PaymentHistory` (id, payment_id, status, timestamp, details)
- `Refunds` (id, payment_id, amount, reason, status, processed_at)
- Campos em `Payments`: stripe_payment_id, pix_qr_code, gateway_response, fees_amount

### 🌟 7. SISTEMA DE AVALIAÇÕES COMPLETO

**Problema:** Reviews básico, sem imagens/respostas

```javascript
// Frontend possui reviews mockadas com dados ricos:
const reviews = [
  {
    guestName: "Maria Silva",
    rating: 5,
    comment: "Experiência inesquecível!",
    // Faltam: images, admin_response, helpful_votes
  },
];
```

**Tabelas/Campos Faltantes:**

- `ReviewImages` (id, review_id, image_url, caption)
- `ReviewResponses` (id, review_id, admin_id, response_text, responded_at)
- `ReviewVotes` (id, review_id, user_id, is_helpful)
- Campos em `Reviews`: title, stay_date, room_type, images_count, helpful_votes

### 🗺️ 8. MAPAS E LOCALIZAÇÃO

**Problema:** Dados de mapa mockados, sem geocoding

```javascript
// Frontend usa coordenadas hardcoded
const hotelLocations = [
  { id: 1, lat: -22.9068, lng: -43.1729, name: "Hotel Rio" },
];
```

**Tabelas Faltantes:**

- `Locations` (id, name, address, city, state, country, latitude, longitude, postal_code)
- `PointsOfInterest` (id, name, category, location_id, distance_from_hotel, description)

### 👥 9. PERFIL DE USUÁRIO EXPANDIDO

**Problema:** User table básica, falta dados de preferências

```javascript
// Frontend tem funcionalidades como:
// - Viagens salvas, hotéis favoritos
// - Preferências de viagem, histórico
```

**Tabelas Faltantes:**

- `UserPreferences` (id, user_id, preference_type, preference_value)
- `UserFavorites` (id, user_id, resource_type, resource_id, created_at)
- `UserTravelHistory` (id, user_id, reservation_id, travel_date, rating_given)

### 📊 10. ANALYTICS E RELATÓRIOS

**Problema:** Dashboard admin sem dados reais

```html
<!-- Views/Admins/Dashboard.cshtml possui charts vazios -->
<canvas id="faturamentoPacoteChart"></canvas>
```

**Tabelas Faltantes:**

- `Analytics` (id, metric_name, metric_value, date, resource_type, resource_id)
- `SearchLogs` (id, user_id, search_terms, filters_used, results_count, timestamp)
- `PageViews` (id, page_url, user_id, session_id, timestamp, referrer)

---

## 🚀 RECOMENDAÇÕES PRIORITÁRIAS

### 🥇 PRIORIDADE ALTA (Implementar Primeiro)

1. **Sistema de Disponibilidade**

   ```sql
   CREATE TABLE Availability (
     id INT PRIMARY KEY IDENTITY,
     resource_type VARCHAR(50) NOT NULL, -- 'hotel', 'room', 'package'
     resource_id INT NOT NULL,
     date DATE NOT NULL,
     status VARCHAR(20) DEFAULT 'available', -- 'available', 'booked', 'blocked'
     max_capacity INT DEFAULT 1,
     booked_capacity INT DEFAULT 0,
     price_override DECIMAL(10,2) NULL,
     created_at DATETIME2 DEFAULT GETDATE(),
     INDEX IX_Availability_Resource (resource_type, resource_id, date)
   );
   ```

2. **Sistema de Promoções**

   ```sql
   CREATE TABLE Promotions (
     id INT PRIMARY KEY IDENTITY,
     title NVARCHAR(200) NOT NULL,
     description NTEXT,
     discount_type VARCHAR(20) NOT NULL, -- 'percentage', 'fixed', 'package'
     discount_value DECIMAL(10,2) NOT NULL,
     start_date DATE NOT NULL,
     end_date DATE NOT NULL,
     code VARCHAR(50) UNIQUE,
     usage_limit INT DEFAULT NULL,
     current_usage INT DEFAULT 0,
     is_active BIT DEFAULT 1,
     created_at DATETIME2 DEFAULT GETDATE()
   );
   ```

3. **Expansão do Sistema de Pagamento**
   ```sql
   ALTER TABLE Payments ADD (
     stripe_payment_id VARCHAR(100),
     pix_qr_code NTEXT,
     gateway_response NTEXT,
     fees_amount DECIMAL(10,2) DEFAULT 0,
     refund_amount DECIMAL(10,2) DEFAULT 0,
     metadata NTEXT
   );
   ```

### 🥈 PRIORIDADE MÉDIA (Segunda Fase)

4. **Blog e Conteúdo**
5. **Eventos e Agenda**
6. **Newsletter**
7. **Sistema de Reviews Completo**

### 🥉 PRIORIDADE BAIXA (Terceira Fase)

8. **Analytics Avançados**
9. **Mapas e POIs**
10. **Preferências de Usuário**

---

## 📈 IMPACTO DA IMPLEMENTAÇÃO

### 🎯 BENEFÍCIOS IMEDIATOS

- **Reservas Reais**: Substituir calendários mockados por dados reais
- **Promoções Dinâmicas**: Sistema de cupons e descontos funcionais
- **Pagamentos Robustos**: Integração completa Stripe/PIX
- **Disponibilidade Precisa**: Controle real de vagas e datas

### 📊 MÉTRICAS DE SUCESSO

- Redução de 90% do código mockado no frontend
- Sistema de reservas 100% funcional
- Integração de pagamento com taxa de sucesso >95%
- Dashboard admin com dados reais

### ⚡ CRONOGRAMA ESTIMADO

- **Fase 1 (Prioridade Alta)**: 4-6 semanas
- **Fase 2 (Prioridade Média)**: 6-8 semanas
- **Fase 3 (Prioridade Baixa)**: 4-6 semanas

**Total**: 14-20 semanas para implementação completa

---

## 🔄 MIGRAÇÃO E DADOS

### 📝 SCRIPT DE MIGRAÇÃO SUGERIDO

```sql
-- 1. Criar tabelas de alta prioridade
-- 2. Migrar dados mockados para tabelas reais
-- 3. Atualizar frontend para usar APIs reais
-- 4. Remover dados hardcoded gradualmente
```

### 🧪 ESTRATÉGIA DE TESTE

1. **Ambiente de Desenvolvimento**: Implementar tabelas e APIs
2. **Dados de Seed**: Converter mocks em dados de teste reais
3. **Testes de Integração**: Validar frontend + backend
4. **Migração Gradual**: Substituir mocks por APIs uma funcionalidade por vez
