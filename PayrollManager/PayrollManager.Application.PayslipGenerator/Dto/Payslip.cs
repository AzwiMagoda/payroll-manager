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
        public string Address { get; set; }
        public string Gender { get; set; }
        public string TaxNumber { get; set; }
        public string Jobtitle { get; set; }
        public string Department { get; set; }
        public DateTime StartDate { get; set; }

    }
}
