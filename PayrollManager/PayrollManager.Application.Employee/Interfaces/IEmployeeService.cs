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
        IEnumerable<DependantDto> GetEmployeeDependants(Guid employeeId);
        IEnumerable<NotificationDto> GetAllNotifications(Guid employeeId);
        Task<ContactDetailsDto> GetContactDetails(Guid employeeId);
        Task CreateEmployee(EmployeeDto employee);
        Task UpdateEmployee(EmployeeDto employee);
        Task DeleteEmployee(Guid id);
        Task CreateContactDetails(ContactDetailsDto contactDetails);
        Task UpdateContactDetails(ContactDetailsDto contactDetails, Guid id);
        Task CreateDependant(DependantDto dependant);
        Task UpdateDependant(DependantDto dependant);
        Task DeleteDependant(Guid dependantId);

    }
}
