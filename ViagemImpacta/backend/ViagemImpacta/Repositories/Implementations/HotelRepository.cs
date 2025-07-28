using Microsoft.EntityFrameworkCore;
using ViagemImpacta.Data;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories.Interfaces;

namespace ViagemImpacta.Repositories.Implementations
{
    /// <summary>
    /// 📋 REPOSITORY - Implementação de Acesso a Dados de Hotéis
    /// 
    /// Esta classe implementa o padrão Repository para a entidade Hotel,
    /// encapsulando toda a lógica de acesso a dados específica de hotéis.
    /// 
    /// 🎯 RESPONSABILIDADES:
    /// - Implementar operações CRUD específicas para hotéis
    /// - Encapsular queries SQL complexas
    /// - Fornecer métodos otimizados para casos de uso específicos
    /// - Manter a camada de negócio isolada do Entity Framework
    /// 
    /// 🏗️ ARQUITETURA:
    /// Service → Repository → Entity Framework → Database
    ///                ↑ VOCÊ ESTÁ AQUI
    /// 
    /// 📚 CONCEITOS DEMONSTRADOS:
    /// - Repository Pattern
    /// - Entity Framework Core queries
    /// - LINQ to SQL
    /// - Async/await patterns
    /// - Query optimization
    /// </summary>

    public class HotelRepository : IHotelRepository
    {
        private readonly AgenciaDbContext _context;

        public HotelRepository(AgenciaDbContext context)
        {
            _context = context;
        }

        // Métodos obrigatórios da interface IHotelRepository
        public async Task<List<Hotel>> GetAllAsync()
        {
            return await _context.Hotels
                .Include(h => h.RoomTypes)
                .Include(h => h.Rooms)
                .ToListAsync();
        }

        public async Task<Hotel?> GetByIdAsync(int id)
        {
            return await _context.Hotels
                .Include(h => h.RoomTypes)
                .Include(h => h.Rooms)
                .FirstOrDefaultAsync(h => h.HotelId == id);
        }

        public async Task AddAsync(Hotel hotel)
        {
            await _context.Hotels.AddAsync(hotel);
        }

        public async Task UpdateAsync(Hotel hotel)
        {
            _context.Hotels.Update(hotel);
            await Task.CompletedTask;
        }

        public async Task DeleteAsync(int id)
        {
            var hotel = await _context.Hotels.FindAsync(id);
        if (hotel != null)
        {
            _context.Hotels.Remove(hotel);
        }
    }


        /// <summary>
        /// 🌟 MÉTODO: Buscar hotéis por número de estrelas
        /// 
        /// 🎯 PROPÓSITO:
        /// Implementa filtro por categoria de hotel (1-5 estrelas)
        /// Útil para busca por qualidade/categoria específica
        /// 
        /// 🔍 IMPLEMENTAÇÃO:
        /// - Query LINQ traduzida para SQL WHERE
        /// - Async para performance em I/O
        /// - ToListAsync() para materializar resultados
        /// 
        /// 💾 SQL GERADO:
        /// SELECT [h].[HotelId], [h].[Name], [h].[Stars], [h].[Wifi]...
        /// FROM [Hotels] AS [h]
        /// WHERE [h].[Stars] = @stars
        /// 
        /// ⚡ PERFORMANCE:
        /// - Índice recomendado: CREATE INDEX IX_Hotels_Stars ON Hotels(Stars)
        /// - Query otimizada no banco de dados
        /// - Retorna apenas dados necessários
        /// </summary>
        /// <param name="stars">Número de estrelas (1-5)</param>
        /// <returns>Lista de hotéis da categoria especificada</returns>
        public async Task<IEnumerable<Hotel>> GetHotelsByStarsAsync(int stars)
        {
            // 🎯 QUERY LINQ OTIMIZADA
            // Where() cria filtro SQL
            // ToListAsync() materializa e retorna dados
            return await _context.Hotels
                .Where(h => h.Stars == stars)
                .ToListAsync();
        }

        /// <summary>
        /// 🏨 MÉTODO: Buscar hotéis por comodidades específicas
        /// 
        /// 🎯 PROPÓSITO:
        /// Implementa filtro combinado por múltiplas comodidades
        /// Permite ao usuário encontrar hotéis que atendem necessidades específicas
        /// 
        /// 🔧 LÓGICA IMPLEMENTADA:
        /// - Se parâmetro = false: NÃO filtra por essa comodidade
        /// - Se parâmetro = true: INCLUI apenas hotéis que TÊM essa comodidade
        /// - Combina todos os filtros com AND lógico
        /// 
        /// 💾 SQL GERADO:
        /// SELECT [h].[HotelId], [h].[Name], [h].[Wifi], [h].[Parking]...
        /// FROM [Hotels] AS [h]
        /// WHERE (@wifi = 0 OR [h].[Wifi] = 1)
        ///   AND (@parking = 0 OR [h].[Parking] = 1)
        ///   AND (@gym = 0 OR [h].[Gym] = 1)
        /// 
        /// 🎓 EXPLICAÇÃO DA LÓGICA:
        /// (!wifi || h.Wifi) significa:
        /// - Se wifi = false: (!false = true) → sempre inclui (não filtra)
        /// - Se wifi = true: (!true = false) → só inclui se h.Wifi = true
        /// 
        /// EXEMPLOS PRÁTICOS:
        /// - GetHotelsWithAmenitiesAsync(false, false, false) → Todos os hotéis
        /// - GetHotelsWithAmenitiesAsync(true, false, false)  → Apenas com WiFi
        /// - GetHotelsWithAmenitiesAsync(true, true, true)    → Com todas as comodidades
        /// 
        /// ⚡ PERFORMANCE:
        /// - Índices recomendados: CREATE INDEX IX_Hotels_Amenities ON Hotels(Wifi, Parking, Gym)
        /// - Query única otimizada
        /// - Evita múltiplas consultas ao banco
        /// </summary>
        /// <param name="wifi">true = apenas hotéis com WiFi</param>
        /// <param name="parking">true = apenas hotéis com estacionamento</param>
        /// <param name="gym">true = apenas hotéis com academia</param>
        /// <returns>Lista de hotéis que atendem aos critérios especificados</returns>
        public async Task<IEnumerable<Hotel>> GetHotelsWithAmenitiesAsync(bool wifi, bool parking, bool gym)
        {
            // 🎯 QUERY COM MÚLTIPLOS FILTROS CONDICIONAIS
            // Cada condição (!parameter || h.Property) implementa:
            // "Se parâmetro for false, não filtrar; se true, só incluir hotéis que têm"
            return await _context.Hotels
                .Where(h => (!wifi || h.Wifi) &&           // 📶 Filtro WiFi condicional
                           (!parking || h.Parking) &&     // 🚗 Filtro estacionamento condicional
                           (!gym || h.Gym))                // 💪 Filtro academia condicional
                .ToListAsync();
        }

        /// <summary>
        /// 🏨 MÉTODO: Buscar hotéis com quartos disponíveis para período específico
        /// 
        /// 🎯 PROPÓSITO:
        /// Implementa busca integrada de hotéis considerando:
        /// - Disponibilidade real de quartos no período
        /// - Filtros de localização, estrelas e comodidades  
        /// - Faixa de preço das diárias
        /// - Capacidade para número de hóspedes
        /// 
        /// 🔍 LÓGICA COMPLEXA:
        /// 1. Carrega hotéis com seus quartos (Include)
        /// 2. Filtra por critérios básicos (localização, estrelas, comodidades)
        /// 3. Verifica se existem quartos disponíveis para o período
        /// 4. Considera capacidade para número de hóspedes
        /// 5. Aplica filtros de preço
        /// 
        /// 💾 CONCEITOS DEMONSTRADOS:
        /// - Include() para carregar relacionamentos
        /// - Any() para verificar existência  
        /// - Lógica condicional em LINQ
        /// - Filtros de data para verificar conflitos
        /// 
        /// ⚡ PERFORMANCE:
        /// - Include(h => h.Rooms) carrega quartos em uma query
        /// - Filtros aplicados no banco de dados
        /// - Índices recomendados: City, Stars, CheckIn/CheckOut nas reservas
        /// </summary>
        public async Task<IEnumerable<Hotel>> SearchAvailableHotelsAsync(
            string? destination,
            DateTime checkIn,
            DateTime checkOut,
            int guests,
            int? minStars = null,
            bool? wifi = null,
            bool? parking = null,
            decimal? minPrice = null,
            decimal? maxPrice = null)
        {
            return await _context.Hotels
                .Include(h => h.Rooms) // 🔗 Carrega quartos junto com hotéis
                .Where(h =>
                    // 📍 Filtro por destino (cidade) - opcional
                    (string.IsNullOrEmpty(destination) || h.City.ToLower().Contains(destination.ToLower())) &&

                    // ⭐ Filtro por classificação mínima - opcional  
                    (!minStars.HasValue || h.Stars >= minStars.Value) &&

                    // 📶 Filtro por WiFi - opcional
                    (!wifi.HasValue || !wifi.Value || h.Wifi) &&

                    // 🚗 Filtro por estacionamento - opcional
                    (!parking.HasValue || !parking.Value || h.Parking) &&

                    // 🏨 Verificação de quartos disponíveis
                    h.Rooms.Any(room =>
                        room.Available &&                           // ✅ Quarto marcado como disponível
                        room.Capacity >= guests &&                  // 👥 Capacidade suficiente para hóspedes

                        // 💰 Filtro de preço - opcional
                        (!minPrice.HasValue || room.AverageDailyPrice >= minPrice.Value) &&
                        (!maxPrice.HasValue || room.AverageDailyPrice <= maxPrice.Value)

                    // TODO: Verificar conflitos de reserva no período
                    // !_context.Reservations.Any(r => 
                    //     r.RoomId == room.RoomId &&
                    //     r.CheckIn < checkOut && r.CheckOut > checkIn)
                    )
                )
                .ToListAsync();
        }
    }

    /*
     🎓 GUIA COMPLETO - REPOSITORY PATTERN
     
     1. 🏗️ O QUE É UM REPOSITORY?
        - Padrão que encapsula lógica de acesso a dados
        - Camada entre Service e Entity Framework
        - Abstrai detalhes de persistência
        - Facilita testes (mock do repository)
     
     2. 🎯 RESPONSABILIDADES DO REPOSITORY:
        ✅ Encapsular queries SQL específicas
        ✅ Implementar filtros de domínio
        ✅ Otimizar performance de consultas
        ✅ Abstrair detalhes do Entity Framework
        ❌ NÃO conter lógica de negócio
        ❌ NÃO fazer validações de domínio
        ❌ NÃO coordenar múltiplas entidades
     
     3. 🔧 HERANÇA NO REPOSITORY:
        - Repository<Hotel>: Fornece CRUD básico (GetAllAsync, GetByIdAsync, etc.)
        - HotelRepository: Adiciona métodos específicos de Hotel
        - IHotelRepository: Define contrato específico
     
     4. 💾 ENTITY FRAMEWORK CORE PATTERNS:
        - _context.Hotels: DbSet<Hotel> para consultas
        - Where(): Traduzido para SQL WHERE
        - ToListAsync(): Materializa query e retorna dados
        - Include(): Carregar relacionamentos (não usado aqui para performance)
     
     5. ⚡ OTIMIZAÇÃO DE QUERIES:
        ✅ Filtros aplicados no banco (WHERE clause)
        ✅ Async/await para não bloquear thread
        ✅ ToListAsync() em vez de ToList()
        ✅ Queries específicas para cada caso de uso
        ❌ Evitar Select * quando desnecessário
        ❌ Não usar Include() desnecessariamente
     
     6. 🎨 PADRÕES DE QUERY LINQ:
        - Where(predicate): Filtro SQL
        - Select(projection): Projeção de campos
        - OrderBy(expression): Ordenação
        - Take(count): LIMIT no SQL
        - Skip(count): OFFSET no SQL
        - Include(navigation): JOIN com relacionamentos
     
     7. 🧠 LÓGICA CONDICIONAL EXPLICADA:
        (!wifi || h.Wifi) implementa "filtro opcional":
        
        Cenário 1: wifi = false (não quer filtrar por WiFi)
        (!false || h.Wifi) = (true || h.Wifi) = true (sempre inclui)
        
        Cenário 2: wifi = true (quer apenas hotéis com WiFi)
        (!true || h.Wifi) = (false || h.Wifi) = h.Wifi (só inclui se tem WiFi)
     
     8. 🧪 COMO TESTAR REPOSITORIES:
        - Mock do DbContext (complexo)
        - Usar InMemory database para testes
        - Testar queries SQL geradas
        - Verificar performance com dados reais
        
        Exemplo:    ```csharp
    [Test]
    public async Task GetHotelsByStarsAsync_Should_Filter_Correctly()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<AgenciaDbContext>()
            .UseInMemoryDatabase("TestDb").Options;
        
        // Act & Assert
        using var context = new AgenciaDbContext(options);
        var repository = new HotelRepository(context);
        var result = await repository.GetHotelsByStarsAsync(5);
        
        Assert.All(result, hotel => Assert.Equal(5, hotel.Stars));
    }```     
 9. 📊 INDICES RECOMENDADOS PARA PERFORMANCE: ```sql
-- Para GetHotelsByStarsAsync
CREATE INDEX IX_Hotels_Stars ON Hotels(Stars);

-- Para GetHotelsWithAmenitiesAsync
CREATE INDEX IX_Hotels_Amenities ON Hotels(Wifi, Parking, Gym);

-- Índice composto para filtros combinados
CREATE INDEX IX_Hotels_Stars_Amenities ON Hotels(Stars, Wifi, Parking, Gym);     10. 🚀 MELHORIAS FUTURAS PARA ESTUDAR:
         - Specification Pattern para queries complexas
         - Repository genérico com Expression<Func<T, bool>>
         - Cache de consultas frequentes
         - Projeções (Select) para retornar apenas campos necessários
         - Queries raw SQL para casos muito específicos
     
     📚 EXERCÍCIOS PARA PRATICAR:
     1. Implementar GetHotelsByLocationAsync(string location)
     2. Criar GetHotelsByPriceRangeAsync(decimal min, decimal max)
     3. Implementar GetTopRatedHotelsAsync(int count)
     4. Adicionar GetHotelsWithAvailableRoomsAsync(DateTime checkIn, DateTime checkOut)
     5. Criar GetHotelsNearLocationAsync(string location, double radiusKm)
     
     💡 DICAS IMPORTANTES:
     - Repository deve ser "burro" - apenas acesso a dados
     - Lógica de negócio fica no Service
     - Sempre usar async para operações de I/O
     - Preferir queries específicas a queries genéricas
     - Documentar SQL gerado para facilitar debug
     */
}
