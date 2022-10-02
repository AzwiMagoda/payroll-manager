using PayrollManager.Application.Employee.Dto;
using System.Collections.Generic;

namespace PayrollManager.Application.Employee.Interfaces
{
    public interface ITeamService
    {
        public IEnumerable<TeamMemberDetailsDto> GetAllTeamMembers(string teamName);
    }
}
