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
        Task UpdatePersonalInfo(PersonalInfoDto info, Guid id);
        Task UpdateContactDetails(ContactDetailsDto info, Guid id);
        Task DeleteEmployee(Guid id);
        IEnumerable<DependantDto> GetEmployeeDependants(Guid employeeId);
        Task CreateDependant(DependantDto dependant);
        Task UpdateDependant(DependantDto dependant);
        Task DeleteDependant(Guid dependantId);
        Task<LeaveDaysDto> GetLeaveDaysBalances(Guid employeeId);
        IEnumerable<BookedLeaveDaysDto> GetBookedLeaveDays(Guid employeeId);
        Task CreateBookedLeaveDay(BookedLeaveDaysDto bookedLeave, Guid employeeId);
        Task UpdateBookedLeaveDay(BookedLeaveDaysDto bookedLeave, Guid employeeId);
        Task DeleteBookedLeaveDay(Guid leaveId, Guid employeeId);
    }
}
