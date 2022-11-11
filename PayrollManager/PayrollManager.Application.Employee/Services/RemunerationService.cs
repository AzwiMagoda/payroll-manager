using AutoMapper;
using PayrollManager.Application.Employee.Dto;
using PayrollManager.Application.Employee.Interfaces;
using PayrollManager.Infrastructure.Models;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Remuneration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
    }
}
