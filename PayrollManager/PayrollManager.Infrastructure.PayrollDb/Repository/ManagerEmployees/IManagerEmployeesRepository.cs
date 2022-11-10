using PayrollManager.Infrastructure.Models;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Generic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Infrastructure.PayrollDbContext.Repository.ManagerEmployees
{
    public interface IManagerEmployeesRepository : IGenericRepository<ManagerEmployeesEntity>
    {
        IEnumerable<ManagerEmployeesEntity> GetAllEmployeesByManagerId(Guid managerId);
    }
}
