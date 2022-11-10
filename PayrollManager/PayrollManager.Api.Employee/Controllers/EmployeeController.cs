using Microsoft.AspNetCore.Mvc;
using PayrollManager.Application.Employee.Dto;
using PayrollManager.Application.Employee.Interfaces;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace PayrollManager.Api.Employee.Controllers
{
    [Authorize(Policy = "AuthenticatedPolicy")]
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
        [Authorize(Policy = "HRPolicy")]
        [Route("GetAllEmployees")]
        public ActionResult<IEnumerable<EmployeeDto>> GetAllEmployees()
        {
            return Ok(_employeeService.GetAllEmployees());
        }

        [HttpGet]
        [Route("GetAllNotifications")]
        public ActionResult<IEnumerable<NotificationDto>> GetAllNotifications()
        {
            var employeeId = Guid.Parse(User.FindFirst("Id").Value);
            return Ok(_employeeService.GetAllNotifications(employeeId));
        }

        [HttpGet]
        [Route("GetEmployee")]
        public async Task<ActionResult<EmployeeDto>> GetEmployee()
        {
            var employeeId = Guid.Parse(User.FindFirst("Id").Value);
            var employee = await _employeeService.GetEmployee(employeeId);
            return Ok(employee);
        }

        [HttpPost]
        [Authorize(Policy = "HRPolicy")]
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
        [Route("UpdatePersonalInformation")]
        public async Task<ActionResult<EmployeeDto>> UpdatePersonalInformation([FromBody] PersonalInfoDto info)
        {
            try
            {
                var employeeId = Guid.Parse(User.FindFirst("Id").Value);
                await _employeeService.UpdatePersonalInfo(info, employeeId);
                return Ok(await _employeeService.GetEmployee(employeeId));
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex);
                return BadRequest(ex.Message);
            }

        }

        [HttpPut]
        [Route("UpdateContactDetails")]
        public async Task<ActionResult<EmployeeDto>> UpdateContactDetails([FromBody] ContactDetailsDto info)
        {
            try
            {
                var employeeId = Guid.Parse(User.FindFirst("Id").Value);
                await _employeeService.UpdateContactDetails(info, employeeId);
                return Ok(await _employeeService.GetEmployee(employeeId));
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetDependants/{employeeId}")]
        public ActionResult<IEnumerable<DependantDto>> GetDependants()
        {
            var employeeId = Guid.Parse(User.FindFirst("Id").Value);
            return Ok( _employeeService.GetEmployeeDependants(employeeId));
        }

        [HttpPost]
        [Route("CreateDependant")]
        public ActionResult<IEnumerable<DependantDto>> CreateDependant([FromBody] DependantDto dependant)
        {
            try
            {
                var employeeId = Guid.Parse(User.FindFirst("Id").Value);
                _employeeService.CreateDependant(dependant).Wait();
                return Ok(_employeeService.GetEmployeeDependants(employeeId));
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
                var employeeId = Guid.Parse(User.FindFirst("Id").Value);

                _employeeService.UpdateDependant(dependant).Wait();
                return Ok(_employeeService.GetEmployeeDependants(employeeId));
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

        
    }
}
