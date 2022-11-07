using Autofac;
using Microsoft.EntityFrameworkCore;
using PayrollManager.Application.LeaveDays.Interfaces;
using PayrollManager.Application.LeaveDays.Services;
using PayrollManager.Infrastructure.PayrollDbContext;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.BookedLeaveDays;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.LeaveDays;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.NotificationsRepository;

namespace PayrollManager.Api.LeaveDays.Autofac
{
    public class Modules : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            base.Load(builder);

            builder.RegisterType<PayrollDbContext>().AsSelf().As<DbContext>().InstancePerLifetimeScope();


            #region Services

            builder.RegisterType<LeaveDaysService>()
                .As<ILeaveDaysService>()
                .InstancePerLifetimeScope();

            #endregion

            #region Repositories
            builder.RegisterType<LeaveDaysRepository>()
                .As<ILeaveDaysRepository>()
                .InstancePerLifetimeScope();

            builder.RegisterType<BookedLeaveDaysRepository>()
                .As<IBookedLeaveDaysRepository>()
                .InstancePerLifetimeScope();

            builder.RegisterType<NotificationsRepository>()
                .As<INotificationsRepository>()
                .InstancePerLifetimeScope();

            #endregion
        }
    }
}
