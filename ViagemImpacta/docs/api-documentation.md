# API Documentation - ViagemImpacta

## 📋 Visão Geral

A API do ViagemImpacta fornece endpoints RESTful para busca e gerenciamento de hotéis. A API é construída com ASP.NET Core 8.0 e segue as melhores práticas de design de APIs.

## 🔗 Base URL

```
Development: https://localhost:7001
Production: https://api.viagemimpacta.com
```

## 🔐 Autenticação

A API utiliza JWT Bearer Token para autenticação:

```
Authorization: Bearer <token>
```

## 📊 Endpoints

### 1. Busca de Hotéis

#### GET /api/hotels/search

Busca hotéis com base nos filtros fornecidos.

**Parâmetros de Query:**

| Parâmetro     | Tipo    | Obrigatório | Descrição                              |
| ------------- | ------- | ----------- | -------------------------------------- |
| `destination` | string  | Não         | Cidade ou região de destino            |
| `guests`      | integer | Não         | Número de hóspedes                     |
| `minPrice`    | decimal | Não         | Preço mínimo por noite                 |
| `maxPrice`    | decimal | Não         | Preço máximo por noite                 |
| `stars`       | integer | Não         | Classificação do hotel (1-5)           |
| `roomType`    | string  | Não         | Tipo de quarto (Suite, Standard, Luxo) |
| `amenities`   | string  | Não         | Amenities separadas por vírgula        |
| `checkIn`     | string  | Não         | Data de check-in (YYYY-MM-DD)          |
| `checkOut`    | string  | Não         | Data de check-out (YYYY-MM-DD)         |

**Exemplo de Request:**

```http
GET /api/hotels/search?destination=Rio%20de%20Janeiro&guests=2&minPrice=200&maxPrice=500&stars=4&amenities=wifi,pool&checkIn=2025-08-10&checkOut=2025-08-15
```

**Response (200 OK):**

```json
[
  {
    "hotelId": 1,
    "name": "Hotel Copacabana Palace",
    "description": "Hotel luxuoso na praia de Copacabana",
    "city": "Rio de Janeiro",
    "stars": 5,
    "wifi": true,
    "parking": true,
    "gym": true,
    "restaurant": true,
    "bar": true,
    "pool": true,
    "roomService": true,
    "accessibility": false,
    "petFriendly": false,
    "breakfastIncludes": true,
    "rating": 4.8,
    "imageUrls": ["https://example.com/hotel1.jpg"],
    "rooms": [
      {
        "roomId": 1,
        "typeName": "Suite",
        "totalRooms": 10,
        "capacity": 2,
        "averageDailyPrice": 300.0,
        "description": "Suite com vista para o mar"
      }
    ]
  }
]
```

**Response (400 Bad Request):**

```json
{
  "message": "Parâmetros de busca inválidos",
  "errors": [
    "Preço mínimo não pode ser negativo: -100",
    "Estrelas devem estar entre 1 e 5: 6"
  ]
}
```

### 2. Listar Todos os Hotéis

#### GET /api/hotels

Retorna todos os hotéis disponíveis.

**Response (200 OK):**

```json
[
  {
    "hotelId": 1,
    "name": "Hotel Copacabana Palace",
    "description": "Hotel luxuoso na praia de Copacabana",
    "city": "Rio de Janeiro",
    "stars": 5,
    "rating": 4.8,
    "imageUrls": ["https://example.com/hotel1.jpg"]
  }
]
```

### 3. Buscar Hotel por ID

#### GET /api/hotels/{id}

Retorna detalhes de um hotel específico.

**Parâmetros:**

- `id` (integer, obrigatório): ID do hotel

**Response (200 OK):**

```json
{
  "hotelId": 1,
  "name": "Hotel Copacabana Palace",
  "description": "Hotel luxuoso na praia de Copacabana",
  "city": "Rio de Janeiro",
  "stars": 5,
  "wifi": true,
  "parking": true,
  "gym": true,
  "restaurant": true,
  "bar": true,
  "pool": true,
  "roomService": true,
  "accessibility": false,
  "petFriendly": false,
  "breakfastIncludes": true,
  "rating": 4.8,
  "imageUrls": ["https://example.com/hotel1.jpg"],
  "rooms": [
    {
      "roomId": 1,
      "typeName": "Suite",
      "totalRooms": 10,
      "capacity": 2,
      "averageDailyPrice": 300.0,
      "description": "Suite com vista para o mar"
    }
  ]
}
```

**Response (404 Not Found):**

```json
{
  "message": "Hotel com ID 999 não encontrado"
}
```

## 🔧 Amenities Suportadas

### Amenities Básicas

- `wifi` / `WiFi` - WiFi disponível
- `parking` / `estacionamento` - Estacionamento disponível
- `gym` / `academia` - Academia disponível

### Amenities de Alimentação

- `restaurant` / `restaurante` - Restaurante disponível
- `bar` - Bar disponível
- `breakfastIncludes` / `café da manhã incluso` / `cafe da manha incluso` - Café da manhã incluso

### Amenities de Lazer

- `pool` / `piscina` - Piscina disponível
- `warmPool` / `piscina aquecida` - Piscina aquecida disponível
- `theater` / `sala de cinema` - Sala de cinema disponível
- `garden` / `jardim amplo` - Jardim amplo disponível

### Amenities de Serviço

- `roomService` / `serviço de quarto` / `servico de quarto` - Serviço de quarto disponível

### Amenities Especiais

- `accessibility` / `acessibilidade` - Acessibilidade disponível
- `petFriendly` / `aceita animais` - Aceita animais de estimação

## 🔒 Validações

### Regras de Validação

1. **Preços**

   - Não podem ser negativos
   - Preço mínimo não pode ser maior que preço máximo

2. **Estrelas**

   - Devem estar entre 1 e 5

3. **Hóspedes**

   - Devem ser maior que zero

4. **Datas**

   - Formato: YYYY-MM-DD
   - Check-out deve ser posterior ao check-in
   - Não podem ser datas passadas

5. **Amenities**
   - Case-insensitive
   - Suporte a nomes em português e inglês
   - Amenities inválidas são ignoradas

### Códigos de Erro

| Código | Descrição                |
| ------ | ------------------------ |
| 200    | Sucesso                  |
| 400    | Parâmetros inválidos     |
| 404    | Recurso não encontrado   |
| 500    | Erro interno do servidor |

## 📈 Rate Limiting

- **Limite**: 1000 requests por hora por IP
- **Headers**: `X-RateLimit-Remaining`, `X-RateLimit-Reset`

## 🔍 Exemplos de Uso

### Busca Simples por Destino

```http
GET /api/hotels/search?destination=São Paulo
```

### Busca com Filtros de Preço

```http
GET /api/hotels/search?minPrice=200&maxPrice=500
```

### Busca com Amenities

```http
GET /api/hotels/search?amenities=wifi,pool,restaurant
```

### Busca Completa

```http
GET /api/hotels/search?destination=Rio de Janeiro&guests=2&minPrice=300&maxPrice=800&stars=4&roomType=Suite&amenities=wifi,pool&checkIn=2025-08-10&checkOut=2025-08-15
```

## 🧪 Testes

### Endpoints de Teste

#### GET /api/debug/test-failfast

Endpoint para testar validações de parâmetros.

**Parâmetros:** Mesmos da busca de hotéis

**Exemplo:**

```http
GET /api/debug/test-failfast?destination=São Paulo&stars=4
```

## 📚 Swagger Documentation

A documentação interativa está disponível em:

```
Development: https://localhost:7001/swagger
Production: https://api.viagemimpacta.com/swagger
```

## 🔧 Configuração

### Environment Variables

```bash
# Database
ConnectionStrings__ViagemImpactConnection=Server=localhost;Database=ViagemImpacta;Trusted_Connection=true;

# JWT
JWT__Secret=your-secret-key-here
JWT__Issuer=viagemimpacta
JWT__Audience=viagemimpacta-users

# Logging
Logging__LogLevel__Default=Information
Logging__LogLevel__Microsoft.AspNetCore=Warning
```

## 📞 Suporte

- **Email**: api-support@viagemimpacta.com
- **Documentação**: https://docs.viagemimpacta.com/api
- **Status**: https://status.viagemimpacta.com

---

_Última atualização: Agosto 2025_
