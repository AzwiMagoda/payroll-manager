using PayrollManager.Application.Employee.Dto;
using PayrollManager.Application.Employee.Interfaces;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.ContactDetailsRepository;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Dependant;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Employee;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.NotificationsRepository;
using PayrollManager.Infrastructure.PayrollDbContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Application.Employee.Services
{
    public class GeneralService : IGeneralService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly PayrollDbContext _payrollDbContext;

        public GeneralService(IEmployeeRepository employeeRepository,
                              PayrollDbContext payrollDbContext)
        {
            _employeeRepository = employeeRepository ?? throw new ArgumentNullException(nameof(employeeRepository));
            _payrollDbContext = payrollDbContext ?? throw new ArgumentNullException(nameof(payrollDbContext));
        }

        public IEnumerable<ManagerDto> GetManagerList()
        {
            var roleId = _payrollDbContext.Roles.FirstOrDefault(x => x.Name == "Manager").Id;

            var employeeIds = _payrollDbContext.UserRoles.Where(x => x.RoleId == roleId).Select(x => x.UserId);

            var entities = _employeeRepository.GetAllByEmployeeIdList(employeeIds);

            var managers = entities.Select(x => new ManagerDto
            {
                EmployeeId = x.EmployeeId,
                FullName = $"{x.Name} {x.Surname}"
            });

            return managers;
        }

        public IEnumerable<string> GetTitles()
        {
            var titles = new string[] { "Mr", "Miss", "Mrs", "Dr", "Prof" };

            return titles;
        }
    }
}
