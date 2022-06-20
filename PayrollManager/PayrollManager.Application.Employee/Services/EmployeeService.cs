using AutoMapper;
using PayrollManager.Application.Employee.Dto;
using PayrollManager.Application.Employee.Interfaces;
using PayrollManager.Infrastructure.Models;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Employee;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Remuneration;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PayrollManager.Application.Employee.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IRemunerationRepository _remunerationRepository;
        private readonly IMapper _mapper;

        public EmployeeService(IEmployeeRepository employeeRepository, IMapper mapper, IRemunerationRepository remunerationRepository)
        {
            _employeeRepository = employeeRepository;
            _mapper = mapper;
            _remunerationRepository = remunerationRepository;
        }

        public IEnumerable<EmployeeDto> GetAllEmployees()
        {
            try
            {
                var entities = _employeeRepository.GetAll();
                return _mapper.Map<List<EmployeeDto>>(entities);
            }
            catch (Exception ex)
            {
                throw new Exception();
            }

        }

        public async Task<EmployeeDto> GetEmployee(Guid employeeId)
        {
            try
            {
                var employee = await _employeeRepository.GetByID(employeeId);
                var remuneration = await _remunerationRepository.GetByID(employeeId);

                return employee == null || remuneration == null ? null 
                    :  new EmployeeDto
                    {
                        Id = employeeId,
                        AnnualBaseSalary = remuneration.AnnualBaseSalary,
                        BonusFrequency = remuneration.BonusFrequency,
                        BonusPercentage = remuneration.BonusPercentage,
                        RetirementContribution = remuneration.RetirementContribution,
                        Company = employee.Company,
                        Hours = employee.Hours,
                        Name = employee.Name,
                        Surname = employee.Surname,
                        CreatedDate = employee.CreatedDate
                    };
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }

        public async Task CreateEmployee(EmployeeDto employee)
        {
            try
            {
                var id = Guid.NewGuid();

                var employeeEntity = new EmployeeEntity
                {
                    Company = employee.Company,
                    Hours = employee.Hours,
                    Name = employee.Name,
                    Surname = employee.Surname,
                    Id = id,
                    RemunerationId = id,
                    CreatedDate = DateTime.Now,
                };

                var remunerationEntity = new RemunerationEntity
                {
                    AnnualBaseSalary = employee.AnnualBaseSalary,
                    BonusFrequency = employee.BonusFrequency,
                    BonusPercentage = employee.BonusPercentage,
                    EmployeeId = id,
                    Id = id,
                    RetirementContribution = employee.RetirementContribution,
                    CreatedDate = DateTime.Now
                };

                await _employeeRepository.Create(employeeEntity);
                await _remunerationRepository.Create(remunerationEntity);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
            }

        }

        public async Task UpdateEmployee(EmployeeDto employee)
        {
            try
            {
                var employeeEntity = new EmployeeEntity
                {
                    Company = employee.Company,
                    Hours = employee.Hours,
                    Name = employee.Name,
                    Surname = employee.Surname,
                    Id = employee.Id,
                    RemunerationId = employee.Id,
                    CreatedDate = DateTime.Now,
                };

                var remunerationEntity = new RemunerationEntity
                {
                    AnnualBaseSalary = employee.AnnualBaseSalary,
                    BonusFrequency = employee.BonusFrequency,
                    BonusPercentage = employee.BonusPercentage,
                    EmployeeId = employee.Id,
                    Id = employee.Id,
                    RetirementContribution = employee.RetirementContribution,
                    CreatedDate = DateTime.Now
                };

                await _employeeRepository.Update(employeeEntity);
                await _remunerationRepository.Update(remunerationEntity);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
            }

        }

        public async Task DeleteEmployee(Guid id)
        {
            try
            {
                await _remunerationRepository.Delete(id);
                await _employeeRepository.Delete(id);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);

            }
        }
    }
}
