﻿using PayrollManager.Infrastructure.Models;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Generic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Infrastructure.PayrollDbContext.Repository.Departments
{
    public interface IDepartmentRepository : IGenericRepository<DepartmentEntity>
    {
    }
}
