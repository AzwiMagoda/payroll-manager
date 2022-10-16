using Autofac;
using Microsoft.EntityFrameworkCore;
using PayrollManager.Application.Team.Interfaces;
using PayrollManager.Application.Team.Services;
using PayrollManager.Infrastructure.PayrollDbContext;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.ContactDetailsRepository;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Employee;

namespace PayrollManager.Api.Team.Autofac
{
    public class Modules : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            base.Load(builder);

            builder.RegisterType<PayrollDbContext>().AsSelf().As<DbContext>().InstancePerLifetimeScope();


            #region Services

            builder.RegisterType<TeamService>()
                .As<ITeamService>()
                .InstancePerLifetimeScope();

            #endregion

            #region Repositories

            builder.RegisterType<EmployeeRepository>()
                .As<IEmployeeRepository>()
                .InstancePerLifetimeScope();

            builder.RegisterType<ContactDetailsRepository>()
                .As<IContactDetailsRepository>()
                .InstancePerLifetimeScope();

            #endregion
        }
    }
}
