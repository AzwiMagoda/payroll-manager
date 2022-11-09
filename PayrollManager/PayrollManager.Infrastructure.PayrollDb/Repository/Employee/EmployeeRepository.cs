using PayrollManager.Infrastructure.Models;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Generic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Infrastructure.PayrollDbContext.Repository.Employee
{
    public class EmployeeRepository : GenericRepository<EmployeeEntity>, IEmployeeRepository
    {
        public EmployeeRepository(PayrollDbContext context) : base(context)
        {
        }

        public IEnumerable<EmployeeEntity> GetAllTeamMembers(string teamName)
        {
            return _context.Employees.Where(x => x.TeamName == teamName);
        }

        public IEnumerable<EmployeeEntity> GetAllManagerEmployees(Guid managerId)
        {
            return _context.Employees.Where(x => x.ManagerEmployeeId == managerId);
        }
    }
}
