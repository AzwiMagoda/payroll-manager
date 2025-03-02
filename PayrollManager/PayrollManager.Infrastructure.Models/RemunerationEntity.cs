﻿using System;

namespace PayrollManager.Infrastructure.Models
{
    public class RemunerationEntity : IEntityBase
    {
        public Guid Id { get; set; }
        public decimal AnnualBaseSalary { get; set; }
        public decimal MonthlyBaseSalary { get; set; }
        public decimal BonusPercentage { get; set; }
        public int BonusFrequency { get; set; }
        public decimal RetirementContributionPercentage { get; set; }
        public decimal RetirementBalance { get; set; }
        public int OvertimeHrs { get; set; }
        public Guid EmployeeId { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
