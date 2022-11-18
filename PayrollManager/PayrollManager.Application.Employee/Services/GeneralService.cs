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
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Teams;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Departments;

namespace PayrollManager.Application.Employee.Services
{
    public class GeneralService : IGeneralService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly ITeamRepository _teamRepository;
        private readonly IDepartmentRepository _departmentRepository;
        private readonly PayrollDbContext _payrollDbContext;

        public GeneralService(IEmployeeRepository employeeRepository,
                              PayrollDbContext payrollDbContext,
                              ITeamRepository teamRepository,
                              IDepartmentRepository departmentRepository)
        {
            _employeeRepository = employeeRepository ?? throw new ArgumentNullException(nameof(employeeRepository));
            _payrollDbContext = payrollDbContext ?? throw new ArgumentNullException(nameof(payrollDbContext));
            _teamRepository = teamRepository ?? throw new ArgumentNullException(nameof(teamRepository));
            _departmentRepository = departmentRepository ?? throw new ArgumentNullException(nameof(departmentRepository));
        }

        public IEnumerable<ListDto> GetDepartmentList()
        {
            var entities = _departmentRepository.GetAll();

            var departments = entities.Select(x => new ListDto
            {
                Id = x.Id,
                Name = x.DepartmentName
            });

            return departments;
        }

        public IEnumerable<string> GetEmployeeTypes()
        {
            return new string[] { "Full-Time", "Part-Time", "Contract"};
        }

        public IEnumerable<ListDto> GetManagerList()
        {
            var roleId = _payrollDbContext.Roles.FirstOrDefault(x => x.Name == "Manager").Id;

            var employeeIds = _payrollDbContext.UserRoles.Where(x => x.RoleId == roleId).Select(x => x.UserId);

            var entities = _employeeRepository.GetAllByEmployeeIdList(employeeIds);

            var managers = entities.Select(x => new ListDto
            {
                Id = x.EmployeeId,
                Name = $"{x.Name} {x.Surname}"
            });

            return managers;
        }

        public IEnumerable<ListDto> GetTeamList()
        {
            var entities = _teamRepository.GetAll();

            var teams = entities.Select(x => new ListDto
            {
                Id = x.Id,
                Name = x.TeamName
            });

            return teams;
        }

        public IEnumerable<ListDto> GetTeamList(string department)
        {
            var entities = _teamRepository.GetAll();

            var teams = entities.Where(x => x.Department == department).Select(x => new ListDto
            {
                Id = x.Id,
                Name = x.TeamName
            });

            return teams;
        }

        public IEnumerable<string> GetTitles()
        {
            return new string[] { "Mr", "Miss", "Mrs", "Dr", "Prof" };
        }
    }
}
