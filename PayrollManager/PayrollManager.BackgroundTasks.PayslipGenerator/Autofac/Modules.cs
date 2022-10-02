using Autofac;
using PayrollManager.Application.PayslipGenerator.Interfaces;
using PayrollManager.Application.PayslipGenerator.Services;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.ContactDetailsRepository;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Employee;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.LeaveDays;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Remuneration;

namespace PayrollManager.BackgroundTasks.PayslipGenerator.Autofac
{
    public class Modules : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            base.Load(builder);

            #region Services
            builder.RegisterType<PayrollManager.Application.PayslipGenerator.Services.PayslipGenerator>()
                .As<IPayslipGenerator>()
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

            builder.RegisterType<LeaveDaysRepository>()
                .As<ILeaveDaysRepository>()
                .InstancePerLifetimeScope();
            #endregion
        }
    }
}
