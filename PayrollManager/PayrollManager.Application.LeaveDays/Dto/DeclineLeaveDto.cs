using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Application.LeaveDays.Dto
{
    public class DeclineLeaveDto
    {
        public Guid Id { get; set; }
        public string Reason { get; set; }
    }
}
