using Microsoft.AspNetCore.Mvc;
using PayrollManager.Application.Employee.Dto;
using PayrollManager.Application.Employee.Interfaces;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PayrollManager.Api.Employee.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet]
        [Route("GetAllEmployees")]
        public ActionResult<IEnumerable<EmployeeDto>> GetAllEmployees()
        {
            return Ok(_employeeService.GetAllEmployees());
        }

        [HttpGet]
        [Route("GetEmployee/{employeeId}")]
        public async Task<ActionResult<EmployeeDto>> GetEmployee(Guid employeeId)
        {
            var employee = await _employeeService.GetEmployee(employeeId);
            return Ok(employee);
        }

        [HttpPost]
        [Route("CreateEmployee")]
        public async Task<IActionResult> CreateEmployee([FromBody] EmployeeDto employee)
        {
            try
            {
                await _employeeService.CreateEmployee(employee);
                return Ok($"Employee: {employee.Name} {employee.Surname} created");
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex);
                return BadRequest(ex.Message);
            }

        }

        [HttpPut]
        [Route("UpdateEmployee")]
        public async Task<IActionResult> UpdateEmployee([FromBody] EmployeeDto employee)
        {
            try
            {
                await _employeeService.UpdateEmployee(employee);
                return Ok($"Employee: {employee.Name} {employee.Surname} updated");
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex);
                return BadRequest(ex.Message);
            }

        }

        [HttpPut]
        [Route("UpdatePersonalInformation/{id}")]
        public async Task<ActionResult<EmployeeDto>> UpdatePersonalInformation([FromBody] PersonalInfoDto info, Guid id)
        {
            try
            {
                await _employeeService.UpdatePersonalInfo(info, id);
                return Ok(await _employeeService.GetEmployee(id));
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex);
                return BadRequest(ex.Message);
            }

        }

        [HttpPut]
        [Route("UpdateContactDetails/{id}")]
        public async Task<ActionResult<EmployeeDto>> UpdateContactDetails([FromBody] ContactDetailsDto info, Guid id)
        {
            try
            {
                await _employeeService.UpdateContactDetails(info, id);
                return Ok(await _employeeService.GetEmployee(id));
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetDependants/{employeeId}")]
        public ActionResult<IEnumerable<DependantDto>> GetDependants(Guid employeeId)
        {
            return Ok( _employeeService.GetEmployeeDependants(employeeId));
        }

        [HttpPost]
        [Route("CreateDependant")]
        public ActionResult<IEnumerable<DependantDto>> CreateDependant([FromBody] DependantDto dependant)
        {
            try
            {
                _employeeService.CreateDependant(dependant).Wait();
                return Ok(_employeeService.GetEmployeeDependants(dependant.EmployeeId));
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex);
                return BadRequest(ex.Message);
            }

        }

        [HttpPut]
        [Route("UpdateDependant")]
        public ActionResult<IEnumerable<DependantDto>> UpdateDependant([FromBody] DependantDto dependant)
        {
            try
            {
                _employeeService.UpdateDependant(dependant).Wait();
                return Ok(_employeeService.GetEmployeeDependants(dependant.EmployeeId));
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex);
                return BadRequest(ex.Message);
            }

        }

        [HttpDelete]
        [Route("DeleteDependant/{dependantId}")]
        public async Task<IActionResult> DeleteDependant(Guid dependantId)
        {
            try
            {
                await _employeeService.DeleteDependant(dependantId);
                return Ok("Dependant deleted");
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex);
                return BadRequest(ex.Message);
            }

        }

        [HttpGet]
        [Route("GetEmployeeLeaveDays/{employeeId}")]
        public async Task<ActionResult<LeaveDaysDto>> GetEmployeeLeaveDays(Guid employeeId)
        {
            var leaveDays = await _employeeService.GetLeaveDaysBalances(employeeId);
            return Ok(leaveDays);
        }

        [HttpGet]
        [Route("GetEmployeeBookedLeaveDays/{employeeId}")]
        public ActionResult<IEnumerable<BookedLeaveDaysDto>> GetEmployeeBookedLeaveDays(Guid employeeId)
        {
            return Ok(_employeeService.GetBookedLeaveDays(employeeId));
        }

        [HttpPost]
        [Route("BookLeave/{employeeId}")]
        public async Task<IActionResult> BookLeave([FromBody] BookedLeaveDaysDto leave, Guid employeeId)
        {
            try
            {
                await _employeeService.CreateBookedLeaveDay(leave, employeeId);
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
                _employeeService.UpdateBookedLeaveDay(leave, employeeId).Wait();
                return Ok(_employeeService.GetLeaveDaysBalances(employeeId));
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex);
                return BadRequest(ex.Message);
            }

        }

        [HttpDelete]
        [Route("DeleteBookedLeave/{employeeId}")]
        public async Task<IActionResult> DeleteBookedLeave([FromBody] BookedLeaveDaysDto leave, Guid employeeId)
        {
            try
            {
                await _employeeService.DeleteBookedLeaveDay(leave, employeeId);
                return Ok("Leave day deleted");
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex);
                return BadRequest(ex.Message);
            }

        }
    }
}
