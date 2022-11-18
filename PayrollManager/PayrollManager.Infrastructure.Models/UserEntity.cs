using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Infrastructure.Models
{
    public class UserEntity : IdentityUser<Guid>
    {
        public bool IsActive { get; set; }
        public DateTime StatusUpdateDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public DateTime LastLogin { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
