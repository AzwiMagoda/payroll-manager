using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PayrollManager.Api.LeaveDays.SignalR;
using PayrollManager.Application.Helpers.Interface;
using PayrollManager.Application.LeaveDays.Dto;
using PayrollManager.Application.LeaveDays.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PayrollManager.Api.LeaveDays.Controllers
{
    [Authorize(Policy = "AuthenticatedPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveDaysController : ControllerBase
    {
        private readonly ILeaveDaysService _leaveDaysService;
        private readonly IHelper _helper;

        public LeaveDaysController(ILeaveDaysService leaveDaysService, IHelper helper)
        {
            _leaveDaysService = leaveDaysService;
            _helper = helper;
        }

        [HttpGet]
        [Route("GetEmployeeLeaveDays/{employeeId}")]
        public async Task<ActionResult<LeaveDaysDto>> GetEmployeeLeaveDays(Guid employeeId)
        {
            var leaveDays = await _leaveDaysService.GetLeaveDaysBalances(employeeId);
            return Ok(leaveDays);
        }

        [HttpGet]
        [Route("GetBookedLeaveDays/{employeeId}")]
        public ActionResult<IEnumerable<BookedLeaveDaysDto>> GetBookedLeaveDays(Guid employeeId)
        {
            return Ok(_leaveDaysService.GetBookedLeaveDays(employeeId));
        }

        [Authorize(Policy = "ManagerPolicy")]
        [HttpGet]
        [Route("GetEmployeeBookedLeaveDays/{managerId}")]
        public ActionResult<IEnumerable<BookedLeaveDaysDto>> GetEmployeeBookedLeaveDays(Guid managerId)
        {
            return Ok(_leaveDaysService.GetEmployeeBookedLeaveDays(managerId));
        }

        [HttpPost]
        [Route("BookLeave/{employeeId}")]
        public async Task<IActionResult> BookLeave([FromBody] BookedLeaveDaysDto leave, Guid employeeId)
        {
            try
            {
                await _leaveDaysService.CreateBookedLeaveDay(leave, employeeId);
                var managerId = await _helper.GetEmployeeManagerId(employeeId);

                return Ok($"Leave days {leave.StartDate} - {leave.EndDate} booked!");
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex);
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("UpdateBookedLeave/{employeeId}")]
        public ActionResult<IEnumerable<BookedLeaveDaysDto>> UpdateBookedLeave([FromBody] BookedLeaveDaysDto leave, Guid employeeId)
        {
            try
            {
                _leaveDaysService.UpdateBookedLeaveDay(leave, employeeId).Wait();
                return Ok(_leaveDaysService.GetBookedLeaveDays(employeeId));
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex);
                return BadRequest(ex.Message);
            }

        }

        [HttpDelete]
        [Route("DeleteBookedLeave/{employeeId}/{bookedLeaveId}")]
        public async Task<IActionResult> DeleteBookedLeave(Guid employeeId, Guid bookedLeaveId)
        {
            try
            {
                await _leaveDaysService.DeleteBookedLeaveDay(bookedLeaveId, employeeId);
                return Ok($"Leave day with id {bookedLeaveId} deleted");
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex);
                return BadRequest(ex.Message);
            }

        }
    }
}
