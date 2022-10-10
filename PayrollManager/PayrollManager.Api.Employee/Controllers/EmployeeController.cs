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
    [Authorize]
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
        [Route("GetEmployee/{employeeId}")]
        public async Task<ActionResult<EmployeeDto>> GetEmployee(Guid employeeId)
        {
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

        
    }
}
