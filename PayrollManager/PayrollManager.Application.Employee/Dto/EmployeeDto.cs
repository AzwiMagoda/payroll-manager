using System;

namespace PayrollManager.Application.Employee.Dto
{
    public class EmployeeDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public decimal Hours { get; set; }
        public string Company { get; set; }
        public decimal AnnualBaseSalary { get; set; }
        public decimal BonusPercentage { get; set; }
        public decimal BonusFrequency { get; set; }
        public decimal RetirementContribution { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
