using PayrollManager.Application.LeaveDays.Dto;
using PayrollManager.Application.LeaveDays.Helpers;
using PayrollManager.Application.LeaveDays.Interfaces;
using PayrollManager.Infrastructure.Models;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.BookedLeaveDays;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.LeaveDays;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Application.LeaveDays.Services
{
    public class LeaveDaysService : ILeaveDaysService
    {
        private readonly ILeaveDaysRepository _leaveDaysRepository;
        private readonly IBookedLeaveDaysRepository _bookedLeaveDaysRepository;

        public LeaveDaysService(ILeaveDaysRepository leaveDaysRepository,
                               IBookedLeaveDaysRepository bookedLeaveDaysRepository)
        {
            _leaveDaysRepository = leaveDaysRepository ?? throw new ArgumentNullException(nameof(leaveDaysRepository));
            _bookedLeaveDaysRepository = bookedLeaveDaysRepository ?? throw new ArgumentNullException(nameof(bookedLeaveDaysRepository));
        }

        public async Task<LeaveDaysDto> GetLeaveDaysBalances(Guid employeeId)
        {
            try
            {
                var leaveDays = await _leaveDaysRepository.GetByEmployeeId(employeeId);

                return new LeaveDaysDto
                {
                    AnnualLeaveBalance = leaveDays.AnnualLeaveBalance,
                    EmployeeId = employeeId,
                    SickLeaveBalance = leaveDays.SickLeaveBalance,
                    StudyLeaveBalance = leaveDays.StudyLeaveBalance,
                };
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }

        public IEnumerable<BookedLeaveDaysDto> GetBookedLeaveDays(Guid employeeId)
        {
            try
            {
                var entities = _bookedLeaveDaysRepository.GetAllByEmployeeId(employeeId);
                return entities.Select(x =>
                {
                    return new BookedLeaveDaysDto
                    {
                        Id = x.Id,
                        EndDate = x.EndDate,
                        LeaveType = x.LeaveType,
                        StartDate = x.StartDate
                    };
                }).OrderBy(x => x.LeaveType);
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }

        public async Task CreateBookedLeaveDay(BookedLeaveDaysDto bookedLeave, Guid employeeId)
        {
            try
            {
                //validate
                if (EmployeeHelper.ValidateDateRange(bookedLeave.StartDate, bookedLeave.EndDate))
                {
                    //calculateBalance
                    var leaveBalance = await _leaveDaysRepository.GetByEmployeeId(employeeId);
                    var leaveQty = EmployeeHelper.GetDateRanges(bookedLeave.StartDate, bookedLeave.EndDate).Count() * -1;
                    await _leaveDaysRepository.Update(AdjustLeave(leaveBalance, leaveQty, bookedLeave.LeaveType, employeeId));


                    var range = EmployeeHelper.RemoveWeekendsFromBookedLeave(bookedLeave.StartDate, bookedLeave.EndDate);

                    var bookedLeaveEntity = new BookedLeaveDaysEntity
                    {
                        Id = Guid.NewGuid(),
                        CreatedDate = DateTime.Now,
                        LeaveType = bookedLeave.LeaveType,
                        EmployeeId = employeeId,
                        EndDate = bookedLeave.EndDate,
                        StartDate = bookedLeave.StartDate
                    };

                    await _bookedLeaveDaysRepository.Create(bookedLeaveEntity);
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
            }
        }

        public async Task UpdateBookedLeaveDay(BookedLeaveDaysDto bookedLeave, Guid employeeId)
        {
            try
            {
                //adjust leave days
                //get original, add original count back
                var old = await _bookedLeaveDaysRepository.GetByID(bookedLeave.Id);

                var leaveBalance = await _leaveDaysRepository.GetByEmployeeId(employeeId);
                var oldLeaveQty = EmployeeHelper.GetDateRanges(old.StartDate, old.EndDate).Count();
                var newLeaveQty = EmployeeHelper.GetDateRanges(bookedLeave.StartDate, bookedLeave.EndDate).Count();

                //remove new count
                await _leaveDaysRepository.Update(AdjustLeave(leaveBalance, oldLeaveQty - newLeaveQty, bookedLeave.LeaveType, employeeId));

                //update leave
                old.EndDate = bookedLeave.EndDate.AddDays(1);
                old.StartDate = bookedLeave.StartDate.AddDays(1);
                old.LeaveType = bookedLeave.LeaveType;


                await _bookedLeaveDaysRepository.Update(old);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
            }
        }

        public async Task DeleteBookedLeaveDay(Guid leaveId, Guid employeeId)
        {
            try
            {
                //adjust leave days
                var leaveBalance = await _leaveDaysRepository.GetByEmployeeId(employeeId);
                var bookedLeave = await _bookedLeaveDaysRepository.GetByEmployeeId(employeeId);


                var leaveQty = EmployeeHelper.GetDateRanges(bookedLeave.StartDate, bookedLeave.EndDate).Count();
                await _leaveDaysRepository.Update(AdjustLeave(leaveBalance, leaveQty, bookedLeave.LeaveType, employeeId));

                //delete leave
                await _bookedLeaveDaysRepository.Delete(bookedLeave.Id);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);

            }
        }

        public static LeaveDaysEntity AdjustLeave(LeaveDaysEntity leaveBalance, int leaveQty, string leaveType, Guid employeeId)
        {
            switch (leaveType)
            {
                case "AnnualLeave":
                    leaveBalance.AnnualLeaveBalance += leaveQty;
                    return leaveBalance;

                case "SickLeave":
                    leaveBalance.SickLeaveBalance += leaveQty;
                    return leaveBalance;

                case "StudyLeave":
                    leaveBalance.StudyLeaveBalance += leaveQty;
                    return leaveBalance;
                default:
                    return leaveBalance;
            }
        }
    }
}
