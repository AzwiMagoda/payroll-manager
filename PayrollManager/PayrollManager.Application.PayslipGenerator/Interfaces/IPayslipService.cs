using PayrollManager.Application.PayslipGenerator.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Application.PayslipGenerator.Interfaces
{
    public interface IPayslipService
    {
        PayslipDto GetLatestPayslip(Guid employeeId);
        IEnumerable<PayslipDto> GetAllPayslip(Guid employeeId);
    }
}
