using AutoMapper;
using ViagemImpacta.Models;
using ViagemImpacta.DTO.User;

namespace ViagemImpacta.Mappings.Profiles
{
    /// <summary>
    /// ?? AUTOMAPPER PROFILE - User
    /// 
    /// Profile espec�fico para mapeamentos relacionados a usu�rios.
    /// Foco na seguran�a e privacidade dos dados.
    /// 
    /// ?? RESPONSABILIDADES:
    /// - Mapeamentos User ? UserResponse (sem dados sens�veis)
    /// - Mapeamentos User ? UserListResponse
    /// - Configura��es de seguran�a e privacidade
    /// </summary>
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            ConfigureUserMappings();
        }

        /// <summary>
        /// Configura��es de mapeamento para User
        /// </summary>
        private void ConfigureUserMappings()
        {
            // ? MAPEAMENTO SEGURO: User ? UserResponse (SEM dados sens�veis)
            CreateMap<User, UserResponse>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.UserId))
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => $"{src.FirstName} {src.LastName}"))
                // Dados sens�veis s�o deliberadamente ignorados:
                // - Password n�o � mapeado (seguran�a)
                // - CPF n�o � mapeado (privacidade)
                // - Phone pode ser sens�vel dependendo do contexto
                .ForMember(dest => dest.Photo, opt => opt.MapFrom(src => src.Photo))
                .ForMember(dest => dest.Active, opt => opt.MapFrom(src => src.Active));

            // ? MAPEAMENTO PARA LISTAGEM
            CreateMap<User, UserListResponse>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.UserId))
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => $"{src.FirstName} {src.LastName}"))
                .ForMember(dest => dest.Active, opt => opt.MapFrom(src => src.Active));
        }
    }
}