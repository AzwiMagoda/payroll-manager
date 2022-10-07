using PayrollManager.Infrastructure.Models;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Generic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Infrastructure.PayrollDbContext.Repository.Payslips
{
    public class PayslipsRepository : GenericRepository<PayslipsEntity>, IPayslipsRepository
    {
        public PayslipsRepository(PayrollDbContext context) : base(context)
        {
        }

        public IEnumerable<PayslipsEntity> GetAllPayslips(Guid employeeId)
        {
            return _context.Payslips.Where(x => x.EmployeeId == employeeId);
        }

        public PayslipsEntity GetLatestPayslip(Guid employeeId)
        {
            return _context.Payslips.OrderByDescending(x => x.CreatedDate).FirstOrDefault();
        }
    }
}
