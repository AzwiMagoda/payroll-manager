using Microsoft.EntityFrameworkCore;
using PayrollManager.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PayrollManager.Infrastructure.PayrollDbContext.Repository.Generic
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity>
        where TEntity : class, IEntityBase
    {
        internal readonly PayrollDbContext _context;
        internal DbSet<TEntity> dbSet;

        public GenericRepository(PayrollDbContext context)
        {
            _context = context;
            dbSet = context.Set<TEntity>();
        }

        public async Task<TEntity> Create(TEntity entity)
        {
            await dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task Delete(Guid id)
        {
            var entity = dbSet.AsQueryable().Where(x => x.Id == id);
            dbSet.RemoveRange(entity);
            await _context.SaveChangesAsync();
        }

        public IEnumerable<TEntity> GetAll()
        {
            return dbSet;
        }

        public Task<TEntity> GetByID(Guid id)
        {
            Task<TEntity> entity = dbSet.AsNoTracking().AsQueryable().FirstOrDefaultAsync((x) => x.Id == id);
            return entity;
        }

        public Task<TEntity> GetByEmployeeId(Guid employeeId)
        {
            Task<TEntity> entity = dbSet.AsNoTracking().AsQueryable().FirstOrDefaultAsync((x) => x.EmployeeId == employeeId);
            return entity;
        }

        public IEnumerable<TEntity> GetAllByEmployeeId(Guid employeeId)
        {
            return dbSet.Where(x => x.EmployeeId == employeeId);
        }

        public IEnumerable<TEntity> GetAllByEmployeeIdList(IEnumerable<Guid> employeeIds)
        {
            return dbSet.Where(x => employeeIds.Contains(x.EmployeeId));
        }

        public async Task Update(TEntity entity)
        {
            dbSet.Update(entity);
            await _context.SaveChangesAsync();
        }
    }
}
