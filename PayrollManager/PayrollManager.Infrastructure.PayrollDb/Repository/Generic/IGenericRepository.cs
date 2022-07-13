using PayrollManager.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PayrollManager.Infrastructure.PayrollDbContext.Repository.Generic
{
    public interface IGenericRepository<TEntity> where TEntity : class, IEntityBase
    {
        Task<TEntity> GetByID(Guid id);
        IEnumerable<TEntity> GetAll();
        Task Delete(Guid id);
        Task Update(TEntity entity);
        Task<TEntity> Create(TEntity entity);
        IEnumerable<TEntity> GetAllByEmployeeId(Guid employeeId);
        Task<TEntity> GetByEmployeeId(Guid employeeId);
    }
}
