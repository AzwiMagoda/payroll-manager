using PayrollManager.Application.Helpers.Interface;
using PayrollManager.Infrastructure.Models;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Employee;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Application.Helpers.Service
{
    public class Helper : IHelper
    {
        private readonly IEmployeeRepository _employeeRepository;

        public Helper(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository ?? throw new ArgumentNullException(nameof(employeeRepository));
        }

        public async Task<EmployeeEntity> GetEmployeeManager(Guid employeeId)
        {
            var employee = await _employeeRepository.GetByEmployeeId(employeeId);

            var manager = await _employeeRepository.GetByEmployeeId(employee.ManagerEmployeeId);

            return manager;
        }

        public async Task<Guid> GetEmployeeManagerId(Guid employeeId)
        {
            var employee = await _employeeRepository.GetByEmployeeId(employeeId);

            return employee.ManagerEmployeeId;
        }
    }
}
