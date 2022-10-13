using PayrollManager.Application.Team.Dto;
using System.Collections.Generic;

namespace PayrollManager.Application.Team.Interfaces
{
    public interface ITeamService
    {
        public IEnumerable<TeamMemberDetailsDto> GetAllTeamMembers(string teamName);
    }
}
