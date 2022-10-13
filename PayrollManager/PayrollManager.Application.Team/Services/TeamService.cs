using PayrollManager.Application.Team.Dto;
using PayrollManager.Application.Team.Interfaces;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.ContactDetailsRepository;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Employee;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Application.Team.Services
{
    public class TeamService : ITeamService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IContactDetailsRepository _contactDetailsRepository;

        public TeamService(IEmployeeRepository employeeRepository,
                           IContactDetailsRepository contactDetailsRepository)
        {
            _employeeRepository = employeeRepository ?? throw new ArgumentNullException(nameof(employeeRepository));
            _contactDetailsRepository = contactDetailsRepository ?? throw new ArgumentNullException(nameof(contactDetailsRepository));
        }

        public IEnumerable<TeamMemberDetailsDto> GetAllTeamMembers(string teamName)
        {
            //get employees in team
            var teamMembers = _employeeRepository.GetAllTeamMembers(teamName);

            var employeeIds = teamMembers.Select(x => x.EmployeeId);

            var contactDetails = _contactDetailsRepository.GetAll().Where(x => employeeIds.Contains(x.EmployeeId));

            return teamMembers.Join(contactDetails,
                                    employee => employee.EmployeeId,
                                    contactDetails => contactDetails.EmployeeId,
                                    (employee, contactDetails) => new { Employee = employee, ContactDetails = contactDetails })
                            .Select(x => new TeamMemberDetailsDto
                            {
                                CellphoneNumber = x.ContactDetails.Cellphone,
                                Email = x.ContactDetails.Email,
                                FirstName = x.Employee.Name,
                                JobTitle = x.Employee.JobTitle,
                                LastName = x.Employee.Surname,
                                ManagerName = x.Employee.Manager,
                                TeamName = x.Employee.TeamName,
                                Title = x.Employee.Title,
                            })
                            .OrderBy(x => x.FirstName);
        }
    }
}
