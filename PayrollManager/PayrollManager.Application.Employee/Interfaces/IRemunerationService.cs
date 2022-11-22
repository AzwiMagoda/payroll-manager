using PayrollManager.Application.Employee.Dto;
using System;
using System.Threading.Tasks;

namespace PayrollManager.Application.Employee.Interfaces
{
    public interface IRemunerationService
    {
        Task<RemunerationDto> GetRemuneration(Guid employeeId);
        Task<RemunerationGraphDto> GetRemunerationGraphData(Guid employeeId);
        Task CreateRemuneration(RemunerationDto remuneration);
        Task UpdateRemuneration(RemunerationDto remuneration);
    }
}
