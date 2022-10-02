using PayrollManager.Infrastructure.Models;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Generic;
using System.Collections.Generic;

namespace PayrollManager.Infrastructure.PayrollDbContext.Repository.Employee
{
    public interface IEmployeeRepository : IGenericRepository<EmployeeEntity>
    {
        public IEnumerable<EmployeeEntity> GetAllTeamMembers(string teamName);
    }
}
