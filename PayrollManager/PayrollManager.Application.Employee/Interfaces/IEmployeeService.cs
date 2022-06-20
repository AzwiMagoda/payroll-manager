using PayrollManager.Application.Employee.Dto;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PayrollManager.Application.Employee.Interfaces
{
    public interface IEmployeeService
    {
        IEnumerable<EmployeeDto> GetAllEmployees();
        Task<EmployeeDto> GetEmployee(Guid employeeId);
        Task CreateEmployee(EmployeeDto employee);
    }
}
