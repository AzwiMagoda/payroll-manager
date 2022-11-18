using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PayrollManager.Infrastructure.Models;
using System;

namespace PayrollManager.Infrastructure.PayrollDbContext
{
    public class PayrollDbContext : IdentityDbContext<UserEntity, RoleEntity, Guid>
    {
        public PayrollDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<EmployeeEntity> Employees { get; set; }
        public DbSet<RemunerationEntity> Remunerations { get; set; }
        public DbSet<DeductionEntity> Deductions { get; set; }
        public DbSet<ContactDetailsEntity> ContactDetails { get; set; }
        public DbSet<DependentEntity> Dependents { get; set; }
        public DbSet<LeaveDaysEntity> LeaveDays { get; set; }
        public DbSet<BookedLeaveDaysEntity> BookedLeaveDays { get; set; }
        public DbSet<PayslipsEntity> Payslips { get; set; }
        public DbSet<ManagerEmployeesEntity> ManagerEmployees { get; set; }
        public DbSet<NotificationEntity> Notifications { get; set; }
        public DbSet<TeamEntity> Teams { get; set; }
        public DbSet<DepartmentEntity> Departments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
