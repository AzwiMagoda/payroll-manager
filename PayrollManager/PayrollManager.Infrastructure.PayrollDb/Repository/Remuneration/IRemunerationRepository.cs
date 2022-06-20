using PayrollManager.Infrastructure.Models;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Generic;

namespace PayrollManager.Infrastructure.PayrollDbContext.Repository.Remuneration
{
    public interface IRemunerationRepository : IGenericRepository<RemunerationEntity>
    {
    }
}
