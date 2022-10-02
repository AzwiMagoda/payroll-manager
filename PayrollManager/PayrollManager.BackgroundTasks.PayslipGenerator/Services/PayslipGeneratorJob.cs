using PayrollManager.Application.PayslipGenerator.Dto;
using PayrollManager.Application.PayslipGenerator.Interfaces;
using Quartz;
using System;
using System.Threading.Tasks;

namespace PayrollManager.BackgroundTasks.PayslipGenerator.Services
{
    [DisallowConcurrentExecution]
    public class PayslipGeneratorJob : IJob
    {
        private readonly IPayslipGenerator _payslipGenerator;

        public PayslipGeneratorJob(IPayslipGenerator payslipGenerator)
        {
            _payslipGenerator = payslipGenerator ?? throw new System.ArgumentNullException(nameof(payslipGenerator));
        }

        public Task Execute(IJobExecutionContext context)
        {
            var payslip = new Payslip
            {
                Id = 1,
                Address = "address",
                Department = "Engierr",
                Gender = "Male",
                IdentityNumber = "908020192",
                Jobtitle = "Jsij",
                Name = "kilo",
                StartDate = DateTime.Parse("01/01/2020"),
                Surname = "palo",
                TaxNumber = "92018212"
            };

            _payslipGenerator.GeneratePayslipPdf(payslip);
            return Task.CompletedTask;
        }
    }
}
