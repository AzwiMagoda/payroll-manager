using Microsoft.AspNetCore.Mvc;
using PayrollManager.Application.PayslipGenerator.Interfaces;

namespace PayrollManager.Api.Employee.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PayslipController : ControllerBase
    {
        private readonly  IPayslipService _payslipService;

        public PayslipController(IPayslipService payslipService)
        {
            _payslipService = payslipService ?? throw new System.ArgumentNullException(nameof(payslipService));
        }
    }
}
