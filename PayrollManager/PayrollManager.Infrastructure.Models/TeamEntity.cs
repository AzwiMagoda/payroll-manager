using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Infrastructure.Models
{
    public class TeamEntity : IEntityBase
    {
        public Guid Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public string TeamName { get; set; }
        public Guid EmployeeId { get; set; }
        public string TeamLeadName { get; set; }
        public string Department { get; set; }
        public Guid DepartmentId { get; set; }
    }
}
