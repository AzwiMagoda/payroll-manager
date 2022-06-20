using PayrollManager.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PayrollManager.Infrastructure.PayrollDbContext.Seed
{
    public class EmployeeSeed
    {
        public static async Task SeedData(PayrollDbContext context)
        {
            if (!context.Employees.Any() && !context.Remunerations.Any())
            {
                var id = Guid.NewGuid();
                var employees = new List<EmployeeEntity>
                {
                    new EmployeeEntity
                    {
                        Id = id,
                        Hours = 8,
                        Name = "Hulisani",
                        Surname = "Nefolovhodwe",
                        RemunerationId = id,
                        Company = "42Company",
                        CreatedDate = DateTime.Now
                    }
                };

                var remunerations = new List<RemunerationEntity>
                {
                    new RemunerationEntity
                    {
                        AnnualBaseSalary = 240000,
                        BonusFrequency = 6,
                        BonusPercentage = 10,
                        CreatedDate = DateTime.Now,
                        Id = id,
                        RetirementContribution = 5,
                        EmployeeId = id,
                    }
                };

                await context.Employees.AddRangeAsync(employees);
                await context.Remunerations.AddRangeAsync(remunerations);
                await context.SaveChangesAsync();
            }
        }
    }
}
