using PayrollManager.Infrastructure.Models;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Generic;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Remuneration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Infrastructure.PayrollDbContext.Repository.Departments
{
    public class DepartmentRepository : GenericRepository<DepartmentEntity>, IDepartmentRepository
    {
        public DepartmentRepository(PayrollDbContext context) : base(context)
        {
        }
    }
}
