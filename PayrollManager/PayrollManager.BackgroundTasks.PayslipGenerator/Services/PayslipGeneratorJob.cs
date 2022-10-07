using Microsoft.Extensions.Logging;
using PayrollManager.Application.PayslipGenerator.Dto;
using PayrollManager.Application.PayslipGenerator.Interfaces;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.ContactDetailsRepository;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Employee;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.LeaveDays;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Payslips;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Remuneration;
using Quartz;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace PayrollManager.BackgroundTasks.PayslipGenerator.Services
{
    [DisallowConcurrentExecution]
    public class PayslipGeneratorJob : IJob
    {
        private readonly ILogger<PayslipGeneratorJob> _logger;
        private readonly IPayslipGenerator _payslipGenerator;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IRemunerationRepository _remunerationRepository;
        private readonly IContactDetailsRepository _contactDetailsRepository;
        private readonly ILeaveDaysRepository _leaveDaysRepository;
        private readonly IPayslipsRepository _payslipsRepository;

        public PayslipGeneratorJob(IPayslipGenerator payslipGenerator,
                                   IEmployeeRepository employeeRepository,
                                   IRemunerationRepository remunerationRepository,
                                   IContactDetailsRepository contactDetailsRepository,
                                   ILeaveDaysRepository leaveDaysRepository,
                                   ILogger<PayslipGeneratorJob> logger,
                                   IPayslipsRepository payslipsRepository)
        {
            _payslipGenerator = payslipGenerator ?? throw new ArgumentNullException(nameof(payslipGenerator));
            _employeeRepository = employeeRepository ?? throw new ArgumentNullException(nameof(employeeRepository));
            _remunerationRepository = remunerationRepository ?? throw new ArgumentNullException(nameof(remunerationRepository));
            _contactDetailsRepository = contactDetailsRepository ?? throw new ArgumentNullException(nameof(contactDetailsRepository));
            _leaveDaysRepository = leaveDaysRepository ?? throw new ArgumentNullException(nameof(leaveDaysRepository));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _payslipsRepository = payslipsRepository ?? throw new ArgumentNullException(nameof(payslipsRepository));
        }

        public async Task Execute(IJobExecutionContext context)
        {
            try
            {
                _logger.LogInformation($"Inside PayslipGeneratorJob");
                var employees = _employeeRepository.GetAll().ToList();
                var contactDetails = _contactDetailsRepository.GetAll();
                var leaveDays = _leaveDaysRepository.GetAll();
                var remunerations = _remunerationRepository.GetAll();

                foreach (var employee in employees)
                {
                    var contact = contactDetails.First(x => x.EmployeeId == employee.EmployeeId);
                    var leave = leaveDays.First(x => x.EmployeeId == employee.EmployeeId);
                    var remuneration = remunerations.First(x => x.EmployeeId == employee.EmployeeId);

                    var retirementContribution = remuneration.MonthlyBaseSalary * remuneration.RetirementContributionPercentage / 100;
                    var totalDeductions = 125.60M + 2900.00M + 5600.00M;
                    var totalEarnings = retirementContribution + remuneration.MonthlyBaseSalary;

                    var payslip = new Payslip
                    {
                        Id = employee.Id,
                        Address = contact.PhysicalAddress,
                        Department = employee.Department,
                        Gender = "Male",
                        IdentityNumber = "909829",
                        Jobtitle = employee.JobTitle,
                        Name = $"{employee.Title} {employee.Name}",
                        StartDate = employee.CreatedDate,
                        Surname = employee.Surname,
                        TaxNumber = "92018212",
                        CompanyAddress = "2326 Murlberry Lane, Johannesburg",
                        CompanyName = employee.Company,
                        LifeInsurance = 125.60M,
                        MedicalAid = 2900.00M,
                        MonthlyBaseSalary = remuneration.MonthlyBaseSalary,
                        Tax = 5600.00M,
                        RetirementContribution = retirementContribution,
                        TotalDeductions = totalDeductions,
                        TotalEarnings = totalEarnings,
                        NettPay = totalEarnings - totalDeductions,
                    };

                    await _payslipGenerator.GeneratePayslipPdf(payslip);
                }
            }

            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

            }
        }
    }
}
