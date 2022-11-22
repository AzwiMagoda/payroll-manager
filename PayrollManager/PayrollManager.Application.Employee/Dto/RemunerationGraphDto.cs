using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Application.Employee.Dto
{
    public class RemunerationGraphDto
    {
        public decimal AnnualBaseSalary { get; set; }
        public decimal MonthlyBaseSalary { get; set; }
        public decimal DailyBaseSalary { get; set; }
        public decimal AnnualBonus { get; set; }
        public decimal MonthlyBonus { get; set; }
        public decimal DailyBonus { get; set; }
    }
}
