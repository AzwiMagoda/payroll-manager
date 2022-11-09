﻿using PayrollManager.Application.LeaveDays.Dto;
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
        Task CreateBookedLeaveDay(BookedLeaveDaysDto bookedLeave, Guid employeeId);
        Task UpdateBookedLeaveDay(BookedLeaveDaysDto bookedLeave, Guid employeeId);
        Task DeleteBookedLeaveDay(Guid leaveId, Guid employeeId);
        Task ApproveLeave(IEnumerable<Guid> leaveIds);
        Task DeclineLeave(BookedLeaveDaysDto bookedLeave);
    }
}
