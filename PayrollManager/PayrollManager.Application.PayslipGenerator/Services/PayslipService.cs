using PayrollManager.Application.PayslipGenerator.Dto;
using PayrollManager.Application.PayslipGenerator.Interfaces;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Payslips;
using System;
using System.Collections.Generic;
using System.Linq;

namespace PayrollManager.Application.PayslipGenerator.Services
{
    public class PayslipService : IPayslipService
    {
        private readonly IPayslipsRepository _payslipsRepository;

        public PayslipService(IPayslipsRepository payslipsRepository)
        {
            _payslipsRepository = payslipsRepository ?? throw new ArgumentNullException(nameof(payslipsRepository));
        }

        public IEnumerable<PayslipDto> GetAllPayslip(Guid employeeId)
        {
            var payslips = _payslipsRepository.GetAllPayslips(employeeId);

            var dto = payslips.Select(x => new PayslipDto
            {
                CreatedDate = x.CreatedDate,
                DownloadUrl = x.DownloadUrl,
                EmployeeId = employeeId,
                Id = x.Id,
                PayslipName = x.PayslipName
            });

            return dto;
        }

        public PayslipDto GetLatestPayslip(Guid employeeId)
        {
            var payslip = _payslipsRepository.GetLatestPayslip(employeeId);

            var payslipDto =  new PayslipDto
            {
                CreatedDate = payslip.CreatedDate,
                DownloadUrl = payslip.DownloadUrl,
                EmployeeId = payslip.EmployeeId,
                Id = payslip.Id,
                PayslipName = payslip.PayslipName
            };

            return payslipDto;
        }
    }
}
