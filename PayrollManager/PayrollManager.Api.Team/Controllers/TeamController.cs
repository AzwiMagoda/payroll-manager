using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PayrollManager.Application.Team.Dto;
using PayrollManager.Application.Team.Interfaces;
using System.Collections.Generic;

namespace PayrollManager.Api.Team.Controllers
{
    [Authorize(Policy = "AuthenticatedPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private readonly ITeamService _teamService;

        public TeamController(ITeamService teamService)
        {
            _teamService = teamService;
        }

        [HttpGet]
        [Route("GetTeamMembers/{teamName}")]
        public ActionResult<IEnumerable<TeamMemberDetailsDto>> GetTeamMembers(string teamName)
        {
            return Ok(_teamService.GetAllTeamMembers(teamName));
        }
    }
}
