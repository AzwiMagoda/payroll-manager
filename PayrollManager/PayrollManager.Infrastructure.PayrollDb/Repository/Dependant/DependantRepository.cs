using PayrollManager.Infrastructure.Models;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Generic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Infrastructure.PayrollDbContext.Repository.Dependant
{
    public class DependantRepository : GenericRepository<DependentEntity>, IDependantRepository
    {
        public DependantRepository(PayrollDbContext context) : base(context)
        {
            
        }
        public IEnumerable<DependentEntity> GetEmployeeDependants(Guid employeeId)
        {
            return _context.Dependents.Where(x => x.EmployeeId == employeeId);
        }
    }
}
