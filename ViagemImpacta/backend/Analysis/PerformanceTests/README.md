# 🚀 Performance Tests - Viagem Impacta

Teste de performance para simular **500 usuários simultâneos** usando a API por **1 minuto**.

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
    "TestDurationMinutes": 1, // Duração do teste
    "WarmUpRequests": 10, // Requests de aquecimento
    "OverloadRequests": 200, // Requests de sobrecarga
    "UserDelayMinMs": 200, // Delay mínimo entre requests
    "UserDelayMaxMs": 1000, // Delay máximo entre requests
    "RequestTimeoutSeconds": 30 // Timeout por request
  }
}
```

## 📊 Fases do Teste

1. **🔥 AQUECIMENTO**: 10 requests sequenciais para "esquentar" a API
2. **💥 CARGA**: 500 usuários simultâneos por 1 minuto
3. **🚨 SOBRECARGA**: 200 requests simultâneos para testar limites

## 📈 Endpoints Testados

- **Busca Básica**: `/api/hotels/search?destination=Rio`
- **Busca com Filtros**: Estrelas, preço, guests
- **Fail-Fast**: Validações rápidas (devem ser < 5ms)
- **Cenários Complexos**: Múltiplos filtros

## 🎯 Métricas Coletadas

- **Response Time**: Médio, Mín, Máx, P95, P99
- **Success Rate**: % de requests bem-sucedidos
- **Throughput**: Requests por segundo
- **Performance por Endpoint**: Análise detalhada

## 🔍 Application Insights

Métricas detalhadas disponíveis no portal Azure:

- ApplicationId: `4e6bcfea-2904-4266-b125-36d689887340`
- Portal: https://portal.azure.com

## 💡 Dicas

- Execute o teste com a API em **Release mode** para resultados mais realistas
- Para mais usuários, ajuste `ConcurrentUsers` no `appsettings.json`
- Monitore recursos do sistema durante o teste (CPU, Memória, Banco)

## 🚨 Importante

⚠️ **500 usuários simultâneos** é uma carga alta! Certifique-se que:

- Seu banco suporta múltiplas conexões
- A máquina tem recursos suficientes
- Não há outros processos pesados rodando
