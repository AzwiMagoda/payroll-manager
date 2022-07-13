using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Application.Employee.Dto
{
    public class LeaveDaysDto
    {
        public Guid EmployeeId { get; set; }
        public int AnnualLeaveBalance { get; set; }
        public int SickLeaveBalance { get; set; }
        public int StudyLeaveBalance { get; set; }
    }
}
