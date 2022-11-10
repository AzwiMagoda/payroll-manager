using PayrollManager.Infrastructure.Models;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Generic;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.LeaveDays;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Infrastructure.PayrollDbContext.Repository.NotificationsRepository
{
    public class NotificationsRepository : GenericRepository<NotificationEntity>, INotificationsRepository
    {
        public NotificationsRepository(PayrollDbContext context) : base(context)
        {
        }
    }
}
