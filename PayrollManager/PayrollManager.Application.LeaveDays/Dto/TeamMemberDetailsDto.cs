using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Application.LeaveDays.Dto
{
    public class TeamMemberDetailsDto
    {
        public string Title { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string JobTitle { get; set; }
        public string ManagerName { get; set; }
        public string TeamName { get; set; }
        public string Email { get; set; }
        public string CellphoneNumber { get; set; }
        public DateTime StartDate { get; set; }

    }
}
