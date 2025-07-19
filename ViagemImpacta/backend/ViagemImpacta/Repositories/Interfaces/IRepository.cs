﻿using System.Linq.Expressions;
using ViagemImpacta.Models;

namespace ApiCatalogo.Repositories
{
    public interface IRepository<T> where T : class
    {
    Task<IEnumerable<T>> GetAllAsync();
    Task<T?> GetByIdAsync(int id);
    Task<T> AddAsync(T entity);
    Task<T> UpdateAsync(T entity);
    Task<bool> DeleteAsync(int id);
    

    }
}