using PayrollManager.Infrastructure.Models;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Generic;

namespace PayrollManager.Infrastructure.PayrollDbContext.Repository.Employee
{
    public interface IEmployeeRepository : IGenericRepository<EmployeeEntity>
    {
    }
}
