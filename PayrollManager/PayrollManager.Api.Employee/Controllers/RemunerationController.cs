using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PayrollManager.Application.Employee.Dto;
using PayrollManager.Application.Employee.Interfaces;
using PayrollManager.Application.Employee.Services;
using System.Threading.Tasks;
using System;

namespace PayrollManager.Api.Employee.Controllers
{
    [Authorize(Policy = "AuthenticatedPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class RemunerationController : ControllerBase
    {
        private readonly IRemunerationService _remunerationService;

        public RemunerationController(IRemunerationService remunerationService)
        {
            _remunerationService = remunerationService ?? throw new System.ArgumentNullException(nameof(remunerationService));
        }

        [HttpGet]
        [Route("GetRemuneration")]
        public async Task<ActionResult<RemunerationDto>> GetRemuneration()
        {
            var employeeId = Guid.Parse(User.FindFirst("Id").Value);
            var remuneration = await _remunerationService.GetRemuneration(employeeId);
            return Ok(remuneration);
        }
    }
}
