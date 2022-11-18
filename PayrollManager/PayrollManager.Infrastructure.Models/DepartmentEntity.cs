using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Infrastructure.Models
{
    public class DepartmentEntity : IEntityBase
    {
        public Guid Id { get; set; }
        public Guid EmployeeId { get; set; } 
        public DateTime CreatedDate { get; set; }
        public string DepartmentName { get; set; }
        public string DepartmentHeadFullName { get; set; }
    }
}
