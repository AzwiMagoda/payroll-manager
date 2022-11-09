using PayrollManager.Infrastructure.Models;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Generic;
using System;
using System.Collections.Generic;

namespace PayrollManager.Infrastructure.PayrollDbContext.Repository.Employee
{
    public interface IEmployeeRepository : IGenericRepository<EmployeeEntity>
    {
        IEnumerable<EmployeeEntity> GetAllTeamMembers(string teamName);
        IEnumerable<EmployeeEntity> GetAllManagerEmployees(Guid managerId);
    }
}
