using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Application.Employee.Dto
{
    public class ManagerDto
    {
        public Guid EmployeeId { get; set; }
        public string FullName { get; set; }
    }
}
