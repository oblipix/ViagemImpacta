@echo off
echo ========================================
echo    VIAGEM IMPACTA - PERFORMANCE TEST
echo ========================================
echo.
echo Verificando se a API esta rodando...
curl -s http://localhost:5155/api/debug/test-failfast?destination=Rio > nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERRO: API não está rodando em http://localhost:5155
    echo.
    echo Por favor, execute o backend primeiro:
    echo   cd backend/ViagemImpacta
    echo   dotnet run
    echo.
    pause
    exit /b 1
)

echo ✅ API encontrada! Iniciando teste de performance...
echo.
dotnet run

echo.
echo Teste concluído! Pressione qualquer tecla para sair.
pause > nul
