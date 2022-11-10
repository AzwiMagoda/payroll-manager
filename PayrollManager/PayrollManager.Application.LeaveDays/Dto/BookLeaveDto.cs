using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Application.LeaveDays.Dto
{
    public class BookLeaveDto
    {
        public int LeaveType { get; set; }
        public DateTime StartDate { get; set;}
        public DateTime EndDate { get; set; }
    }
}
