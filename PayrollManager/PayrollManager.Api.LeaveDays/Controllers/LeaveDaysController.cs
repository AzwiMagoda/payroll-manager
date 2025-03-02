﻿using Microsoft.AspNetCore.Authorization;
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
        [Route("GetEmployeeLeaveDays")]
        public async Task<ActionResult<LeaveDaysDto>> GetEmployeeLeaveDays()
        {
            var employeeId = Guid.Parse(User.FindFirst("Id").Value);
            var leaveDays = await _leaveDaysService.GetLeaveDaysBalances(employeeId);
            return Ok(leaveDays);
        }

        [HttpGet]
        [Route("GetBookedLeaveDays")]
        public ActionResult<IEnumerable<BookedLeaveDaysDto>> GetBookedLeaveDays()
        {
            var employeeId = Guid.Parse(User.FindFirst("Id").Value);
            return Ok(_leaveDaysService.GetBookedLeaveDays(employeeId));
        }

        [Authorize(Policy = "ManagerPolicy")]
        [HttpGet]
        [Route("GetEmployeeBookedLeaveDays")]
        public ActionResult<IEnumerable<BookedLeaveDaysDto>> GetEmployeeBookedLeaveDays()
        {
            var managerId = Guid.Parse(User.FindFirst("Id").Value);
            return Ok(_leaveDaysService.GetEmployeeBookedLeaveDays(managerId));
        }

        [HttpPost]
        [Route("BookLeave")]
        public async Task<IActionResult> BookLeave([FromBody] BookLeaveDto leave)
        {
            try
            {
                var id = Guid.Parse(User.FindFirst("Id").Value);
                var name = User.FindFirst("Name").Value;

                await _leaveDaysService.CreateBookedLeaveDay(leave, id, name);
                //var managerId = await _helper.GetEmployeeManagerId(employeeId);

                return Ok($"Leave days {leave.StartDate} - {leave.EndDate} booked!");
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex);
                return BadRequest(ex.Message);
            }
        }
        
        [HttpPut]
        [Route("UpdateBookedLeave")]
        public ActionResult<IEnumerable<BookedLeaveDaysDto>> UpdateBookedLeave([FromBody] BookedLeaveDaysDto leave)
        {
            try
            {
                var employeeId = Guid.Parse(User.FindFirst("Id").Value);

                _leaveDaysService.UpdateBookedLeaveDay(leave, employeeId).Wait();
                return Ok(_leaveDaysService.GetBookedLeaveDays(employeeId));
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex);
                return BadRequest(ex.Message);
            }

        }

        [Authorize(Policy = "ManagerPolicy")]
        [HttpPut]
        [Route("ApproveLeave")]
        public async Task<IActionResult> ApproveLeave([FromBody] IEnumerable<Guid> leaves)
        {
            try
            {
                await _leaveDaysService.ApproveLeave(leaves);
                return Ok("Leave days approved");
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex);
                return BadRequest(ex.Message);
            }

        }

        [Authorize(Policy = "ManagerPolicy")]
        [HttpPut]
        [Route("DeclineLeave")]
        public async Task<IActionResult> DeclineLeave([FromBody] DeclineLeaveDto leave)
        {
            try
            {
                await _leaveDaysService.DeclineLeave(leave);
                return Ok("Leave day declined");
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex);
                return BadRequest(ex.Message);
            }

        }

        [HttpDelete]
        [Route("DeleteBookedLeave/{bookedLeaveId}")]
        public async Task<IActionResult> DeleteBookedLeave(Guid bookedLeaveId)
        {
            try
            {
                var employeeId = Guid.Parse(User.FindFirst("Id").Value);

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
