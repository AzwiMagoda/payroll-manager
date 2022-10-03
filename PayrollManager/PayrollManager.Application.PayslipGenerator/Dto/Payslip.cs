using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Application.PayslipGenerator.Dto
{
    public class Payslip
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string IdentityNumber { get; set; }
        public string CompanyName { get; set; }
        public string CompanyAddress { get; set; }
        public string Address { get; set; }
        public string Gender { get; set; }
        public string TaxNumber { get; set; }
        public string Jobtitle { get; set; }
        public string Department { get; set; }
        public decimal MonthlyBaseSalary { get; set; }
        public decimal RetirementContribution { get; set; }
        public decimal MedicalAid { get; set; }
        public decimal LifeInsurance { get; set; }
        public decimal TotalEarnings { get; set; }
        public decimal TotalDeductions { get; set; }
        public decimal NettPay { get; set; }
        public decimal Tax { get; set; }
        public DateTime StartDate { get; set; }

    }
}
