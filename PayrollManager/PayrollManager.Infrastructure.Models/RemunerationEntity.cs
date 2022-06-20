using System;

namespace PayrollManager.Infrastructure.Models
{
    public class RemunerationEntity : IEntityBase
    {
        public Guid Id { get; set; }
        public decimal AnnualBaseSalary { get; set; }
        public decimal BonusPercentage { get; set; }
        public decimal BonusFrequency { get; set; }
        public decimal RetirementContribution { get; set; }
        public Guid EmployeeId { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
