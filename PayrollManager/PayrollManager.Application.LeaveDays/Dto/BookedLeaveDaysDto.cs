﻿using System;

namespace PayrollManager.Application.LeaveDays.Dto
{
    public class BookedLeaveDaysDto
    {
        public Guid Id { get; set; }
        public string LeaveType { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
