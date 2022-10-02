using Microsoft.AspNetCore.Mvc;
using PayrollManager.Application.Employee.Dto;
using PayrollManager.Application.Employee.Interfaces;
using System.Collections.Generic;

namespace PayrollManager.Api.Employee.Controllers
{
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
