using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Application.Employee.Dto
{
    public class RemunerationDto
    {
        public decimal AnnualBaseSalary { get; set; }
        public decimal BonusPercentage { get; set; }
        public int BonusFrequency { get; set; }
        public decimal RetirementContributionPercentage { get; set; }
        public Guid EmployeeId { get; set; }
    }
}
