# 🚀 Teste de Performance - TRIPZ

## 📊 Configuração Atual

### **Cenário de Teste:**

- **100 hotéis** distribuídos em 20 cidades brasileiras
- **50 quartos por hotel** (distribuídos entre Standard, Luxo, Suite)
- **1000 usuários simultâneos** (teste de carga)
- **Duração**: 2 minutos por fase
- **Total de requests**: ~100.000-200.000
- **Total de quartos**: 5.000 quartos (100 hotéis × 50 quartos) com 50% de vacância.

### **Distribuição dos Hotéis:**

- **20 cidades**: Rio de Janeiro, São Paulo, Brasília, Salvador, Fortaleza, Recife, Belo Horizonte, Curitiba, Porto Alegre, Manaus, Belém, Goiânia, Campo Grande, Cuiabá, Palmas, Aracaju, Maceió, João Pessoa, Natal, Teresina
- **5 hotéis por cidade** com diferentes classificações (1-5 estrelas)
- **Amenities variadas** baseadas na classificação

### **Distribuição dos Quartos:**

- **50 quartos por hotel** distribuídos entre 3 tipos:
  - **Standard**: 15-35 quartos (capacidade: 2 pessoas)
  - **Luxo**: 15-20 quartos (capacidade: 3 pessoas)
  - **Suite**: 5-15 quartos (capacidade: 4 pessoas)
- **Preços variados** baseados na classificação do hotel (1-5 estrelas)
- **Total**: 5.000 quartos no sistema de teste

## 🎯 Objetivos do Teste

### **Métricas de Sucesso:**

- **Response Time**: < 2 segundos (95% das requests)
- **Success Rate**: > 90%
- **Throughput**: 100-200 requests/segundo
- **Fail-Fast Validations**: < 10ms

### **Cenários Testados:**

- **Buscas Básicas**: Por destino, preço, estrelas
- **Buscas com Amenities**: WiFi, Pool, Restaurant, etc.
- **Buscas Complexas**: Múltiplos filtros simultâneos
- **Buscas com Datas**: Check-in/check-out específicos

## 🔧 Como Executar

### **Pré-requisitos:**

1. **Backend rodando** em `http://localhost:5155`
2. **Banco de dados** acessível e otimizado
3. **Recursos suficientes** para 2000 usuários simultâneos
4. **Memória**: Mínimo 8GB RAM disponível
5. **CPU**: Mínimo 4 cores disponíveis

### **Execução:**

```bash
# Navegar para o diretório
cd backend/Analysis/PerformanceTests

# Executar teste completo
dotnet run

# Ou usar script automático
run-test.bat
```

## 📈 Fases do Teste

### **🌱 FASE 0: Seeding (2-3 minutos)**

- Criação de 100 hotéis de teste
- Distribuição em 20 cidades brasileiras
- Configuração de amenities por classificação

### **🔥 FASE 1: Warm-up (2 minutos)**

- 30 requests sequenciais
- Aquecimento da API e cache
- Validação de conectividade

### **💥 FASE 2: Load Test (2 minutos)**

- 1000 usuários simultâneos
- 26 cenários diferentes de busca
- Métricas de performance normal

### **🎯 FASE 3: Complex Search (2 minutos)**

- 1000 usuários simultâneos
- Buscas com múltiplos filtros
- Performance de queries complexas

### **🧹 FASE 4: Cleanup (30 segundos)**

- Remoção de dados de teste
- Limpeza do banco de dados

## 📊 Resultados Esperados

### **Performance por Categoria:**

```
🔍 Buscas Básicas: ~45,000 reqs | Avg: 300ms
🏊 Buscas com Amenities: ~60,000 reqs | Avg: 400ms
🎯 Buscas Complexas: ~45,000 reqs | Avg: 600ms
```

### **Métricas de Sistema:**

- **Total Requests**: ~100,000-200,000
- **Duration**: ~10-15 minutos (completo)
- **Success Rate**: > 90%
- **Average Response Time**: 300-600ms
- **P95 Response Time**: < 2000ms
- **P99 Response Time**: < 3000ms

## 🚨 Troubleshooting

### **Problemas Comuns:**

#### **❌ API não responde**

```bash
# Verificar se a API está rodando
curl http://localhost:5155/api/hotels/search?destination=Rio
```

#### **❌ Timeout de requests**

```json
// Aumentar timeout no appsettings.json
{
  "RequestTimeoutSeconds": 180
}
```

#### **❌ Erro de memória**

```json
// Reduzir usuários simultâneos
{
  "ConcurrentUsers": 500
}
```

#### **❌ Banco de dados lento**

```sql
-- Verificar conexões ativas
SELECT COUNT(*) FROM pg_stat_activity;

-- Verificar queries lentas
SELECT query, mean_time FROM pg_stat_statements ORDER BY mean_time DESC LIMIT 10;
```

## 📋 Checklist de Preparação

### **✅ Antes do Teste:**

- [ ] Backend rodando em Release mode
- [ ] Banco de dados otimizado com índices
- [ ] Cache configurado (se disponível)
- [ ] Logs habilitados
- [ ] Monitoramento ativo
- [ ] Recursos suficientes disponíveis (8GB+ RAM, 4+ cores)

### **✅ Durante o Teste:**

- [ ] Monitorar CPU (deve ficar < 90%)
- [ ] Monitorar memória (deve ficar < 90%)
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

1. **Cache Redis** - Reduzir queries ao banco
2. **Paginação** - Limitar resultados por página
3. **Índices otimizados** - Melhorar performance das queries
4. **Compressão** - Reduzir tamanho das respostas
5. **CDN** - Acelerar assets estáticos
6. **Load Balancing** - Distribuir carga entre instâncias

### **📊 Métricas de Sucesso Futuro:**

- **Response Time**: < 1 segundo (95% das requests)
- **Throughput**: > 500 requests/segundo
- **Success Rate**: > 95%
- **Suporte**: 2000+ usuários simultâneos

## 📞 Suporte

### **Contatos:**

- **Desenvolvedor**: Equipe Viagem Impacta
- **Email**: suporte@viagemimpacta.com
- **Documentação**: Este arquivo

### **Recursos Adicionais:**

- **PERFORMANCE_TEST_DOCUMENTATION.md**: Documentação completa
- **appsettings.json**: Configurações detalhadas
- **Program.cs**: Código do teste
- **DebugController.cs**: Endpoints de debug

## 📊 Monitoramento no Azure Application Insights

### **🔗 Configuração:**

- **Application ID**: `57064249-2d16-49c8-9ce1-05db5a48ca8f`
- **Instrumentation Key**: `b3ee3151-3d63-428f-a0bd-a1e637a1eaf5`
- **Portal**: https://portal.azure.com → Application Insights

### **📈 Métricas Monitoradas:**

#### **Requests HTTP:**

- Tempo de resposta por endpoint
- Taxa de sucesso/erro
- Volume de requests por minuto
- Distribuição de códigos de status

#### **Dependências (Database):**

- Tempo de execução das queries
- Queries mais lentas
- Conexões simultâneas
- Timeouts de banco

#### **Métricas Personalizadas:**

- Início e fim dos testes
- Fases do teste (Warm-up, Load, Complex Search)
- Métricas de performance por categoria
- Exceções durante o teste

### **🎯 Como Acessar:**

1. **Portal Azure**: https://portal.azure.com
2. **Application Insights**: Buscar por "57064249-2d16-49c8-9ce1-05db5a48ca8f"
3. **Seções importantes**:
   - **Live Metrics**: Monitoramento em tempo real
   - **Performance**: Análise de requests lentos
   - **Failures**: Exceções e erros
   - **Logs**: Telemetria personalizada

### **📊 Filtros Úteis:**

```kusto
// Requests do teste de performance
requests
| where customDimensions.TestType == "PerformanceTest"
| summarize count(), avg(duration) by name

// Métricas de performance
customEvents
| where name == "PerformanceTest.Phase"
| project timestamp, customDimensions.PhaseName, customDimensions.AverageResponseTime

// Exceções durante o teste
exceptions
| where customDimensions.TestPhase == "PerformanceTest"
| project timestamp, type, message
```

---

**📅 Última atualização**: Janeiro 2025  
**🔧 Versão**: 2.0 (100 hotéis, 1000 usuários)  
**📋 Status**: Pronto para produção
