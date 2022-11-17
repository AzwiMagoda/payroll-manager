using PayrollManager.Application.Employee.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Application.Employee.Interfaces
{
    public interface IGeneralService
    {
        IEnumerable<string> GetTitles();
        IEnumerable<ManagerDto> GetManagerList();
    }
}
