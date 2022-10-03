using PayrollManager.Application.PayslipGenerator.Dto;
using PayrollManager.Application.PayslipGenerator.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Application.PayslipGenerator.Services
{
    public class PayslipService : IPayslipService
    {
        public IEnumerable<PayslipDto> GetAllPayslip(Guid employeeId)
        {
            throw new NotImplementedException();
        }

        public PayslipDto GetLatestPayslip(Guid employeeId)
        {
            throw new NotImplementedException();
        }
    }
}
