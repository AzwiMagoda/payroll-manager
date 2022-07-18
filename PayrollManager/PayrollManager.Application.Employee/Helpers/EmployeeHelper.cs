using System;
using System.Collections.Generic;
using System.Linq;

namespace PayrollManager.Application.Employee.Helpers
{
    public static class EmployeeHelper
    {
        public static IEnumerable<DateTime> RemoveWeekendsFromBookedLeave(DateTime startDate, DateTime endDate)
        {
            var t = GetDateRanges(startDate, endDate)
                    .Where(x => x.DayOfWeek != DayOfWeek.Saturday && x.DayOfWeek != DayOfWeek.Sunday).ToList();

            return null;
        }

        public static IEnumerable<DateTime> GetDateRanges(DateTime start, DateTime end)
        {
            for (DateTime i = start; i <= end; i = i.AddDays(1))
            {
                yield return i;
            }
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
