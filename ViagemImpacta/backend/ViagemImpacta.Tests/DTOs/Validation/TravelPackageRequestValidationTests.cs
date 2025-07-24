using FluentAssertions;
using System.ComponentModel.DataAnnotations;
using ViagemImpacta.DTO.TravelPackage;

namespace ViagemImpacta.Tests.DTOs.Validation
{
    /// <summary>
    /// ?? Testes unit�rios para valida��es de Data Annotations nos DTOs
    /// 
    /// ?? IMPORTANTE:
    /// Estes testes verificam se as Data Annotations est�o funcionando corretamente.
    /// Isso � crucial para valida��o de entrada nas APIs.
    /// </summary>
    public class TravelPackageRequestValidationTests
    {
        /// <summary>
        /// Helper method para executar valida��es
        /// </summary>
        private static IList<ValidationResult> ValidateModel(object model)
        {
            var validationResults = new List<ValidationResult>();
            var ctx = new ValidationContext(model, null, null);
            Validator.TryValidateObject(model, ctx, validationResults, true);
            return validationResults;
        }

        /// <summary>
        /// Teste: Verifica se um modelo v�lido passa na valida��o
        /// </summary>
        [Fact]
        public void TravelPackageRequest_ValidModel_ShouldPassValidation()
        {
            // Arrange
            var request = new TravelPackageRequest
            {
                Title = "Pacote V�lido",
                Description = "Uma descri��o v�lida",
                Destination = "Rio de Janeiro",
                Price = 1500.00m,
                IsPromotion = false,
                StartDate = DateTime.Now.AddDays(30),
                EndDate = DateTime.Now.AddDays(37)
            };

            // Act
            var validationResults = ValidateModel(request);

            // Assert
            validationResults.Should().BeEmpty();
        }

        /// <summary>
        /// Teste: Verifica valida��o Required para Title
        /// </summary>
        [Fact]
        public void TravelPackageRequest_EmptyTitle_ShouldFailValidation()
        {
            // Arrange
            var request = new TravelPackageRequest
            {
                Title = "", // ? Inv�lido
                Destination = "Rio de Janeiro",
                Price = 1500.00m,
                StartDate = DateTime.Now.AddDays(30),
                EndDate = DateTime.Now.AddDays(37)
            };

            // Act
            var validationResults = ValidateModel(request);

            // Assert
            validationResults.Should().NotBeEmpty();
            validationResults.Should().Contain(v => v.ErrorMessage!.Contains("T�tulo � obrigat�rio"));
        }

        /// <summary>
        /// Teste: Verifica valida��o StringLength para Title
        /// </summary>
        [Fact]
        public void TravelPackageRequest_TitleTooLong_ShouldFailValidation()
        {
            // Arrange
            var longTitle = new string('A', 201); // 201 caracteres (limite � 200)
            var request = new TravelPackageRequest
            {
                Title = longTitle, // ? Inv�lido
                Destination = "Rio de Janeiro",
                Price = 1500.00m,
                StartDate = DateTime.Now.AddDays(30),
                EndDate = DateTime.Now.AddDays(37)
            };

            // Act
            var validationResults = ValidateModel(request);

            // Assert
            validationResults.Should().NotBeEmpty();
            validationResults.Should().Contain(v => v.ErrorMessage!.Contains("200 caracteres"));
        }

        /// <summary>
        /// Teste: Verifica valida��o Required para Destination
        /// </summary>
        [Fact]
        public void TravelPackageRequest_EmptyDestination_ShouldFailValidation()
        {
            // Arrange
            var request = new TravelPackageRequest
            {
                Title = "Pacote Teste",
                Destination = "", // ? Inv�lido
                Price = 1500.00m,
                StartDate = DateTime.Now.AddDays(30),
                EndDate = DateTime.Now.AddDays(37)
            };

            // Act
            var validationResults = ValidateModel(request);

            // Assert
            validationResults.Should().NotBeEmpty();
            validationResults.Should().Contain(v => v.ErrorMessage!.Contains("Destino � obrigat�rio"));
        }

        /// <summary>
        /// Teste: Verifica valida��o Range para Price
        /// </summary>
        [Theory]
        [InlineData(0)]      // ? Zero n�o � v�lido
        [InlineData(-1)]     // ? Negativo n�o � v�lido
        [InlineData(-100)]   // ? Negativo n�o � v�lido
        public void TravelPackageRequest_InvalidPrice_ShouldFailValidation(decimal invalidPrice)
        {
            // Arrange
            var request = new TravelPackageRequest
            {
                Title = "Pacote Teste",
                Destination = "Teste",
                Price = invalidPrice, // ? Inv�lido
                StartDate = DateTime.Now.AddDays(30),
                EndDate = DateTime.Now.AddDays(37)
            };

            // Act
            var validationResults = ValidateModel(request);

            // Assert
            validationResults.Should().NotBeEmpty();
            validationResults.Should().Contain(v => v.ErrorMessage!.Contains("maior que zero"));
        }

        /// <summary>
        /// Teste: Verifica valida��o Range para Price com valores v�lidos
        /// </summary>
        [Theory]
        [InlineData(0.01)]   // ? M�nimo v�lido
        [InlineData(1)]      // ? V�lido
        [InlineData(1000)]   // ? V�lido
        [InlineData(99999)]  // ? V�lido
        public void TravelPackageRequest_ValidPrice_ShouldPassValidation(decimal validPrice)
        {
            // Arrange
            var request = new TravelPackageRequest
            {
                Title = "Pacote Teste",
                Destination = "Teste",
                Price = validPrice, // ? V�lido
                StartDate = DateTime.Now.AddDays(30),
                EndDate = DateTime.Now.AddDays(37)
            };

            // Act
            var validationResults = ValidateModel(request);

            // Assert
            // N�o deve ter erros relacionados ao pre�o
            validationResults.Should().NotContain(v => v.ErrorMessage!.Contains("maior que zero"));
        }

        /// <summary>
        /// Teste: Verifica valida��o FutureDate para StartDate
        /// </summary>
        [Fact]
        public void TravelPackageRequest_PastStartDate_ShouldFailValidation()
        {
            // Arrange
            var request = new TravelPackageRequest
            {
                Title = "Pacote Teste",
                Destination = "Teste",
                Price = 1000,
                StartDate = DateTime.Now.AddDays(-1), // ? Data no passado
                EndDate = DateTime.Now.AddDays(5)
            };

            // Act
            var validationResults = ValidateModel(request);

            // Assert
            validationResults.Should().NotBeEmpty();
            validationResults.Should().Contain(v => v.ErrorMessage!.Contains("deve ser futura"));
        }

        /// <summary>
        /// Teste: Verifica valida��o DateGreaterThan para EndDate
        /// </summary>
        [Fact]
        public void TravelPackageRequest_EndDateBeforeStartDate_ShouldFailValidation()
        {
            // Arrange
            var startDate = DateTime.Now.AddDays(10);
            var endDate = DateTime.Now.AddDays(5); // ? Anterior ao StartDate

            var request = new TravelPackageRequest
            {
                Title = "Pacote Teste",
                Destination = "Teste",
                Price = 1000,
                StartDate = startDate,
                EndDate = endDate // ? Inv�lido
            };

            // Act
            var validationResults = ValidateModel(request);

            // Assert
            validationResults.Should().NotBeEmpty();
            validationResults.Should().Contain(v => v.ErrorMessage!.Contains("posterior � data de in�cio"));
        }

        /// <summary>
        /// Teste: Verifica valida��o StringLength para Description
        /// </summary>
        [Fact]
        public void TravelPackageRequest_DescriptionTooLong_ShouldFailValidation()
        {
            // Arrange
            var longDescription = new string('X', 1001); // 1001 caracteres (limite � 1000)
            var request = new TravelPackageRequest
            {
                Title = "Pacote Teste",
                Destination = "Teste",
                Price = 1000,
                Description = longDescription, // ? Inv�lido
                StartDate = DateTime.Now.AddDays(10),
                EndDate = DateTime.Now.AddDays(15)
            };

            // Act
            var validationResults = ValidateModel(request);

            // Assert
            validationResults.Should().NotBeEmpty();
            validationResults.Should().Contain(v => v.ErrorMessage!.Contains("1000 caracteres"));
        }

        /// <summary>
        /// Teste: Verifica que Description pode ser nula
        /// </summary>
        [Fact]
        public void TravelPackageRequest_NullDescription_ShouldPassValidation()
        {
            // Arrange
            var request = new TravelPackageRequest
            {
                Title = "Pacote Teste",
                Destination = "Teste",
                Price = 1000,
                Description = null, // ? Permitido
                StartDate = DateTime.Now.AddDays(10),
                EndDate = DateTime.Now.AddDays(15)
            };

            // Act
            var validationResults = ValidateModel(request);

            // Assert
            validationResults.Should().NotContain(v => v.ErrorMessage!.Contains("Descri��o"));
        }

        /// <summary>
        /// Teste: Verifica m�ltiplos erros de valida��o
        /// </summary>
        [Fact]
        public void TravelPackageRequest_MultipleErrors_ShouldReturnAllErrors()
        {
            // Arrange
            var request = new TravelPackageRequest
            {
                Title = "", // ? Vazio
                Destination = "", // ? Vazio
                Price = 0, // ? Zero
                StartDate = DateTime.Now.AddDays(-1), // ? Passado
                EndDate = DateTime.Now.AddDays(-2) // ? Anterior ao start
            };

            // Act
            var validationResults = ValidateModel(request);

            // Assert
            validationResults.Should().NotBeEmpty();
            validationResults.Count.Should().BeGreaterThanOrEqualTo(4); // Corrigido
        }
    }
}