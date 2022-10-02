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
        void UploadPayslipToFirebase(string filePath, string fileName);
        void GeneratePayslipPdf(Payslip payslip);
    }
}
