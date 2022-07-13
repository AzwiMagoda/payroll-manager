using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Infrastructure.Models
{
    public class DependentEntity : IEntityBase
    {
        public Guid Id { get; set; }
        public Guid EmployeeId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string IDNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Cellphone { get; set; }
        public string Email { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
