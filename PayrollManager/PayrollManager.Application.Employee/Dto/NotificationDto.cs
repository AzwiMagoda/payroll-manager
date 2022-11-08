using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Application.Employee.Dto
{
    public class NotificationDto
    {
        public Guid Id { get; set; }
        public Guid EmployeeId { get; set; }
        public string NotificationType { get; set; }
        public string Message { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
