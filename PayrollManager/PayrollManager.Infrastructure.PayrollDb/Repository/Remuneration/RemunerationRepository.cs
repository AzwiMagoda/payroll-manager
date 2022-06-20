using PayrollManager.Infrastructure.Models;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Generic;

namespace PayrollManager.Infrastructure.PayrollDbContext.Repository.Remuneration
{
    public class RemunerationRepository : GenericRepository<RemunerationEntity>, IRemunerationRepository
    {
        public RemunerationRepository(PayrollDbContext context) : base(context)
        {
        }
    }
}
