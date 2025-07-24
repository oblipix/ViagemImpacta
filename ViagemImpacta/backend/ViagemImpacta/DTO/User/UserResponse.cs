namespace ViagemImpacta.DTO.User
{
    /// <summary>
    /// ?? Response para User (SEM dados sens�veis)
    /// </summary>
    public class UserResponse
    {
        public long Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public int Age { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Photo { get; set; } = string.Empty;
        public bool Active { get; set; }
    }

    /// <summary>
    /// ?? Response para listagem de usu�rios (dados resumidos)
    /// </summary>
    public class UserListResponse
    {
        public long Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public bool Active { get; set; }
    }
}