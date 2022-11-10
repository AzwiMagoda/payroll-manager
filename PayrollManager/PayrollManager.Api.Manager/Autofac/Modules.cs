using Autofac;
using Microsoft.EntityFrameworkCore;
using PayrollManager.Application.Manager.Interfaces;
using PayrollManager.Application.Manager.Services;
using PayrollManager.Infrastructure.PayrollDbContext;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.BookedLeaveDays;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Employee;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.ManagerEmployees;

namespace PayrollManager.Api.Manager.Autofac
{
    public class Modules : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            base.Load(builder);

            builder.RegisterType<PayrollDbContext>()
                   .AsSelf()
                   .As<DbContext>()
                   .InstancePerLifetimeScope();


            #region Services
            builder.RegisterType<ManagerService>()
                .As<IManagerService>()
                .InstancePerLifetimeScope();

            #endregion

            #region Repositories

            builder.RegisterType<EmployeeRepository>()
                .As<IEmployeeRepository>()
                .InstancePerLifetimeScope();

            builder.RegisterType<BookedLeaveDaysRepository>()
                .As<IBookedLeaveDaysRepository>()
                .InstancePerLifetimeScope();

            builder.RegisterType<ManagerEmployeesRepository>()
                .As<IManagerEmployeesRepository>()
                .InstancePerLifetimeScope();

            #endregion
        }
    }
}
