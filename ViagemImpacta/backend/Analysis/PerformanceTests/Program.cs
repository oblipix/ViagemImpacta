using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using System.Diagnostics;
using System.Text.Json;
using System.Net;

namespace PerformanceTests;

public class Program
{
    private static readonly HttpClient _httpClient = new HttpClient()
    {
        Timeout = TimeSpan.FromSeconds(30) // Timeout para evitar travamentos
    };
    private static ILogger<Program>? _logger;
    private static IConfiguration? _config;
    private static string _baseUrl = "https://localhost:7010"  ;
    private static int _concurrentUsers = 500;
    private static int _testDurationMinutes = 1;

    public static async Task Main(string[] args)
    {
        // Configurar logging e configurações
        using var host = Host.CreateDefaultBuilder(args)
            .ConfigureAppConfiguration((context, config) =>
            {
                config.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            })
            .ConfigureServices(services =>
            {
                services.AddLogging(builder =>
                {
                    builder.AddConsole();
                    builder.SetMinimumLevel(LogLevel.Information);
                });
            })
            .Build();

        _logger = host.Services.GetRequiredService<ILogger<Program>>();
        _config = host.Services.GetRequiredService<IConfiguration>();

        // Carregar configurações
        _baseUrl = _config["PerformanceTest:BaseUrl"] ?? _baseUrl;
        _concurrentUsers = _config.GetValue<int>("PerformanceTest:ConcurrentUsers", 500);
        _testDurationMinutes = _config.GetValue<int>("PerformanceTest:TestDurationMinutes", 1);

        Console.WriteLine("🚀 VIAGEM IMPACTA - TESTE DE PERFORMANCE SISTEMA DE BUSCA");
        Console.WriteLine("================================================================");
        Console.WriteLine($"🎯 Target: {_baseUrl}");
        Console.WriteLine($"👥 Simulating: {_concurrentUsers} concurrent users");
        Console.WriteLine($"⏱️  Duration: {_testDurationMinutes} minute(s)");
        Console.WriteLine("================================================================\n");

        // Verificar se a API está rodando
        if (!await CheckApiHealth())
        {
            Console.WriteLine("❌ API não está respondendo. Certifique-se que está rodando em http://localhost:5155");
            return;
        }

        // FASE 0: Popular banco com dados de teste
        Console.WriteLine("🌱 FASE 0: Populando banco com dados de teste...");
        await SeedTestData();

        // Executar testes sequenciais
        Console.WriteLine("🔥 FASE 1: Teste de Aquecimento (Warm-up)");
        await WarmUpTest();

        Console.WriteLine("\n💥 FASE 2: Teste de Carga ({0} usuários simultâneos)", _concurrentUsers);
        await LoadTest();

        Console.WriteLine("\n🚨 FASE 3: Teste de Sobrecarga (Overload)");
        await OverloadTest();

        Console.WriteLine("\n🎯 FASE 4: Teste Específico de Buscas Complexas");
        await ComplexSearchTest();

        // FASE 5: Limpar dados de teste
        Console.WriteLine("\n🧹 FASE 5: Limpando dados de teste...");
        await CleanupTestData();

        Console.WriteLine("\n📊 Teste completo! Verifique o Application Insights para métricas detalhadas.");
        Console.WriteLine("🔗 Portal Azure: https://portal.azure.com -> Application Insights -> ApplicationId: 4e6bcfea-2904-4266-b125-36d689887340");
    }

    static async Task<bool> CheckApiHealth()
    {
        try
        {
            var response = await _httpClient.GetAsync($"{_baseUrl}/api/hotels/search?destination=Rio");
            _logger?.LogInformation("✅ API Health Check: {StatusCode}", response.StatusCode);
            return response.IsSuccessStatusCode;
        }
        catch (Exception ex)
        {
            _logger?.LogError(ex, "❌ API Health Check Failed");
            return false;
        }
    }

    static async Task SeedTestData()
    {
        try
        {
            Console.WriteLine("   📊 Criando dados de teste...");
            
            // Criar hotéis de teste
            var hotels = new[]
            {
                new { Name = "Hotel Copacabana Palace", City = "Rio de Janeiro", Stars = 5, Amenities = new[] { "WiFi", "Pool", "Restaurant", "Bar", "RoomService" } },
                new { Name = "Hotel Ipanema Beach", City = "Rio de Janeiro", Stars = 4, Amenities = new[] { "WiFi", "Pool", "Restaurant" } },
                new { Name = "Hotel Leblon Luxury", City = "Rio de Janeiro", Stars = 5, Amenities = new[] { "WiFi", "Pool", "Restaurant", "Bar", "RoomService", "Accessibility" } },
                new { Name = "Hotel São Paulo Center", City = "São Paulo", Stars = 4, Amenities = new[] { "WiFi", "Restaurant", "Bar" } },
                new { Name = "Hotel Paulista Business", City = "São Paulo", Stars = 3, Amenities = new[] { "WiFi", "Restaurant" } },
                new { Name = "Hotel Jardins Premium", City = "São Paulo", Stars = 5, Amenities = new[] { "WiFi", "Pool", "Restaurant", "Bar", "RoomService", "BreakfastIncludes" } },
                new { Name = "Hotel Brasília Palace", City = "Brasília", Stars = 4, Amenities = new[] { "WiFi", "Pool", "Restaurant" } },
                new { Name = "Hotel Asa Norte", City = "Brasília", Stars = 3, Amenities = new[] { "WiFi", "Restaurant" } },
                new { Name = "Hotel Plano Piloto", City = "Brasília", Stars = 5, Amenities = new[] { "WiFi", "Pool", "Restaurant", "Bar", "RoomService", "Accessibility" } },
                new { Name = "Hotel Salvador Beach", City = "Salvador", Stars = 4, Amenities = new[] { "WiFi", "Pool", "Restaurant", "Bar" } },
                new { Name = "Hotel Pelourinho", City = "Salvador", Stars = 3, Amenities = new[] { "WiFi", "Restaurant" } },
                new { Name = "Hotel Fortaleza Ocean", City = "Fortaleza", Stars = 4, Amenities = new[] { "WiFi", "Pool", "Restaurant", "Bar" } },
                new { Name = "Hotel Beira Mar", City = "Fortaleza", Stars = 3, Amenities = new[] { "WiFi", "Pool", "Restaurant" } },
                new { Name = "Hotel Recife Antigo", City = "Recife", Stars = 4, Amenities = new[] { "WiFi", "Restaurant", "Bar" } },
                new { Name = "Hotel Boa Viagem", City = "Recife", Stars = 3, Amenities = new[] { "WiFi", "Pool", "Restaurant" } },
                new { Name = "Hotel Belo Horizonte Center", City = "Belo Horizonte", Stars = 4, Amenities = new[] { "WiFi", "Restaurant", "Bar" } },
                new { Name = "Hotel Savassi", City = "Belo Horizonte", Stars = 3, Amenities = new[] { "WiFi", "Restaurant" } },
                new { Name = "Hotel Curitiba Business", City = "Curitiba", Stars = 4, Amenities = new[] { "WiFi", "Restaurant", "Bar" } },
                new { Name = "Hotel Batel", City = "Curitiba", Stars = 3, Amenities = new[] { "WiFi", "Restaurant" } },
                new { Name = "Hotel Porto Alegre Center", City = "Porto Alegre", Stars = 4, Amenities = new[] { "WiFi", "Pool", "Restaurant", "Bar" } }
            };

            foreach (var hotel in hotels)
            {
                var hotelData = new
                {
                    Name = hotel.Name,
                    City = hotel.City,
                    Stars = hotel.Stars,
                    Amenities = string.Join(",", hotel.Amenities)
                };

                var response = await _httpClient.PostAsync($"{_baseUrl}/api/debug/seed-hotel", 
                    new StringContent(JsonSerializer.Serialize(hotelData), System.Text.Encoding.UTF8, "application/json"));
                
                if (response.IsSuccessStatusCode)
                {
                    Console.WriteLine($"   ✅ Criado: {hotel.Name} ({hotel.City}) - {hotel.Stars}⭐");
                }
                else
                {
                    Console.WriteLine($"   ❌ Falha ao criar: {hotel.Name}");
                }
            }

            Console.WriteLine("   🎯 Dados de teste criados com sucesso!");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"   ❌ Erro ao criar dados de teste: {ex.Message}");
        }
    }

    static async Task CleanupTestData()
    {
        try
        {
            Console.WriteLine("   🧹 Limpando dados de teste...");
            
            var response = await _httpClient.PostAsync($"{_baseUrl}/api/debug/cleanup-test-data", null);
            
            if (response.IsSuccessStatusCode)
            {
                Console.WriteLine("   ✅ Dados de teste removidos com sucesso!");
            }
            else
            {
                Console.WriteLine($"   ❌ Falha ao limpar dados: {response.StatusCode}");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"   ❌ Erro ao limpar dados de teste: {ex.Message}");
        }
    }

    static async Task WarmUpTest()
    {
        var endpoints = GetSearchTestEndpoints();
        var results = new List<TestResult>();

        _logger?.LogInformation("🔥 Iniciando warm-up com 10 requests sequenciais...");

        for (int i = 1; i <= 10; i++)
        {
            var endpoint = endpoints[i % endpoints.Length];
            var result = await ExecuteRequest(endpoint, i, "WarmUp");
            results.Add(result);

            Console.WriteLine($"   Request {i}: {endpoint.Name} - {result.Duration:F0}ms {(result.Success ? "✅" : "❌")}");
            await Task.Delay(100); // Pequena pausa entre requests
        }

        PrintResults("WARM-UP", results);
    }

    static async Task LoadTest()
    {
        var endpoints = GetSearchTestEndpoints();
        var results = new List<TestResult>();
        var endTime = DateTime.Now.AddMinutes(_testDurationMinutes);

        _logger?.LogInformation("💥 Iniciando load test com {0} usuários simultâneos...", _concurrentUsers);

        var tasks = new List<Task>();
        for (int i = 1; i <= _concurrentUsers; i++)
        {
            tasks.Add(SimulateUser(i, endpoints, endTime, results));
        }

        await Task.WhenAll(tasks);

        PrintResults("LOAD TEST", results);
    }

    static async Task OverloadTest()
    {
        var endpoints = GetSearchTestEndpoints();
        var results = new List<TestResult>();
        var endTime = DateTime.Now.AddMinutes(_testDurationMinutes);

        _logger?.LogInformation("🚨 Iniciando overload test com {0} requests simultâneos...", _concurrentUsers * 2);

        var tasks = new List<Task>();
        for (int i = 1; i <= _concurrentUsers * 2; i++)
        {
            tasks.Add(SimulateUser(i, endpoints, endTime, results));
        }

        await Task.WhenAll(tasks);

        PrintResults("OVERLOAD TEST", results);
    }

    static async Task ComplexSearchTest()
    {
        var complexEndpoints = GetComplexSearchEndpoints();
        var results = new List<TestResult>();
        var endTime = DateTime.Now.AddMinutes(_testDurationMinutes);

        _logger?.LogInformation("🎯 Iniciando teste de buscas complexas com {0} usuários...", _concurrentUsers);

        var tasks = new List<Task>();
        for (int i = 1; i <= _concurrentUsers; i++)
        {
            tasks.Add(SimulateUser(i, complexEndpoints, endTime, results));
        }

        await Task.WhenAll(tasks);

        PrintResults("COMPLEX SEARCH TEST", results);
    }

    static async Task SimulateUser(int userId, TestEndpoint[] endpoints, DateTime endTime, List<TestResult> results)
    {
        var random = new Random(userId);
        var requestId = 0;

        while (DateTime.Now < endTime)
        {
            var endpoint = endpoints[random.Next(endpoints.Length)];
            requestId++;

            var result = await ExecuteRequest(endpoint, requestId, "User" + userId);
            lock (results)
            {
                results.Add(result);
            }

            // Delay aleatório entre requests (simula comportamento real do usuário)
            var delay = random.Next(200, 1000);
            await Task.Delay(delay);
        }
    }

    static async Task<TestResult> ExecuteRequest(TestEndpoint endpoint, int requestId, string phase)
    {
        var startTime = DateTime.Now;
        var stopwatch = Stopwatch.StartNew();

        try
        {
            var response = await _httpClient.GetAsync($"{_baseUrl}{endpoint.Path}");
            stopwatch.Stop();

            var content = await response.Content.ReadAsStringAsync();
            var responseSize = System.Text.Encoding.UTF8.GetByteCount(content);

            return new TestResult
            {
                RequestId = requestId,
                Phase = phase,
                EndpointName = endpoint.Name,
                Path = endpoint.Path,
                StatusCode = (int)response.StatusCode,
                Duration = stopwatch.ElapsedMilliseconds,
                Success = response.IsSuccessStatusCode,
                Timestamp = startTime,
                ResponseSize = responseSize
            };
        }
        catch (Exception ex)
        {
            stopwatch.Stop();
            return new TestResult
            {
                RequestId = requestId,
                Phase = phase,
                EndpointName = endpoint.Name,
                Path = endpoint.Path,
                StatusCode = 0,
                Duration = stopwatch.ElapsedMilliseconds,
                Success = false,
                Timestamp = startTime,
                Error = ex.Message
            };
        }
    }

    static TestEndpoint[] GetSearchTestEndpoints()
    {
        return new[]
        {
            // Buscas básicas (devem ser ~100-300ms)
            new TestEndpoint("Busca Básica Rio", "/api/hotels/search?destination=Rio"),
            new TestEndpoint("Busca SP com Stars", "/api/hotels/search?destination=São Paulo&stars=4"),
            new TestEndpoint("Busca Brasília Range", "/api/hotels/search?destination=Brasília&minPrice=200&maxPrice=800"),
            new TestEndpoint("Busca Salvador Guests", "/api/hotels/search?destination=Salvador&guests=2"),
            new TestEndpoint("Busca Complexa", "/api/hotels/search?destination=Rio&stars=5&minPrice=300&maxPrice=1000&guests=2"),
            
            // Buscas com amenities (devem ser ~150-400ms)
            new TestEndpoint("Busca com WiFi", "/api/hotels/search?destination=Rio&amenities=WiFi"),
            new TestEndpoint("Busca com Pool", "/api/hotels/search?destination=São Paulo&amenities=Pool"),
            new TestEndpoint("Busca com Restaurant", "/api/hotels/search?destination=Brasília&amenities=Restaurant"),
            new TestEndpoint("Busca com Bar", "/api/hotels/search?destination=Salvador&amenities=Bar"),
            new TestEndpoint("Busca com RoomService", "/api/hotels/search?destination=Fortaleza&amenities=RoomService"),
            
            // Buscas com múltiplas amenities
            new TestEndpoint("Busca WiFi+Pool", "/api/hotels/search?destination=Rio&amenities=WiFi&amenities=Pool"),
            new TestEndpoint("Busca Restaurant+Bar", "/api/hotels/search?destination=São Paulo&amenities=Restaurant&amenities=Bar"),
            new TestEndpoint("Busca WiFi+Pool+Restaurant", "/api/hotels/search?destination=Brasília&amenities=WiFi&amenities=Pool&amenities=Restaurant"),
            
            // Buscas com room types
            new TestEndpoint("Busca Suite", "/api/hotels/search?destination=Rio&roomType=Suite"),
            new TestEndpoint("Busca Standard", "/api/hotels/search?destination=São Paulo&roomType=Standard"),
            new TestEndpoint("Busca Luxo", "/api/hotels/search?destination=Brasília&roomType=Luxo"),
            
            // Buscas com datas
            new TestEndpoint("Busca com Check-in", "/api/hotels/search?destination=Rio&checkIn=2025-08-15"),
            new TestEndpoint("Busca com Check-out", "/api/hotels/search?destination=São Paulo&checkOut=2025-08-20"),
            new TestEndpoint("Busca com Datas", "/api/hotels/search?destination=Brasília&checkIn=2025-08-15&checkOut=2025-08-20"),
            
            // Buscas em português
            new TestEndpoint("Busca WiFi PT", "/api/hotels/search?destination=Rio&amenities=WiFi"),
            new TestEndpoint("Busca Piscina PT", "/api/hotels/search?destination=São Paulo&amenities=Piscina"),
            new TestEndpoint("Busca Restaurante PT", "/api/hotels/search?destination=Brasília&amenities=Restaurante"),
            
            // Mix de cenários
            new TestEndpoint("Busca Fortaleza", "/api/hotels/search?destination=Fortaleza&stars=3"),
            new TestEndpoint("Busca Recife Budget", "/api/hotels/search?destination=Recife&maxPrice=400"),
            new TestEndpoint("Busca Belo Horizonte", "/api/hotels/search?destination=Belo Horizonte&stars=4&minPrice=200"),
            new TestEndpoint("Busca Curitiba", "/api/hotels/search?destination=Curitiba&guests=3&maxPrice=600"),
            new TestEndpoint("Busca Porto Alegre", "/api/hotels/search?destination=Porto Alegre&stars=5&amenities=WiFi")
        };
    }

    static TestEndpoint[] GetComplexSearchEndpoints()
    {
        return new[]
        {
            // Buscas complexas com múltiplos filtros
            new TestEndpoint("Busca Complexa 1", "/api/hotels/search?destination=Rio&stars=5&minPrice=300&maxPrice=1000&guests=2&amenities=WiFi&amenities=Pool&roomType=Suite"),
            new TestEndpoint("Busca Complexa 2", "/api/hotels/search?destination=São Paulo&stars=4&minPrice=200&maxPrice=800&guests=3&amenities=Restaurant&amenities=Bar&checkIn=2025-08-15&checkOut=2025-08-20"),
            new TestEndpoint("Busca Complexa 3", "/api/hotels/search?destination=Brasília&stars=3&minPrice=150&maxPrice=600&guests=4&amenities=WiFi&amenities=RoomService&roomType=Standard"),
            new TestEndpoint("Busca Complexa 4", "/api/hotels/search?destination=Salvador&stars=5&minPrice=400&maxPrice=1200&guests=2&amenities=WiFi&amenities=Pool&amenities=Restaurant&amenities=Bar"),
            new TestEndpoint("Busca Complexa 5", "/api/hotels/search?destination=Fortaleza&stars=4&minPrice=250&maxPrice=900&guests=3&amenities=WiFi&amenities=Pool&roomType=Luxo&checkIn=2025-08-10&checkOut=2025-08-15"),
            
            // Buscas com amenities em português
            new TestEndpoint("Busca Complexa PT 1", "/api/hotels/search?destination=Rio&stars=4&amenities=WiFi&amenities=Piscina&amenities=Restaurante"),
            new TestEndpoint("Busca Complexa PT 2", "/api/hotels/search?destination=São Paulo&stars=5&amenities=Piscina&amenities=Bar&amenities=Serviço de Quarto"),
            new TestEndpoint("Busca Complexa PT 3", "/api/hotels/search?destination=Brasília&stars=3&amenities=WiFi&amenities=Restaurante&amenities=Café da Manhã Incluído"),
            
            // Buscas com case-insensitive
            new TestEndpoint("Busca Case Insensitive 1", "/api/hotels/search?destination=rio&amenities=wifi&amenities=pool"),
            new TestEndpoint("Busca Case Insensitive 2", "/api/hotels/search?destination=SÃO PAULO&amenities=RESTAURANT&amenities=BAR"),
            new TestEndpoint("Busca Case Insensitive 3", "/api/hotels/search?destination=brasilia&amenities=wifi&amenities=roomservice"),
            
            // Buscas com preços extremos
            new TestEndpoint("Busca Preço Alto", "/api/hotels/search?destination=Rio&minPrice=1000&maxPrice=5000&stars=5"),
            new TestEndpoint("Busca Preço Baixo", "/api/hotels/search?destination=São Paulo&maxPrice=100&stars=1"),
            new TestEndpoint("Busca Preço Médio", "/api/hotels/search?destination=Brasília&minPrice=300&maxPrice=700&stars=3"),
            
            // Buscas com muitos guests
            new TestEndpoint("Busca Muitos Guests", "/api/hotels/search?destination=Rio&guests=6&stars=4"),
            new TestEndpoint("Busca Poucos Guests", "/api/hotels/search?destination=São Paulo&guests=1&stars=3"),
            
            // Buscas com datas específicas
            new TestEndpoint("Busca Datas Específicas 1", "/api/hotels/search?destination=Rio&checkIn=2025-12-25&checkOut=2025-12-30&stars=5"),
            new TestEndpoint("Busca Datas Específicas 2", "/api/hotels/search?destination=São Paulo&checkIn=2025-01-01&checkOut=2025-01-05&amenities=WiFi"),
            new TestEndpoint("Busca Datas Específicas 3", "/api/hotels/search?destination=Brasília&checkIn=2025-06-15&checkOut=2025-06-20&roomType=Suite")
        };
    }

    static void PrintResults(string testName, List<TestResult> results)
    {
        if (!results.Any()) return;

        var successful = results.Where(r => r.Success).ToList();
        var failed = results.Where(r => !r.Success).ToList();

        Console.WriteLine($"\n📊 {testName} RESULTS:");
        Console.WriteLine("================================");
        Console.WriteLine($"Total Requests: {results.Count}");
        Console.WriteLine($"✅ Successful: {successful.Count} ({(double)successful.Count / results.Count * 100:F1}%)");
        Console.WriteLine($"❌ Failed: {failed.Count} ({(double)failed.Count / results.Count * 100:F1}%)");

        if (successful.Any())
        {
            Console.WriteLine($"⚡ Response Times:");
            Console.WriteLine($"   • Average: {successful.Average(r => r.Duration):F0}ms");
            Console.WriteLine($"   • Minimum: {successful.Min(r => r.Duration):F0}ms");
            Console.WriteLine($"   • Maximum: {successful.Max(r => r.Duration):F0}ms");
            Console.WriteLine($"   • P95: {GetPercentile(successful.Select(r => r.Duration).ToList(), 95):F0}ms");
            Console.WriteLine($"   • P99: {GetPercentile(successful.Select(r => r.Duration).ToList(), 99):F0}ms");

            Console.WriteLine($"📦 Response Sizes:");
            Console.WriteLine($"   • Average: {successful.Average(r => r.ResponseSize):F0} bytes");
            Console.WriteLine($"   • Total: {(successful.Sum(r => r.ResponseSize) / 1024.0 / 1024.0):F2} MB");
        }

        // Mostra performance por endpoint
        var endpointStats = successful.GroupBy(r => r.EndpointName)
            .Select(g => new
            {
                Name = g.Key,
                Count = g.Count(),
                AvgTime = g.Average(r => r.Duration),
                MinTime = g.Min(r => r.Duration),
                MaxTime = g.Max(r => r.Duration),
                AvgSize = g.Average(r => r.ResponseSize)
            })
            .OrderBy(s => s.AvgTime);

        Console.WriteLine($"\n🎯 Performance por Endpoint:");
        foreach (var stat in endpointStats)
        {
            Console.WriteLine($"   {stat.Name}: {stat.Count} reqs | Avg: {stat.AvgTime:F0}ms | Size: {stat.AvgSize:F0}B | Range: {stat.MinTime:F0}-{stat.MaxTime:F0}ms");
        }

        // Análise de performance por tipo de busca
        var basicSearches = successful.Where(r => !r.EndpointName.Contains("Complexa") && !r.EndpointName.Contains("PT") && !r.EndpointName.Contains("Case")).ToList();
        var complexSearches = successful.Where(r => r.EndpointName.Contains("Complexa")).ToList();
        var amenitySearches = successful.Where(r => r.EndpointName.Contains("amenities") || r.EndpointName.Contains("WiFi") || r.EndpointName.Contains("Pool") || r.EndpointName.Contains("Restaurant")).ToList();

        if (basicSearches.Any())
        {
            Console.WriteLine($"\n🔍 Buscas Básicas: {basicSearches.Count} reqs | Avg: {basicSearches.Average(r => r.Duration):F0}ms");
        }
        if (complexSearches.Any())
        {
            Console.WriteLine($"🎯 Buscas Complexas: {complexSearches.Count} reqs | Avg: {complexSearches.Average(r => r.Duration):F0}ms");
        }
        if (amenitySearches.Any())
        {
            Console.WriteLine($"🏊 Buscas com Amenities: {amenitySearches.Count} reqs | Avg: {amenitySearches.Average(r => r.Duration):F0}ms");
        }

        Console.WriteLine("");
    }

    static double GetPercentile(List<double> values, int percentile)
    {
        if (!values.Any()) return 0;

        values.Sort();
        int index = (int)Math.Ceiling(values.Count * percentile / 100.0) - 1;
        return values[Math.Max(0, Math.Min(index, values.Count - 1))];
    }
}

public record TestEndpoint(string Name, string Path);

public class TestResult
{
    public int RequestId { get; set; }
    public string Phase { get; set; } = "";
    public string EndpointName { get; set; } = "";
    public string Path { get; set; } = "";
    public int StatusCode { get; set; }
    public double Duration { get; set; }
    public bool Success { get; set; }
    public DateTime Timestamp { get; set; }
    public int ResponseSize { get; set; }
    public string? Error { get; set; }
}
