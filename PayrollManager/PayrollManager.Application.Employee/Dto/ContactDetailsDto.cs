using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Application.Employee.Dto
{
    public class ContactDetailsDto
    {
        public Guid? EmployeeId { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
        public string Cellphone { get; set; }
        public string PhysicalAddress { get; set; }
        public string PostalAddress { get; set; }
        public string WorkAddress { get; set; }
    }
}
