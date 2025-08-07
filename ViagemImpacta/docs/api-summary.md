# API Documentation - Resumo

## 📋 Visão Geral

API RESTful para busca e gerenciamento de hotéis construída com ASP.NET Core 8.0.

## 🔗 Base URL

```
Development: https://localhost:7001
Production: https://api.viagemimpacta.com
```

## 📊 Endpoints Principais

### 1. Busca de Hotéis

#### GET /api/hotels/search

**Parâmetros:**

- `destination` - Cidade/região
- `guests` - Número de hóspedes
- `minPrice` / `maxPrice` - Faixa de preço
- `stars` - Classificação (1-5)
- `roomType` - Suite, Standard, Luxo
- `amenities` - WiFi, Pool, Restaurant, etc.
- `checkIn` / `checkOut` - Datas (YYYY-MM-DD)

**Exemplo:**

```http
GET /api/hotels/search?destination=Rio de Janeiro&guests=2&minPrice=200&maxPrice=500&stars=4&amenities=wifi,pool
```

### 2. Listar Todos os Hotéis

#### GET /api/hotels

Retorna todos os hotéis disponíveis.

### 3. Buscar Hotel por ID

#### GET /api/hotels/{id}

Retorna detalhes de um hotel específico.

## 🔧 Amenities Suportadas

### Básicas

- `wifi` / `WiFi` - WiFi disponível
- `parking` / `estacionamento` - Estacionamento
- `gym` / `academia` - Academia

### Alimentação

- `restaurant` / `restaurante` - Restaurante
- `bar` - Bar
- `breakfastIncludes` - Café da manhã incluso

### Lazer

- `pool` / `piscina` - Piscina
- `warmPool` / `piscina aquecida` - Piscina aquecida
- `theater` / `sala de cinema` - Sala de cinema
- `garden` / `jardim amplo` - Jardim

### Serviços

- `roomService` / `serviço de quarto` - Serviço de quarto

### Especiais

- `accessibility` / `acessibilidade` - Acessibilidade
- `petFriendly` / `aceita animais` - Aceita animais

## 🔒 Validações

### Regras

1. **Preços** - Não negativos, min ≤ max
2. **Estrelas** - Entre 1 e 5
3. **Hóspedes** - Maior que zero
4. **Datas** - Formato YYYY-MM-DD, check-out > check-in, não passadas
5. **Amenities** - Case-insensitive, suporte multilíngue

### Códigos de Erro

- **200** - Sucesso
- **400** - Parâmetros inválidos
- **404** - Recurso não encontrado
- **500** - Erro interno

## 🔍 Exemplos de Uso

### Busca Simples

```http
GET /api/hotels/search?destination=São Paulo
```

### Busca com Filtros

```http
GET /api/hotels/search?minPrice=200&maxPrice=500&stars=4
```

### Busca com Amenities

```http
GET /api/hotels/search?amenities=wifi,pool,restaurant
```

### Busca Completa

```http
GET /api/hotels/search?destination=Rio de Janeiro&guests=2&minPrice=300&maxPrice=800&stars=4&roomType=Suite&amenities=wifi,pool&checkIn=2025-08-10&checkOut=2025-08-15
```

## 📚 Swagger Documentation

```
Development: https://localhost:7001/swagger
Production: https://api.viagemimpacta.com/swagger
```

## 📞 Suporte

- **Email**: api-support@viagemimpacta.com
- **Documentação**: https://docs.viagemimpacta.com/api
- **Status**: https://status.viagemimpacta.com

---

_Última atualização: Agosto 2025_
