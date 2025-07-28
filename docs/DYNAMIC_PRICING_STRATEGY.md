# ## 📚 Conceito Fundamental

O sistema de preços dinâmicos ajusta automaticamente o preço dos q## 📈 Exemplos Práticos

### \*\*RoomType "Standard"## 📝 Implementação no Sistema

### **1. RoomTypes já tem BasePrice**

```sql
-- RoomTypes já existe com BasePrice
SELECT RoomTypeId, Name, BasePrice FROM RoomTypes;
```

### **2. Rooms herdam preço do RoomType**

```csharp
// No momento da consulta/reserva
public decimal GetRoomPrice(int roomId, DateTime checkInDate)
{
    var room = GetRoom(roomId);
    var roomType = room.RoomType;

    // Calcular preço dinâmico baseado no tipo
    return CalculateSimpleDynamicPrice(roomType.RoomTypeId, checkInDate);
}
```

### **3. Uso das tabelas:**

- **RoomTypes**: Armazena preços base e recebe cálculo dinâmico
- **Rooms**: Controla disponibilidade individual (ocupado/livre)
- **Availability**: Registra disponibilidade por data
- **Reservations**: Vincula a quartos específicos, mas usa preço do tipo

### **4. Fluxo completo:**

1. Cliente busca quartos para uma data
2. Sistema calcula preço dinâmico por **RoomType**
3. Mostra quartos **disponíveis** daquele tipo
4. Cliente escolhe um **Room** específico
5. Reserva é feita no Room, mas com preço do RoomTypee (tem 10 quartos físicos)\*\*

**Cenário 1**: Baixa temporada + Hotel vazio (30% ocupação)

```
R$ 200 × 0.8 × 1.0 = R$ 160,00
Todos os 10 quartos Standard custam R$ 160,00
```

**Cenário 2**: Alta temporada + Hotel cheio (90% ocupação)

```
R$ 200 × 1.3 × 1.5 = R$ 390,00
Todos os 10 quartos Standard custam R$ 390,00
```

**Cenário 3**: Baixa temporada + Ocupação normal (60% ocupação)

```
R$ 200 × 1.0 × 1.0 = R$ 200,00
Todos os 10 quartos Standard custam R$ 200,00 (preço base)
```

### 🏠 **Como funciona na prática:**

- **RoomType "Deluxe"** → Preço dinâmico calculado = R$ 350,00
- **Room 201** (tipo Deluxe) → Herda R$ 350,00
- **Room 202** (tipo Deluxe) → Herda R$ 350,00
- **Room 203** (tipo Deluxe) → Herda R$ 350,00dois fatores principais:

1. **Taxa de Ocupação** do hotel
2. **Sazonalidade** (alta/baixa temporada)

### 🏨 **Diferença: Rooms vs RoomTypes**

**RoomTypes** (Tipos de Quarto):

- Define **categorias** de quartos (Standard, Deluxe, Suíte)
- Tem preço base único para toda a categoria
- O preço dinâmico é aplicado **por tipo**, não por quarto individual

**Rooms** (Quartos Individuais):

- São as unidades físicas específicas (Quarto 101, 102, 103...)
- Herdam o preço do seu RoomType
- Usados para controlar disponibilidade e reservas específicas

**🎯 Na nossa abordagem simplificada:**

- Preços dinâmicos = **RoomTypes** (por categoria)
- Disponibilidade = **Rooms** (quartos específicos)
- Um RoomType pode ter vários Rooms físicosma de Preços Dinâmicos

## � Conceito Fundamental

O sistema de preços dinâmicos ajusta automaticamente o preço dos quartos baseado em dois fatores principais:

1. **Taxa de Ocupação** do hotel
2. **Sazonalidade** (alta/baixa temporada)

## 🗃️ Estrutura de Dados Simplificada

### **PricingMultiplier** - Multiplicadores de Preço

```sql
CREATE TABLE PricingMultiplier (
    PricingMultiplierId INT PRIMARY KEY IDENTITY,
    RoomTypeId INT NOT NULL,
    FactorType NVARCHAR(20) NOT NULL, -- 'Occupancy' ou 'Seasonal'
    FactorValue NVARCHAR(50) NOT NULL, -- 'High', 'Medium', 'Low' ou 'Peak', 'Normal', 'Off'
    Multiplier DECIMAL(3,2) NOT NULL, -- Ex: 1.5 = +50%, 0.8 = -20%
    FOREIGN KEY (RoomTypeId) REFERENCES RoomTypes(RoomTypeId)
);
```

## ⚙️ Lógica Simplificada de Cálculo

### Fórmula Básica:

```
PreçoFinal = PreçoBase × MultOcupação × MultSazonal
```

### Implementação em C#:

```csharp
public decimal CalculateSimpleDynamicPrice(int roomTypeId, DateTime checkInDate)
{
    var roomType = GetRoomType(roomTypeId);
    var basePrice = roomType.BasePrice;

    // 1. Calcular ocupação atual do hotel
    var occupancyRate = GetCurrentOccupancyRate(checkInDate);
    var occupancyMultiplier = GetOccupancyMultiplier(occupancyRate);

    // 2. Verificar se é alta temporada
    var seasonalMultiplier = IsHighSeason(checkInDate) ? 1.5m : 1.0m;

    // 3. Aplicar fórmula
    var finalPrice = basePrice * occupancyMultiplier * seasonalMultiplier;

    return Math.Round(finalPrice, 2);
}

private decimal GetOccupancyMultiplier(decimal occupancyRate)
{
    return occupancyRate switch
    {
        < 0.5m => 0.8m,    // Menos de 50% ocupado = 20% desconto
        < 0.8m => 1.0m,    // 50-80% ocupado = preço normal
        _ => 1.3m           // Mais de 80% ocupado = 30% aumento
    };
}

private bool IsHighSeason(DateTime date)
{
    // Dezembro, Janeiro e Fevereiro = Alta temporada
    return date.Month == 12 || date.Month == 1 || date.Month == 2;
}
```

## 📊 Regras Simplificadas

### **1. Por Ocupação do Hotel**

- **Baixa** (0-49%): × 0.8 (20% desconto)
- **Normal** (50-79%): × 1.0 (preço base)
- **Alta** (80-100%): × 1.3 (+30%)

### **2. Por Temporada**

- **Alta temporada** (Dez-Fev): × 1.5 (+50%)
- **Baixa temporada** (demais meses): × 1.0 (preço base)

## � Exemplos Práticos

### **Quarto Standard - R$ 200,00 base**

**Cenário 1**: Baixa temporada + Hotel vazio (30% ocupação)

```
R$ 200 × 0.8 × 1.0 = R$ 160,00
```

**Cenário 2**: Alta temporada + Hotel cheio (90% ocupação)

```
R$ 200 × 1.3 × 1.5 = R$ 390,00
```

**Cenário 3**: Baixa temporada + Ocupação normal (60% ocupação)

```
R$ 200 × 1.0 × 1.0 = R$ 200,00
```

## 🎯 Benefícios Acadêmicos

1. **Conceito claro**: Apenas 2 variáveis principais
2. **Fácil implementação**: Lógica simples e direta
3. **Demonstração prática**: Mostra impact real nos preços
4. **Escalável**: Pode evoluir para mais complexidade depois

## � Implementação no Sistema

### **1. Adicionar campo na tabela RoomTypes**

```sql
ALTER TABLE RoomTypes ADD BasePrice DECIMAL(10,2) NOT NULL DEFAULT 0;
```

### **2. Criar função de cálculo dinâmico**

- Implementar no Service/Repository
- Usar nos controllers de consulta
- Aplicar na exibição de preços

### **3. Teste na interface**

- Mostrar preço base vs preço dinâmico
- Explicar fatores aplicados
- Comparar cenários diferentes
