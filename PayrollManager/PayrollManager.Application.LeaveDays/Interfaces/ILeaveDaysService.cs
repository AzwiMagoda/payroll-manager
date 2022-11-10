using PayrollManager.Application.LeaveDays.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Application.LeaveDays.Interfaces
{
    public interface ILeaveDaysService
    {
        Task<LeaveDaysDto> GetLeaveDaysBalances(Guid employeeId);
        IEnumerable<BookedLeaveDaysDto> GetBookedLeaveDays(Guid employeeId);
        IEnumerable<BookedLeaveDaysDto> GetEmployeeBookedLeaveDays(Guid managerId);
        Task CreateBookedLeaveDay(BookLeaveDto bookLeave, Guid employeeId, string fullName);
        Task UpdateBookedLeaveDay(BookedLeaveDaysDto bookedLeave, Guid employeeId);
        Task DeleteBookedLeaveDay(Guid leaveId, Guid employeeId);
        Task ApproveLeave(IEnumerable<Guid> leaveIds);
        Task DeclineLeave(DeclineLeaveDto bookedLeave);
    }
}
