# Testes de Integração - Frontend Integration Tests

Este documento descreve os testes de integração implementados para a funcionalidade de busca de hotéis, incluindo filtros por amenities e outras opções de busca.

## Visão Geral

O arquivo `FrontendIntegrationTests.cs` contém 26 testes que cobrem:

- ✅ **10 testes básicos** (destino, datas, preço, hóspedes, estrelas)
- ✅ **8 testes de amenities** (WiFi, Pool, Restaurant, Bar, RoomService, Accessibility, BreakfastIncludes)
- ✅ **3 testes de tipos de quarto** (Suite, Standard, Luxo)
- ✅ **5 testes de casos especiais** (português, case-insensitive, vazios, inválidos, complexos)

## Testes Implementados

### Testes Básicos (1-10)

1. **SearchHotels_WithValidDestination_ShouldReturnHotels** - Busca por destino válido
2. **SearchHotels_WithValidDates_ShouldReturnHotels** - Busca com datas válidas
3. **SearchHotels_WithValidPrice_ShouldReturnHotels** - Busca com preço válido
4. **SearchHotels_WithValidGuests_ShouldReturnHotels** - Busca com hóspedes válidos
5. **SearchHotels_WithValidStars_ShouldReturnHotels** - Busca com estrelas válidas
6. **SearchHotels_WithInvalidDates_ShouldReturnBadRequest** - Datas inválidas (fail-fast)
7. **SearchHotels_WithInvalidPrice_ShouldReturnBadRequest** - Preço inválido (fail-fast)
8. **SearchHotels_WithInvalidGuests_ShouldReturnBadRequest** - Hóspedes inválidos (fail-fast)
9. **SearchHotels_WithInvalidStars_ShouldReturnBadRequest** - Estrelas inválidas (fail-fast)
10. **SearchHotels_WithPastDates_ShouldReturnBadRequest** - Datas passadas (fail-fast)

### Testes de Amenities (11-18)

11. **SearchHotels_WithWifiAmenity_ShouldReturnHotels** - Busca com WiFi
12. **SearchHotels_WithMultipleAmenities_ShouldReturnHotels** - Busca com múltiplas amenities
13. **SearchHotels_WithPoolAmenity_ShouldReturnHotels** - Busca com Pool
14. **SearchHotels_WithRestaurantAmenity_ShouldReturnHotels** - Busca com Restaurant
15. **SearchHotels_WithBarAmenity_ShouldReturnHotels** - Busca com Bar
16. **SearchHotels_WithRoomServiceAmenity_ShouldReturnHotels** - Busca com RoomService
17. **SearchHotels_WithAccessibilityAmenity_ShouldReturnHotels** - Busca com Accessibility
18. **SearchHotels_WithBreakfastAmenity_ShouldReturnHotels** - Busca com BreakfastIncludes

### Testes de Tipos de Quarto (19-21)

19. **SearchHotels_WithSuiteRoomType_ShouldReturnHotels** - Busca com Suite
20. **SearchHotels_WithStandardRoomType_ShouldReturnHotels** - Busca com Standard
21. **SearchHotels_WithLuxoRoomType_ShouldReturnHotels** - Busca com Luxo

### Testes de Casos Especiais (22-26)

22. **SearchHotels_WithPortugueseAmenities_ShouldReturnHotels** - Amenities em português
23. **SearchHotels_WithCaseInsensitiveAmenities_ShouldReturnHotels** - Case-insensitive
24. **SearchHotels_WithEmptyAmenities_ShouldReturnHotels** - Amenities vazias
25. **SearchHotels_WithInvalidAmenities_ShouldReturnHotels** - Amenities inválidas
26. **SearchHotels_WithComplexFilters_ShouldReturnHotels** - Combinação complexa de filtros

## Amenities Suportadas

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

## Tipos de Quarto Suportados

- `Suite` - Suítes
- `Standard` - Quartos padrão
- `Luxo` - Quartos de luxo

## Como Executar os Testes

### Executar Todos os Testes

```bash
dotnet test
```

### Executar Apenas os Testes de Frontend Integration

```bash
dotnet test --filter "FrontendIntegrationTests"
```

### Executar Testes Específicos

```bash
dotnet test --filter "SearchHotels_WithWifiAmenity"
```

## Estrutura dos Testes

Cada teste segue o padrão AAA (Arrange, Act, Assert):

1. **Arrange**: Configuração dos mocks e dados de teste
2. **Act**: Execução do método do controller
3. **Assert**: Verificação dos resultados esperados

## Validações Implementadas

### Validações de Parâmetros

- Preços negativos são rejeitados
- Estrelas devem estar entre 1 e 5
- Número de hóspedes deve ser maior que zero
- Datas de check-out devem ser posteriores ao check-in
- Datas passadas são rejeitadas

### Comportamentos Esperados

- Amenities inválidas são ignoradas
- Busca case-insensitive para amenities
- Suporte a nomes em português e inglês
- Múltiplas amenities são aplicadas com AND lógico
- Filtros vazios retornam todos os hotéis

## Cobertura de Testes

Os testes cobrem:

- ✅ Todos os amenities disponíveis
- ✅ Todos os tipos de quarto
- ✅ Filtros de preço (mínimo, máximo, exato)
- ✅ Filtros de estrelas
- ✅ Filtros de destino
- ✅ Filtros de capacidade
- ✅ Validações de datas
- ✅ Casos edge e cenários específicos
- ✅ Tratamento de erros
- ✅ Consistência de resultados

## Notas Importantes

1. **Mocks**: Os testes utilizam mocks para isolar o controller
2. **Banco In-Memory**: Utiliza Entity Framework In-Memory para testes
3. **Performance**: Os testes são otimizados para execução rápida
4. **Manutenibilidade**: Código limpo e bem documentado
5. **Extensibilidade**: Fácil adição de novos testes para novas funcionalidades

## Resultados dos Testes

✅ **26 testes passaram com sucesso**

- 10 testes básicos
- 8 testes de amenities
- 3 testes de tipos de quarto
- 5 testes de casos especiais

Todos os testes estão funcionando corretamente e cobrem os cenários principais da funcionalidade de busca de hotéis.
