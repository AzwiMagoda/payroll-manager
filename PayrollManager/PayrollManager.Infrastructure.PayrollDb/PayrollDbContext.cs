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
        public DbSet<ContactDetailsEntity> ContactDetails { get; set; }
        public DbSet<DependentEntity> Dependents { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
