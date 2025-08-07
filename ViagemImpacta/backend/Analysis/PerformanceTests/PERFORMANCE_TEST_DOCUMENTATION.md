# 🚀 Documentação Completa - Teste de Performance Viagem Impacta

## 📋 Visão Geral

Este documento descreve o **teste de performance automatizado** para o sistema de busca de hotéis da Viagem Impacta, projetado para simular **500 usuários simultâneos** e validar a performance do sistema em cenários reais.

## 🎯 Objetivos do Teste

### **Objetivos Primários:**

- ✅ **Validar performance** com 500 usuários simultâneos
- ✅ **Testar buscas complexas** com amenities e filtros avançados
- ✅ **Verificar fail-fast validations** (1-5ms)
- ✅ **Avaliar response times** por categoria de busca
- ✅ **Simular cenários reais** de uso da aplicação

### **Métricas de Sucesso:**

- **Buscas Básicas**: < 300ms (95% das requests)
- **Buscas com Amenities**: < 400ms (95% das requests)
- **Buscas Complexas**: < 600ms (95% das requests)
- **Success Rate**: > 95%
- **Fail-Fast Validations**: < 5ms

## 🏗️ Arquitetura do Teste

### **Componentes Principais:**

#### **1. Seeder Temporário (`DebugController`)**

```csharp
// Endpoints de debug para teste
POST /api/debug/seed-hotel     // Cria hotel de teste
POST /api/debug/cleanup-test-data  // Remove dados de teste
```

#### **2. Teste de Performance (`Program.cs`)**

- **4 fases de teste** sequenciais
- **26 cenários diferentes** de busca
- **Métricas detalhadas** por categoria
- **Análise de response size** e throughput

#### **3. Configuração (`appsettings.json`)**

```json
{
  "PerformanceTest": {
    "BaseUrl": "http://localhost:5155",
    "ConcurrentUsers": 500,
    "TestDurationMinutes": 2,
    "WarmUpRequests": 20,
    "OverloadRequests": 1000,
    "UserDelayMinMs": 100,
    "UserDelayMaxMs": 500,
    "RequestTimeoutSeconds": 60
  }
}
```

## 📊 Fases do Teste

### **🌱 FASE 0: Seeding (População de Dados)**

- **Duração**: ~30 segundos
- **Ação**: Cria 20 hotéis de teste com amenities variadas
- **Cidades**: Rio de Janeiro, São Paulo, Brasília, Salvador, Fortaleza, Recife, Belo Horizonte, Curitiba, Porto Alegre
- **Amenities**: WiFi, Pool, Restaurant, Bar, RoomService, Accessibility, BreakfastIncludes

### **🔥 FASE 1: Warm-up (Aquecimento)**

- **Duração**: ~2 minutos
- **Requests**: 20 requests sequenciais
- **Objetivo**: "Esquentar" a API e cache
- **Métricas**: Response times iniciais

### **💥 FASE 2: Load Test (Teste de Carga)**

- **Duração**: 2 minutos
- **Usuários**: 500 simultâneos
- **Cenários**: 26 tipos diferentes de busca
- **Métricas**: P95, P99, throughput, success rate

### **🚨 FASE 3: Overload Test (Teste de Sobrecarga)**

- **Duração**: 2 minutos
- **Usuários**: 1000 simultâneos (2x carga normal)
- **Objetivo**: Testar limites do sistema
- **Métricas**: Comportamento sob stress

### **🎯 FASE 4: Complex Search Test (Buscas Complexas)**

- **Duração**: 2 minutos
- **Usuários**: 500 simultâneos
- **Cenários**: Buscas com múltiplos filtros
- **Métricas**: Performance de queries complexas

### **🧹 FASE 5: Cleanup (Limpeza)**

- **Duração**: ~10 segundos
- **Ação**: Remove todos os hotéis de teste
- **Segurança**: Não afeta dados existentes

## 📈 Cenários de Teste

### **🔍 Buscas Básicas (8 cenários)**

```http
GET /api/hotels/search?destination=Rio
GET /api/hotels/search?destination=São Paulo&stars=4
GET /api/hotels/search?destination=Brasília&minPrice=200&maxPrice=800
GET /api/hotels/search?destination=Salvador&guests=2
```

### **🏊 Buscas com Amenities (8 cenários)**

```http
GET /api/hotels/search?destination=Rio&amenities=WiFi
GET /api/hotels/search?destination=São Paulo&amenities=Pool
GET /api/hotels/search?destination=Brasília&amenities=Restaurant
GET /api/hotels/search?destination=Salvador&amenities=Bar
```

### **🛏️ Buscas com Room Types (3 cenários)**

```http
GET /api/hotels/search?destination=Rio&roomType=Suite
GET /api/hotels/search?destination=São Paulo&roomType=Standard
GET /api/hotels/search?destination=Brasília&roomType=Luxo
```

### **📅 Buscas com Datas (3 cenários)**

```http
GET /api/hotels/search?destination=Rio&checkIn=2025-08-15
GET /api/hotels/search?destination=São Paulo&checkOut=2025-08-20
GET /api/hotels/search?destination=Brasília&checkIn=2025-08-15&checkOut=2025-08-20
```

### **🌍 Buscas em Português (3 cenários)**

```http
GET /api/hotels/search?destination=Rio&amenities=WiFi
GET /api/hotels/search?destination=São Paulo&amenities=Piscina
GET /api/hotels/search?destination=Brasília&amenities=Restaurante
```

### **🎯 Buscas Complexas (15 cenários)**

```http
GET /api/hotels/search?destination=Rio&stars=5&minPrice=300&maxPrice=1000&guests=2&amenities=WiFi&amenities=Pool&roomType=Suite
GET /api/hotels/search?destination=São Paulo&stars=4&minPrice=200&maxPrice=800&guests=3&amenities=Restaurant&amenities=Bar&checkIn=2025-08-15&checkOut=2025-08-20
```

## 📊 Métricas Coletadas

### **⚡ Response Times**

- **Average**: Tempo médio de resposta
- **Minimum**: Tempo mínimo de resposta
- **Maximum**: Tempo máximo de resposta
- **P95**: 95% das requests abaixo deste tempo
- **P99**: 99% das requests abaixo deste tempo

### **📦 Response Sizes**

- **Average**: Tamanho médio da resposta em bytes
- **Total**: Volume total de dados transferidos
- **Throughput**: Requests por segundo

### **✅ Success Metrics**

- **Success Rate**: % de requests bem-sucedidos
- **Error Rate**: % de requests com erro
- **Timeout Rate**: % de requests com timeout

### **🎯 Performance por Categoria**

- **Buscas Básicas**: Performance de buscas simples
- **Buscas com Amenities**: Performance com amenities
- **Buscas Complexas**: Performance com múltiplos filtros
- **Fail-Fast**: Performance de validações

## 🏨 Dados de Teste

### **20 Hotéis Criados:**

#### **🏖️ Rio de Janeiro (3 hotéis)**

- **Hotel Copacabana Palace** (5⭐) - WiFi, Pool, Restaurant, Bar, RoomService
- **Hotel Ipanema Beach** (4⭐) - WiFi, Pool, Restaurant
- **Hotel Leblon Luxury** (5⭐) - WiFi, Pool, Restaurant, Bar, RoomService, Accessibility

#### **🏙️ São Paulo (3 hotéis)**

- **Hotel São Paulo Center** (4⭐) - WiFi, Restaurant, Bar
- **Hotel Paulista Business** (3⭐) - WiFi, Restaurant
- **Hotel Jardins Premium** (5⭐) - WiFi, Pool, Restaurant, Bar, RoomService, BreakfastIncludes

#### **🏛️ Brasília (3 hotéis)**

- **Hotel Brasília Palace** (4⭐) - WiFi, Pool, Restaurant
- **Hotel Asa Norte** (3⭐) - WiFi, Restaurant
- **Hotel Plano Piloto** (5⭐) - WiFi, Pool, Restaurant, Bar, RoomService, Accessibility

#### **🌊 Outras Cidades (11 hotéis)**

- **Salvador**: Salvador Beach (4⭐), Pelourinho (3⭐)
- **Fortaleza**: Fortaleza Ocean (4⭐), Beira Mar (3⭐)
- **Recife**: Recife Antigo (4⭐), Boa Viagem (3⭐)
- **Belo Horizonte**: BH Center (4⭐), Savassi (3⭐)
- **Curitiba**: Curitiba Business (4⭐), Batel (3⭐)
- **Porto Alegre**: POA Center (4⭐)

### **🏊 Amenities Distribuídas:**

- **WiFi**: Todos os hotéis
- **Pool**: Hotéis 4-5 estrelas
- **Restaurant**: Hotéis 3-5 estrelas
- **Bar**: Hotéis 4-5 estrelas
- **RoomService**: Hotéis 5 estrelas
- **Accessibility**: Hotéis 5 estrelas
- **BreakfastIncludes**: Hotéis premium

## 🔧 Como Executar

### **Pré-requisitos:**

1. **Backend rodando** em `http://localhost:5155`
2. **Banco de dados** acessível
3. **Recursos suficientes** para 500 usuários simultâneos

### **Execução:**

```bash
# Navegar para o diretório
cd backend/Analysis/PerformanceTests

# Executar teste completo
dotnet run

# Ou usar script automático
run-test.bat
```

### **Monitoramento:**

```bash
# Verificar logs em tempo real
tail -f logs/performance-test.log

# Monitorar recursos do sistema
htop  # Linux/Mac
taskmgr  # Windows
```

## 📊 Resultados Esperados

### **🎯 Métricas de Performance:**

- **Total Requests**: ~50,000-100,000 requests
- **Duration**: ~10-15 minutos (completo)
- **Success Rate**: > 95%
- **Average Response Time**: 200-400ms
- **P95 Response Time**: < 600ms
- **P99 Response Time**: < 1000ms

### **📈 Análise por Categoria:**

```
🔍 Buscas Básicas: ~15,000 reqs | Avg: 200ms
🏊 Buscas com Amenities: ~20,000 reqs | Avg: 300ms
🎯 Buscas Complexas: ~15,000 reqs | Avg: 500ms
```

### **📦 Response Sizes:**

- **Average**: 2-5 KB por resposta
- **Total**: 100-500 MB transferidos
- **Throughput**: 50-100 requests/segundo

## 🚨 Troubleshooting

### **Problemas Comuns:**

#### **❌ API não responde**

```bash
# Verificar se a API está rodando
curl http://localhost:5155/api/hotels/search?destination=Rio

# Verificar logs da API
tail -f logs/api.log
```

#### **❌ Timeout de requests**

```json
// Aumentar timeout no appsettings.json
{
  "RequestTimeoutSeconds": 120
}
```

#### **❌ Erro de memória**

```bash
# Reduzir usuários simultâneos
{
  "ConcurrentUsers": 250
}
```

#### **❌ Banco de dados lento**

```sql
-- Verificar conexões ativas
SELECT COUNT(*) FROM pg_stat_activity;

-- Verificar queries lentas
SELECT query, mean_time FROM pg_stat_statements ORDER BY mean_time DESC LIMIT 10;
```

## 🔍 Application Insights

### **Métricas no Azure:**

- **ApplicationId**: `4e6bcfea-2904-4266-b125-36d689887340`
- **Portal**: https://portal.azure.com
- **Métricas**: Response times, throughput, errors

### **Logs Importantes:**

- **Performance logs**: Tempos de resposta
- **Error logs**: Falhas e timeouts
- **Database logs**: Queries lentas
- **System logs**: CPU, memória, rede

## 📋 Checklist de Preparação

### **✅ Antes do Teste:**

- [ ] Backend rodando em Release mode
- [ ] Banco de dados otimizado
- [ ] Cache configurado
- [ ] Logs habilitados
- [ ] Monitoramento ativo
- [ ] Recursos suficientes disponíveis

### **✅ Durante o Teste:**

- [ ] Monitorar CPU (deve ficar < 80%)
- [ ] Monitorar memória (deve ficar < 80%)
- [ ] Monitorar rede (bandwidth)
- [ ] Verificar logs de erro
- [ ] Anotar métricas importantes

### **✅ Após o Teste:**

- [ ] Analisar resultados
- [ ] Identificar gargalos
- [ ] Documentar findings
- [ ] Limpar dados de teste
- [ ] Gerar relatório

## 🎯 Objetivos de Melhoria

### **🚀 Otimizações Prioritárias:**

1. **Cache em memória** (Redis/Memory Cache)
2. **Paginação** nas buscas
3. **Índices** no banco de dados
4. **Compressão** de resposta (Gzip)
5. **CDN** para assets estáticos

### **📊 Métricas de Sucesso Futuro:**

- **Response Time**: < 200ms (95% das requests)
- **Throughput**: > 1000 requests/segundo
- **Success Rate**: > 99%
- **Suporte**: 1000+ usuários simultâneos

## 📞 Suporte

### **Contatos:**

- **Desenvolvedor**: Equipe Viagem Impacta
- **Email**: suporte@viagemimpacta.com
- **Documentação**: Este arquivo

### **Recursos Adicionais:**

- **README.md**: Instruções básicas
- **appsettings.json**: Configurações
- **Program.cs**: Código do teste
- **DebugController.cs**: Endpoints de debug

---

**📅 Última atualização**: Agosto 2025  
**🔧 Versão**: 1.0  
**📋 Status**: Pronto para produção
