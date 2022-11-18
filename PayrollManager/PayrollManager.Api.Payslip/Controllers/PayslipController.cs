using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PayrollManager.Application.PayslipGenerator.Dto;
using PayrollManager.Application.PayslipGenerator.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PayrollManager.Api.Payslip.Controllers
{
    [Authorize(Policy = "AuthenticatedPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class PayslipController : ControllerBase
    {
        private readonly IPayslipService _payslipService;

        public PayslipController(IPayslipService payslipService)
        {
            _payslipService = payslipService ?? throw new System.ArgumentNullException(nameof(payslipService));
        }

        [HttpGet]
        [Route("GetAllPayslips")]
        public ActionResult<IEnumerable<PayslipDto>> GetAllPayslips()
        {
            var employeeId = Guid.Parse(User.FindFirst("Id").Value);

            return Ok(_payslipService.GetAllPayslip(employeeId));
        }

        [HttpGet]
        [Route("GetLatestPayslip")]
        public ActionResult<PayslipDto> GetLatestPayslip()
        {
            var employeeId = Guid.Parse(User.FindFirst("Id").Value);

            return Ok(_payslipService.GetLatestPayslip(employeeId));
        }
    }
}
