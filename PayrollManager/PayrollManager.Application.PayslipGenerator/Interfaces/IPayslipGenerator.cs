using PayrollManager.Application.PayslipGenerator.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Application.PayslipGenerator.Interfaces
{
    public interface IPayslipGenerator
    {
        Task<string> UploadPayslipToFirebase(string filePath, string fileName);
        Task GeneratePayslipPdf(Payslip payslip);
    }
}
