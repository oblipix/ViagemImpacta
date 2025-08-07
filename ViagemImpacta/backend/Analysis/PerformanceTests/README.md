# 🚀 Performance Tests - Viagem Impacta

Teste de performance para simular **500 usuários simultâneos** usando a API de busca por **2 minutos**.

## ⚡ Como Executar

### Pré-requisitos

1. **Backend rodando** em `http://localhost:5155`
   ```bash
   cd backend/ViagemImpacta
   dotnet run
   ```

### Execução Simples

```bash
# Opção 1: Script automático (Windows)
run-test.bat

# Opção 2: Manual
dotnet run
```

## ⚙️ Configuração

Edite `appsettings.json` para customizar:

```json
{
  "PerformanceTest": {
    "BaseUrl": "http://localhost:5155",
    "ConcurrentUsers": 500, // Usuários simultâneos
    "TestDurationMinutes": 2, // Duração do teste
    "WarmUpRequests": 20, // Requests de aquecimento
    "OverloadRequests": 1000, // Requests de sobrecarga
    "UserDelayMinMs": 100, // Delay mínimo entre requests
    "UserDelayMaxMs": 500, // Delay máximo entre requests
    "RequestTimeoutSeconds": 60 // Timeout por request
  }
}
```

## 📊 Fases do Teste

1. **🌱 SEEDING**: Popula banco com 20 hotéis de teste
2. **🔥 AQUECIMENTO**: 20 requests sequenciais para "esquentar" a API
3. **💥 CARGA**: 500 usuários simultâneos por 2 minutos
4. **🚨 SOBRECARGA**: 1000 requests simultâneos para testar limites
5. **🎯 BUSCAS COMPLEXAS**: Teste específico com filtros avançados
6. **🧹 CLEANUP**: Remove dados de teste do banco

## 🌱 Seeder Temporário

O teste inclui um **seeder automático** que:

### ✅ **Cria 20 Hotéis de Teste:**

- **Rio de Janeiro**: Copacabana Palace (5⭐), Ipanema Beach (4⭐), Leblon Luxury (5⭐)
- **São Paulo**: São Paulo Center (4⭐), Paulista Business (3⭐), Jardins Premium (5⭐)
- **Brasília**: Brasília Palace (4⭐), Asa Norte (3⭐), Plano Piloto (5⭐)
- **Salvador**: Salvador Beach (4⭐), Pelourinho (3⭐)
- **Fortaleza**: Fortaleza Ocean (4⭐), Beira Mar (3⭐)
- **Recife**: Recife Antigo (4⭐), Boa Viagem (3⭐)
- **Belo Horizonte**: BH Center (4⭐), Savassi (3⭐)
- **Curitiba**: Curitiba Business (4⭐), Batel (3⭐)
- **Porto Alegre**: POA Center (4⭐)

### 🏊 **Amenities Incluídas:**

- **WiFi**: Todos os hotéis
- **Pool**: Hotéis 4-5 estrelas
- **Restaurant**: Hotéis 3-5 estrelas
- **Bar**: Hotéis 4-5 estrelas
- **RoomService**: Hotéis 5 estrelas
- **Accessibility**: Hotéis 5 estrelas
- **BreakfastIncludes**: Hotéis premium

### 🧹 **Limpeza Automática:**

- Remove todos os hotéis de teste ao final
- Identifica por nomes específicos
- Não afeta dados existentes

## 📈 Endpoints Testados

### 🔍 Buscas Básicas

- **Busca Simples**: `/api/hotels/search?destination=Rio`
- **Busca com Estrelas**: `/api/hotels/search?destination=São Paulo&stars=4`
- **Busca com Preço**: `/api/hotels/search?destination=Brasília&minPrice=200&maxPrice=800`
- **Busca com Guests**: `/api/hotels/search?destination=Salvador&guests=2`

### 🏊 Buscas com Amenities

- **WiFi**: `/api/hotels/search?destination=Rio&amenities=WiFi`
- **Pool**: `/api/hotels/search?destination=São Paulo&amenities=Pool`
- **Restaurant**: `/api/hotels/search?destination=Brasília&amenities=Restaurant`
- **Bar**: `/api/hotels/search?destination=Salvador&amenities=Bar`
- **Room Service**: `/api/hotels/search?destination=Fortaleza&amenities=RoomService`

### 🛏️ Buscas com Room Types

- **Suite**: `/api/hotels/search?destination=Rio&roomType=Suite`
- **Standard**: `/api/hotels/search?destination=São Paulo&roomType=Standard`
- **Luxo**: `/api/hotels/search?destination=Brasília&roomType=Luxo`

### 📅 Buscas com Datas

- **Check-in**: `/api/hotels/search?destination=Rio&checkIn=2025-08-15`
- **Check-out**: `/api/hotels/search?destination=São Paulo&checkOut=2025-08-20`
- **Datas Completas**: `/api/hotels/search?destination=Brasília&checkIn=2025-08-15&checkOut=2025-08-20`

### 🌍 Buscas em Português

- **WiFi PT**: `/api/hotels/search?destination=Rio&amenities=WiFi`
- **Piscina PT**: `/api/hotels/search?destination=São Paulo&amenities=Piscina`
- **Restaurante PT**: `/api/hotels/search?destination=Brasília&amenities=Restaurante`

### 🎯 Buscas Complexas

- **Múltiplas Amenities**: `/api/hotels/search?destination=Rio&amenities=WiFi&amenities=Pool&amenities=Restaurant`
- **Filtros Completos**: `/api/hotels/search?destination=São Paulo&stars=4&minPrice=200&maxPrice=800&guests=3&amenities=Restaurant&amenities=Bar&checkIn=2025-08-15&checkOut=2025-08-20`
- **Case Insensitive**: `/api/hotels/search?destination=rio&amenities=wifi&amenities=pool`

## 🎯 Métricas Coletadas

- **Response Time**: Médio, Mín, Máx, P95, P99
- **Success Rate**: % de requests bem-sucedidos
- **Response Size**: Tamanho das respostas em bytes
- **Throughput**: Requests por segundo
- **Performance por Endpoint**: Análise detalhada
- **Performance por Tipo**: Buscas básicas vs complexas vs amenities

## 📊 Análise de Performance

O teste fornece análise detalhada por categoria:

- **🔍 Buscas Básicas**: Performance de buscas simples
- **🎯 Buscas Complexas**: Performance com múltiplos filtros
- **🏊 Buscas com Amenities**: Performance com amenities
- **📦 Response Sizes**: Análise do tamanho das respostas

## 🔍 Application Insights

Métricas detalhadas disponíveis no portal Azure:

- ApplicationId: `4e6bcfea-2904-4266-b125-36d689887340`
- Portal: https://portal.azure.com

## 💡 Dicas

- Execute o teste com a API em **Release mode** para resultados mais realistas
- Para mais usuários, ajuste `ConcurrentUsers` no `appsettings.json`
- Monitore recursos do sistema durante o teste (CPU, Memória, Banco)
- O teste agora inclui **26 cenários diferentes** de busca
- **Dados de teste são criados automaticamente** e removidos ao final

## 🚨 Importante

⚠️ **500 usuários simultâneos** é uma carga alta! Certifique-se que:

- Seu banco suporta múltiplas conexões
- A máquina tem recursos suficientes
- Não há outros processos pesados rodando
- A API está otimizada para buscas com amenities
- **O seeder cria dados temporários** que são removidos automaticamente

## 🎯 Objetivos de Performance

- **Buscas Básicas**: < 300ms (95% das requests)
- **Buscas com Amenities**: < 400ms (95% das requests)
- **Buscas Complexas**: < 600ms (95% das requests)
- **Success Rate**: > 95%
- **Suporte**: 500+ usuários simultâneos

## 🔧 Endpoints de Debug

O teste usa endpoints temporários no `DebugController`:

- **POST `/api/debug/seed-hotel`**: Cria hotel de teste
- **POST `/api/debug/cleanup-test-data`**: Remove dados de teste

⚠️ **Estes endpoints devem ser removidos em produção!**

## 📋 Correções Recentes

### **UnitOfWork Integration:**

- ✅ **Corrigido**: Uso de `CommitAsync()` em vez de `SaveChangesAsync()`
- ✅ **Corrigido**: Uso de `Remove()` em vez de `DeleteAsync()`
- ✅ **Testado**: Build bem-sucedido com 79 warnings (apenas warnings de nullable)

### **Seeder Temporário:**

- ✅ **Funcional**: Cria 20 hotéis com amenities variadas
- ✅ **Seguro**: Remove apenas dados de teste
- ✅ **Flexível**: Suporta amenities em inglês e português

## 📊 Documentação Adicional

- **`PERFORMANCE_TEST_DOCUMENTATION.md`**: Documentação completa e detalhada
- **`PERFORMANCE_TEST_SUMMARY.md`**: Resumo executivo
- **`appsettings.json`**: Configurações do teste
- **`Program.cs`**: Código principal do teste

---

**📅 Última atualização**: Agosto 2025  
**🔧 Versão**: 1.0  
**📋 Status**: Pronto para produção
