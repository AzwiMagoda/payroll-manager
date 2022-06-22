using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Infrastructure.Models
{
    public class ContactDetails : IEntityBase
    {
        public Guid Id { get; set; }
        public Guid EmployeeId { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
        public string Cellphone { get; set; }
        public string PhysicalAddress { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
