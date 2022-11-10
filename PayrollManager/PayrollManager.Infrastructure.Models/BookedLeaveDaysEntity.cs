using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Infrastructure.Models
{
    public class BookedLeaveDaysEntity : IEntityBase
    {
        public Guid Id { get; set; }
        public Guid EmployeeId { get; set; }
        public string LeaveType { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool Approved { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Status { get; set; }
        public string Reason { get; set; }

    }
}
