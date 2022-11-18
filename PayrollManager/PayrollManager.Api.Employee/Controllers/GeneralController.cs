using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PayrollManager.Application.Employee.Dto;
using PayrollManager.Application.Employee.Interfaces;
using System.Collections.Generic;

namespace PayrollManager.Api.Employee.Controllers
{
    [Authorize(Policy = "AuthenticatedPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class GeneralController : ControllerBase
    {
        IGeneralService _generalService;
        public GeneralController(IGeneralService generalService)
        {
            _generalService = generalService ?? throw new System.ArgumentNullException(nameof(generalService));
        }

        [HttpGet]
        [Route("GetTitles")]
        public ActionResult<IEnumerable<string>> GetTitles()
        {
            return Ok(_generalService.GetTitles());
        }

        [HttpGet]
        [Route("GetEmployeeTypes")]
        public ActionResult<IEnumerable<string>> GetEmployeeTypes()
        {
            return Ok(_generalService.GetEmployeeTypes());
        }

        [HttpGet]
        [Route("GetManagerList")]
        public ActionResult<IEnumerable<ListDto>> GetManagerList()
        {
            return Ok(_generalService.GetManagerList());
        }

        [HttpGet]
        [Route("GetTeamList")]
        public ActionResult<IEnumerable<ListDto>> GetTeamList()
        {
            return Ok(_generalService.GetTeamList());
        }

        [HttpGet]
        [Route("GetTeamList/{department}")]
        public ActionResult<IEnumerable<ListDto>> GetTeamList(string department)
        {
            return Ok(_generalService.GetTeamList(department));
        }

        [HttpGet]
        [Route("GetDepartmentList")]
        public ActionResult<IEnumerable<ListDto>> GetDepartmentList()
        {
            return Ok(_generalService.GetDepartmentList());
        }
    }
}
