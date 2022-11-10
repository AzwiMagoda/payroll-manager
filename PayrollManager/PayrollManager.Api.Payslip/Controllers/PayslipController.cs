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
        [Route("GetAllPayslips/{employeeId}")]
        public ActionResult<IEnumerable<PayslipDto>> GetAllPayslips(Guid employeeId)
        {
            return Ok(_payslipService.GetAllPayslip(employeeId));
        }

        [HttpGet]
        [Route("GetLatestPayslip/{employeeId}")]
        public ActionResult<PayslipDto> GetLatestPayslip(Guid employeeId)
        {
            return Ok(_payslipService.GetLatestPayslip(employeeId));
        }
    }
}
