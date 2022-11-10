using PayrollManager.Application.Manager.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Application.Manager.Interfaces
{
    public interface IManagerService 
    {
        IEnumerable<BookedLeaveDaysDto> GetEmployeeBookedLeaveDays(Guid managerId);
    }
}
