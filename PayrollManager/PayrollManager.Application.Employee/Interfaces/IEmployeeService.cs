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
        Task UpdateEmployee(EmployeeDto employee);
        Task UpdateContactDetails(ContactDetailsDto contactDetails, Guid id);
        Task DeleteEmployee(Guid id);
        IEnumerable<DependantDto> GetEmployeeDependants(Guid employeeId);
        Task CreateDependant(DependantDto dependant);
        Task UpdateDependant(DependantDto dependant);
        Task DeleteDependant(Guid dependantId);
        IEnumerable<NotificationDto> GetAllNotifications(Guid employeeId);
        Task CreateContactDetails(ContactDetailsDto contactDetails);

    }
}
