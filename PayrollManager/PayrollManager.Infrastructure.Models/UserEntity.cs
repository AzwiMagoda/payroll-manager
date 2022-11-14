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
        public DateTime ActivationDate { get; set; }
        public DateTime DeactivationDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
