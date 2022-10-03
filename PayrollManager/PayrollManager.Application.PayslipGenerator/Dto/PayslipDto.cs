using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Application.PayslipGenerator.Dto
{
    public class PayslipDto
    {
        public Guid Id { get; set; }
        public Guid EmployeeId { get; set; }
        public string DownloadUrl { get; set; }
        public string PayslipName { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
