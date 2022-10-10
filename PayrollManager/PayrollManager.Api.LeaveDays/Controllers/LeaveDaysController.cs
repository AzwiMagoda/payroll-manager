using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PayrollManager.Application.Employee.Dto;
using PayrollManager.Application.Employee.Interfaces;
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

        public LeaveDaysController(ILeaveDaysService leaveDaysService)
        {
            _leaveDaysService = leaveDaysService;
        }

        [HttpGet]
        [Route("GetEmployeeLeaveDays/{employeeId}")]
        public async Task<ActionResult<LeaveDaysDto>> GetEmployeeLeaveDays(Guid employeeId)
        {
            var leaveDays = await _leaveDaysService.GetLeaveDaysBalances(employeeId);
            return Ok(leaveDays);
        }

        [HttpGet]
        [Route("GetEmployeeBookedLeaveDays/{employeeId}")]
        public ActionResult<IEnumerable<BookedLeaveDaysDto>> GetEmployeeBookedLeaveDays(Guid employeeId)
        {
            return Ok(_leaveDaysService.GetBookedLeaveDays(employeeId));
        }

        [HttpPost]
        [Route("BookLeave/{employeeId}")]
        public async Task<IActionResult> BookLeave([FromBody] BookedLeaveDaysDto leave, Guid employeeId)
        {
            try
            {
                await _leaveDaysService.CreateBookedLeaveDay(leave, employeeId);
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
