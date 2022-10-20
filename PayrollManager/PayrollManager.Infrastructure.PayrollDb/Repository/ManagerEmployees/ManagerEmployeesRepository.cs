using PayrollManager.Infrastructure.Models;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Generic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Infrastructure.PayrollDbContext.Repository.ManagerEmployees
{
    public class ManagerEmployeesRepository : GenericRepository<ManagerEmployeesEntity>, IManagerEmployeesRepository
    {
        public ManagerEmployeesRepository(PayrollDbContext context) : base(context)
        {
        }

        public IEnumerable<ManagerEmployeesEntity> GetAllEmployeesByManagerId(Guid managerId)
        {
            return _context.ManagerEmployees.Where(m => m.ManagerId == managerId);
        }
    }
}
