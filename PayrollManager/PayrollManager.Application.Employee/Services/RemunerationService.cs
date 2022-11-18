using AutoMapper;
using PayrollManager.Application.Employee.Dto;
using PayrollManager.Application.Employee.Interfaces;
using PayrollManager.Infrastructure.Models;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Remuneration;
using System;
using System.Threading.Tasks;

namespace PayrollManager.Application.Employee.Services
{
    public class RemunerationService : IRemunerationService
    {
        private readonly IRemunerationRepository _remunerationRepository;
        private readonly IMapper _mapper;

        public RemunerationService(IRemunerationRepository remunerationRepository,
                                   IMapper mapper)
        {
            _remunerationRepository = remunerationRepository ?? throw new ArgumentNullException(nameof(remunerationRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<RemunerationDto> GetRemuneration(Guid employeeId)
        {
            var entity = await _remunerationRepository.GetByEmployeeId(employeeId);

            var remunerationDto = _mapper.Map<RemunerationEntity, RemunerationDto>(entity);

            return remunerationDto;
        }

        public async Task<RemunerationGraphDto> GetRemunerationGraphData(Guid employeeId)
        {
            var entity = await _remunerationRepository.GetByEmployeeId(employeeId);

            var annualBonus = entity.AnnualBaseSalary * entity.BonusPercentage / 100;
            var monthlySalary = entity.AnnualBaseSalary / 12;
            var dailySalary = entity.AnnualBaseSalary / 260;
            var hourlySalary = dailySalary / 8;

            var annualOvertime = entity.OvertimeHrs * hourlySalary;

            var dto = new RemunerationGraphDto
            {
                AnnualBaseSalary = entity.AnnualBaseSalary,
                AnnualBonus = annualBonus,
                AnnualOvertimePay = annualOvertime,
                DailyBaseSalary = dailySalary,
                DailyBonus = annualBonus / 260,
                DailyOvertimePay = annualOvertime / 260,
                MonthlyBaseSalary = monthlySalary,
                MonthlyBonus = annualBonus / 12,
                MonthlyOvertimePay = annualOvertime / 12,
            };

            return dto;
        }
    }
}
