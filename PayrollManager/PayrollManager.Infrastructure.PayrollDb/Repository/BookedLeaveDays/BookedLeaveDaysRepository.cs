using Microsoft.EntityFrameworkCore;
using PayrollManager.Infrastructure.Models;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Generic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Infrastructure.PayrollDbContext.Repository.BookedLeaveDays
{
    public class BookedLeaveDaysRepository : GenericRepository<BookedLeaveDaysEntity>, IBookedLeaveDaysRepository
    {
        public BookedLeaveDaysRepository(PayrollDbContext context) : base(context)
        {
        }

        public IEnumerable<BookedLeaveDaysEntity> GetBookedLeaveDaysForEmployeeList(IEnumerable<Guid> employeeIds)
        {
            return _context.BookedLeaveDays.Where(x => employeeIds.Contains(x.EmployeeId));
        }

        public IEnumerable<BookedLeaveDaysEntity> GetBookedLeaveByIds(IEnumerable<Guid> leaveIds)
        {
            return _context.BookedLeaveDays.Where(x => leaveIds.Contains(x.Id));
        }

        public async Task BulkUpdate(IEnumerable<BookedLeaveDaysEntity> leave)
        {
            _context.BookedLeaveDays.UpdateRange(leave);
            await _context.SaveChangesAsync();
        }
    }
}
