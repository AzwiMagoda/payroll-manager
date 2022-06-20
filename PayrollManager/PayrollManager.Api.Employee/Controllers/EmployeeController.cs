using Microsoft.AspNetCore.Mvc;
using PayrollManager.Application.Employee.Dto;
using PayrollManager.Application.Employee.Interfaces;
using System;
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
        public async Task<ActionResult<EmployeeDto>> GetAllEmployees(Guid employeeId)
        {
            var employee = await _employeeService.GetEmployee(employeeId);
            return Ok(employee);
        }

        [HttpPost]
        [Route("CreateEmployee")]
        public async Task<IActionResult> CreateVacancy([FromBody] EmployeeDto employee)
        {
            try
            {
                await _employeeService.CreateEmployee(employee);
                return Ok("Employee created");
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex);
                return BadRequest(ex.Message);
            }

        }
    }
}
