using PayrollManager.Application.LeaveDays.Enums;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.BookedLeaveDays;
using System;
using System.Collections.Generic;
using System.Linq;

namespace PayrollManager.Application.LeaveDays.Helpers
{
    public static class EmployeeHelper
    {
        public static int BookedLeaveDaysUntilDate(DateTime date, Guid employeeId, LeaveTypes leaveType, IBookedLeaveDaysRepository bookedLeaveDaysRepository)
        {
            var count = 0;

            var bookedDays = bookedLeaveDaysRepository.GetAllByEmployeeId(employeeId)
                                                       .Where(x => x.StartDate.Date <= date.Date && x.LeaveType == leaveType.ToString());

            foreach (var booked in bookedDays)
            {
                count += RemoveWeekendsFromDateRange(booked.StartDate.Date, booked.EndDate.Date)
                                             .Where(d => d.Date <= date.Date)
                                             .Count();
            }

            return count;
        }

        public static IEnumerable<DateTime> RemoveWeekendsFromDateRange(DateTime start, DateTime end)
        {
            var dates = Enumerable.Range(0, end.Subtract(start).Days + 1)
                                  .Select(d => start.AddDays(d))
                                  .Where(d => d.DayOfWeek != DayOfWeek.Saturday || d.DayOfWeek != DayOfWeek.Sunday);

            return dates;
        }

        public static double AdditionalLeaveDays(DateTime date)
        {
            var now = DateTime.Now;

            var days = NumberOfFirstDaysOfMonthInRange(now, date);

            var leaveAccrual = 1.75d;

            return days * leaveAccrual;
        }

        public static int NumberOfFirstDaysOfMonthInRange(DateTime start, DateTime end)
        {

            var count = Enumerable.Range(0, end.Subtract(start).Days + 1)
                                .Select(d =>
                                {
                                    var date = start.AddDays(d);
                                    if (date.Day == 1) return date;
                                    else return DateTime.MinValue;
                                }).Count(x => x != DateTime.MinValue);

            return count;
        }

        public static bool ValidateAvailableDays(int numLeaveDays, int bookedLeaveDays)
        {
            return bookedLeaveDays <= numLeaveDays;
        }

        public static bool ValidateDateRange(DateTime startDate, DateTime endDate)
        {
            return startDate <= endDate;
        }
    }
}
