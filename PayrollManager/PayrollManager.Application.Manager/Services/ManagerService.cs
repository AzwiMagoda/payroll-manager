using Newtonsoft.Json.Linq;
using PayrollManager.Application.Manager.Dto;
using PayrollManager.Application.Manager.Interfaces;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.BookedLeaveDays;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.ManagerEmployees;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Application.Manager.Services
{
    public class ManagerService : IManagerService
    {
        private readonly IManagerEmployeesRepository _managerEmployeesRepository;
        private readonly IBookedLeaveDaysRepository _bookedLeaveDaysRepository;

        public ManagerService(IManagerEmployeesRepository managerEmployeesRepository, IBookedLeaveDaysRepository bookedLeaveDaysRepository)
        {
            _managerEmployeesRepository = managerEmployeesRepository ?? throw new ArgumentNullException(nameof(managerEmployeesRepository));
            _bookedLeaveDaysRepository = bookedLeaveDaysRepository ?? throw new ArgumentNullException(nameof(bookedLeaveDaysRepository));
        }

        public IEnumerable<BookedLeaveDaysDto> GetEmployeeBookedLeaveDays(Guid managerId)
        {
            var employees = _managerEmployeesRepository.GetAllEmployeesByManagerId(managerId);

            var employeeIds = employees.Select(x => x.EmployeeId);

            var bookedLeaves = _bookedLeaveDaysRepository.GetBookedLeaveDaysForEmployeeList(employeeIds);

            return bookedLeaves.Select(x => new BookedLeaveDaysDto
            {
                Approved = x.Approved,
                EndDate = x.EndDate,
                Id = x.Id,
                LeaveType = x.LeaveType,
                StartDate = x.StartDate,
                EmployeeId = x.EmployeeId
            });

        }
    }
}
