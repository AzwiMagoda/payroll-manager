using Autofac;
using Microsoft.EntityFrameworkCore;
using PayrollManager.Application.Employee.Interfaces;
using PayrollManager.Application.Employee.Services;
using PayrollManager.Application.PayslipGenerator.Interfaces;
using PayrollManager.Application.PayslipGenerator.Services;
using PayrollManager.Infrastructure.PayrollDbContext;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.BookedLeaveDays;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.ContactDetailsRepository;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Dependant;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Employee;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.LeaveDays;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Payslips;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Remuneration;

namespace PayrollManager.Api.Payslip.Autofac
{
    public class Modules : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            base.Load(builder);

            builder.RegisterType<PayrollDbContext>().AsSelf().As<DbContext>().InstancePerLifetimeScope();


            #region Services
            builder.RegisterType<EmployeeService>()
                .As<IEmployeeService>()
                .InstancePerLifetimeScope();

            builder.RegisterType<PayslipService>()
                .As<IPayslipService>()
                .InstancePerLifetimeScope();

            #endregion

            #region Repositories

            builder.RegisterType<EmployeeRepository>()
                .As<IEmployeeRepository>()
                .InstancePerLifetimeScope();

            builder.RegisterType<RemunerationRepository>()
                .As<IRemunerationRepository>()
                .InstancePerLifetimeScope();

            builder.RegisterType<ContactDetailsRepository>()
                .As<IContactDetailsRepository>()
                .InstancePerLifetimeScope();

            builder.RegisterType<DependantRepository>()
                .As<IDependantRepository>()
                .InstancePerLifetimeScope();

            builder.RegisterType<LeaveDaysRepository>()
                .As<ILeaveDaysRepository>()
                .InstancePerLifetimeScope();

            builder.RegisterType<BookedLeaveDaysRepository>()
                .As<IBookedLeaveDaysRepository>()
                .InstancePerLifetimeScope();

            builder.RegisterType<PayslipsRepository>()
                .As<IPayslipsRepository>()
                .InstancePerLifetimeScope();

            #endregion
        }
    }
}
