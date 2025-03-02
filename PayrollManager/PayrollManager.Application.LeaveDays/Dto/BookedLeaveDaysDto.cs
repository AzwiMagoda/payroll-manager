﻿using System;

namespace PayrollManager.Application.LeaveDays.Dto
{
    public class BookedLeaveDaysDto
    {
        public Guid Id { get; set; }
        public Guid EmployeeId { get; set; }
        public string LeaveType { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool Approved { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string TeamName { get; set; }
        public string Reason { get; set; }
        public string Status { get; set; }
        public DateTime CreatedDate { get; set; }

    }
}
