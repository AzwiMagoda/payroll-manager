using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Infrastructure.Models
{
    public class LeaveDaysEntity : IEntityBase
    {
        public Guid Id { get; set; }
        public Guid EmployeeId { get; set; }
        public int AnnualLeaveBalance { get; set; }
        public int SickLeaveBalance { get; set; }
        public int StudyLeaveBalance { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
