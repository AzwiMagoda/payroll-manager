using PayrollManager.Infrastructure.Models;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Generic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Infrastructure.PayrollDbContext.Repository.BookedLeaveDays
{
    public interface IBookedLeaveDaysRepository : IGenericRepository<BookedLeaveDaysEntity>
    {
        IEnumerable<BookedLeaveDaysEntity> GetBookedLeaveDaysForEmployeeList(IEnumerable<Guid> employeeIds);
        IEnumerable<BookedLeaveDaysEntity> GetBookedLeaveByIds(IEnumerable<Guid> leaveIds);
        Task BulkUpdate(IEnumerable<BookedLeaveDaysEntity> leave);
    }
}
