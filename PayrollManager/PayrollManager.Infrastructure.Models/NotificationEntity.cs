using System;

namespace PayrollManager.Infrastructure.Models
{
    public class NotificationEntity : IEntityBase
    {
        public Guid Id { get; set; }
        public Guid EmployeeId { get; set; }
        public string NotificationType { get; set; }
        public string Message { get; set; }
        public bool Read { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
