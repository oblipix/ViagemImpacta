# 📂 Legacy Components & Tests

Esta pasta contém o código legacy do projeto ViagemImpacta, mantido para consulta e referência.

## 📁 Estrutura

### `/tests/` - Arquivos de Teste Legacy

- **SimpleTest.jsx** - Teste simples original
- **TestAtomicComponents.jsx** - Teste dos componentes atômicos
- **TestAtomicHotelDetails.jsx** - Teste da página de detalhes de hotel atômica
- **TestAuthAndUserPagesAtomic.jsx** - Teste das páginas de auth e usuário
- **TestBackendIntegration.jsx** - Teste de integração com backend
- **TestLandingPage.jsx** - Teste da landing page
- **TestNewAtomicPagesWithBackend.jsx** - Teste das novas páginas atômicas (MOVIDO PARA ATIVO)
- **Test\*SectionAtomic.jsx** - Testes de seções específicas

### `/components/` - Componentes Legacy

_Esta pasta será populada com componentes não-atômicos conforme a migração avança_

## 🎯 Componentes Ativos (Atomic Design)

Os seguintes componentes estão ATIVOS e localizados em `/src/components/`:

### ✅ Páginas Atômicas Prontas

- **LoginPageAtomic.jsx** - Página de login com backend integration
- **RegisterPageAtomic.jsx** - Página de registro com backend integration
- **UserProfilePageAtomic.jsx** - Página de perfil do usuário
- **ForgotPasswordPageAtomic.jsx** - Página de recuperação de senha
- **PackagesPageAtomic.jsx** - Página de pacotes de viagem
- **MyTravelsPageAtomic.jsx** - Página de minhas viagens
- **InstitutionalPageAtomic.jsx** - Página institucional

### 🏗️ Arquitetura Atômica

- **atoms/** - Componentes básicos reutilizáveis
- **molecules/** - Combinações de átomos
- **organisms/** - Componentes complexos
- **sections/** - Seções de página

### 🌐 Componentes Globais

### 🏗️ Componentes de Layout

- `Header.jsx` - Header original com navegação complexa (substituído por HeaderAtomic.jsx)
- **Footer.jsx** - Rodapé
- **HeroSwiper.jsx** - Carrossel principal

## 📋 Status da Migração

- ✅ **Páginas principais** migradas para Atomic Design
- ✅ **Backend integration** implementada
- ✅ **Padrão atômico** rigorosamente seguido
- 🚧 **Páginas secundárias** em processo de migração

## 🔄 Próximos Passos

1. Migrar componentes legacy restantes
2. Deprecar gradualmente páginas não-atômicas
3. Atualizar rotas para usar apenas versões atômicas
4. Remover dependências legacy

---

_Última atualização: 27 de Julho de 2025_
_Mantido para referência durante a transição para Atomic Design_
