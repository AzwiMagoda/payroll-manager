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

        [HttpGet]
        [Authorize(Policy = "AdminOrHR")]
        [Route("GetRemuneration/{employeeId}")]
        public async Task<ActionResult<RemunerationDto>> GetRemuneration(Guid employeeId)
        {
            var remuneration = await _remunerationService.GetRemuneration(employeeId);
            return Ok(remuneration);
        }

        [HttpGet]
        [Route("GetRemunerationGraphData")]
        public async Task<ActionResult<RemunerationGraphDto>> GetRemunerationGraphData()
        {
            var employeeId = Guid.Parse(User.FindFirst("Id").Value);
            var remuneration = await _remunerationService.GetRemunerationGraphData(employeeId);
            return Ok(remuneration);
        }

        [HttpPost]
        [Authorize(Policy = "AdminOrHR")]
        [Route("CreateRemuneration")]
        public async Task<IActionResult> CreateRemuneration([FromBody] RemunerationDto remuneration)
        {
            try
            {
                await _remunerationService.CreateRemuneration(remuneration);
                return Ok($"Remuneration created");
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex);
                return BadRequest(ex.Message);
            }

        }

        [HttpPut]
        [Route("UpdateRemuneration")]
        public async Task<IActionResult> UpdateRemuneration([FromBody] RemunerationDto remuneration)
        {
            try
            {
                await _remunerationService.UpdateRemuneration(remuneration);
                return Ok($"Remuneration updated");
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex);
                return BadRequest(ex.Message);
            }

        }
    }
}
