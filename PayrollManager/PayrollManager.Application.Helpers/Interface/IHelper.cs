using PayrollManager.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Application.Helpers.Interface
{
    public interface IHelper
    {
        public Task<EmployeeEntity> GetEmployeeManager(Guid employeeId);
        public Task<Guid> GetEmployeeManagerId(Guid employeeId);
    }
}
