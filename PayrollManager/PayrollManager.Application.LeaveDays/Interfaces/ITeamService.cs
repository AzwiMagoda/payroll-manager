using PayrollManager.Application.LeaveDays.Dto;
using System.Collections.Generic;

namespace PayrollManager.Application.LeaveDays.Interfaces
{
    public interface ITeamService
    {
        public IEnumerable<TeamMemberDetailsDto> GetAllTeamMembers(string teamName);
    }
}
