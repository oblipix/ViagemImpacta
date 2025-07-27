using ViagemImpacta.Models;

namespace ViagemImpacta.Repositories.Interfaces
{
   /// <summary>
   /// 📋 INTERFACE PARA ESTAGIÁRIOS - Repository de Hotéis
   /// 
   /// Esta interface define o contrato para operações específicas de hotéis,
   /// além das operações CRUD básicas herdadas de IRepository<Hotel>.
   /// 
   /// 🎯 CONCEITOS DEMONSTRADOS:
   /// - Interface Segregation Principle (ISP)
   /// - Herança de interfaces
   /// - Métodos específicos de domínio
   /// - Assinatura de métodos async
   /// 
   /// 🔍 MÉTODOS ESPECÍFICOS:
   /// Cada método representa uma consulta otimizada para um caso de uso específico
   /// </summary>
   public interface IHotelRepository : IRepository<Hotel>
   {
      /// <summary>
      /// 🎯 Busca hotéis por número de estrelas
      /// 
      /// PROPÓSITO: Filtrar hotéis por categoria/qualidade
      /// SQL: SELECT * FROM Hotels WHERE Stars = @stars
      /// </summary>
      /// <param name="stars">Número de estrelas (1-5)</param>
      /// <returns>Lista de hotéis da categoria especificada</returns>
      Task<IEnumerable<Hotel>> GetHotelsByStarsAsync(int stars);

      /// <summary>
      /// 🏨 Busca hotéis por comodidades específicas
      /// 
      /// PROPÓSITO: Filtrar hotéis que atendem necessidades específicas dos hóspedes
      /// 
      /// LÓGICA: Combina filtros com AND lógico
      /// - Se wifi=true: incluir apenas hotéis com WiFi
      /// - Se parking=true: incluir apenas hotéis com estacionamento  
      /// - Se gym=true: incluir apenas hotéis com academia
      /// - Se todos false: retorna todos os hotéis
      /// 
      /// SQL GERADO:
      /// SELECT * FROM Hotels 
      /// WHERE (@wifi = 0 OR Wifi = 1) 
      ///   AND (@parking = 0 OR Parking = 1) 
      ///   AND (@gym = 0 OR Gym = 1)
      /// 
      /// EXEMPLO DE USO:
      /// - GetHotelsWithAmenitiesAsync(true, false, false) → Apenas com WiFi
      /// - GetHotelsWithAmenitiesAsync(true, true, true)   → Com todas as comodidades
      /// </summary>
      /// <param name="wifi">Filtrar por WiFi gratuito</param>
      /// <param name="parking">Filtrar por estacionamento</param>
      /// <param name="gym">Filtrar por academia/fitness</param>
      /// <returns>Lista de hotéis que atendem aos critérios</returns>
      Task<IEnumerable<Hotel>> GetHotelsWithAmenitiesAsync(bool wifi, bool parking, bool gym);

      /// <summary>
      /// 🏨 Busca hotéis com quartos disponíveis para um período específico
      /// 
      /// PROPÓSITO: Integrar busca de hotéis com disponibilidade de quartos
      /// Considera reservas existentes para verificar disponibilidade real
      /// 
      /// LÓGICA: 
      /// - Busca hotéis que tenham pelo menos um quarto disponível
      /// - Verifica se não há conflitos de reserva no período solicitado
      /// - Filtra por critérios adicionais (localização, estrelas, comodidades, preço)
      /// 
      /// EXEMPLO DE USO:
      /// - SearchAvailableHotelsAsync("São Paulo", checkIn, checkOut, 2, 4, true, false, 100, 500)
      /// </summary>
      /// <param name="destination">Cidade/destino (opcional)</param>
      /// <param name="checkIn">Data de check-in</param>
      /// <param name="checkOut">Data de check-out</param>
      /// <param name="guests">Número de hóspedes</param>
      /// <param name="minStars">Classificação mínima (opcional)</param>
      /// <param name="wifi">Filtrar por WiFi (opcional)</param>
      /// <param name="parking">Filtrar por estacionamento (opcional)</param>
      /// <param name="minPrice">Preço mínimo da diária (opcional)</param>
      /// <param name="maxPrice">Preço máximo da diária (opcional)</param>
      /// <returns>Lista de hotéis com quartos disponíveis no período</returns>
      Task<IEnumerable<Hotel>> SearchAvailableHotelsAsync(
          string? destination,
          DateTime checkIn,
          DateTime checkOut,
          int guests,
          int? minStars = null,
          bool? wifi = null,
          bool? parking = null,
          decimal? minPrice = null,
          decimal? maxPrice = null);
   }

   /*
    🎓 CONCEITOS:

    1. 🏗️ HERANÇA DE INTERFACE:
       - IHotelRepository : IRepository<Hotel>
       - Herda todos os métodos CRUD básicos (GetAllAsync, GetByIdAsync, etc.)
       - Adiciona métodos específicos do domínio Hotel

    2. 🎯 INTERFACE SEGREGATION PRINCIPLE:
       - Interface pequena e focada
       - Apenas métodos específicos de Hotel
       - Evita interfaces "gordas" com muitos métodos

    3. 📝 DOCUMENTAÇÃO XML:
       - /// <summary> para descrição geral
       - /// <param> para documentar parâmetros
       - /// <returns> para descrever retorno
       - Exemplos de SQL gerado

    4. ⚡ ASYNC PATTERNS:
       - Todos os métodos retornam Task<T>
       - Suffix "Async" na nomenclatura
       - Permite operações não-bloqueantes

    5. 🔍 QUERY OPTIMIZATION:
       - Cada método tem propósito específico
       - SQL otimizado para cada caso de uso
       - Evita over-fetching de dados

    📚 EXERCÍCIOS PARA PRATICAR:
    1. Adicionar método GetHotelsByLocationAsync(string location)
    2. Implementar GetHotelsByPriceRangeAsync(decimal min, decimal max)
    3. Criar GetPopularHotelsAsync() (mais reservados)
    4. Implementar GetHotelsWithRoomsAvailableAsync(DateTime checkIn, DateTime checkOut)
    */
}
