using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PayrollManager.Infrastructure.Models;

namespace PayrollManager.Infrastructure.PayrollDbContext
{
    public class PayrollDbContext : IdentityDbContext<UserEntity>
    {
        public PayrollDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<EmployeeEntity> Employees { get; set; }
        public DbSet<RemunerationEntity> Remunerations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
