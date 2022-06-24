using PayrollManager.Infrastructure.Models;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Generic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Infrastructure.PayrollDbContext.Repository.ContactDetailsRepository
{
    public class ContactDetailsRepository : GenericRepository<ContactDetailsEntity>, IContactDetailsRepository
    {
        public ContactDetailsRepository(PayrollDbContext context) : base(context)
        {
        }
    }
}
