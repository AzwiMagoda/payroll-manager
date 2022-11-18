using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PayrollManager.Application.Manager.Dto;
using PayrollManager.Application.Manager.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PayrollManager.Api.Manager.Controllers
{
    [Authorize(Policy = "ManagerPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class ManagerController : ControllerBase
    {
        private readonly IManagerService _managerService;

        public ManagerController(IManagerService managerService)
        {
            _managerService = managerService ?? throw new ArgumentNullException(nameof(managerService));
        }

        [HttpGet]
        [Route("GetAllEmployeeBookedLeaveDays")]
        public ActionResult<IEnumerable<BookedLeaveDaysDto>> GetAllEmployeeBookedLeaveDays()
        {
            var employeeId = Guid.Parse(User.FindFirst("Id").Value);

            var employeeLeaveDays = _managerService.GetEmployeeBookedLeaveDays(employeeId);
            return Ok(employeeLeaveDays);
        }
    }
}
