namespace ViagemImpacta.DTO.Common
{
    /// <summary>
    /// ?? Response paginada gen�rica para qualquer entidade
    /// </summary>
    public class PaginatedResponse<T>
    {
        public List<T> Data { get; set; } = new();
        public int TotalItems { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalPages => (int)Math.Ceiling((double)TotalItems / PageSize);
        public bool HasNextPage => PageNumber < TotalPages;
        public bool HasPreviousPage => PageNumber > 1;
    }

    /// <summary>
    /// ?? Response base para opera��es de sucesso/erro
    /// </summary>
    public class BaseResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public List<string> Errors { get; set; } = new();
    }

    /// <summary>
    /// ?? Response para opera��es que retornam dados + status
    /// </summary>
    public class BaseResponse<T> : BaseResponse
    {
        public T? Data { get; set; }
    }
}