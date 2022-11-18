using Microsoft.AspNetCore.Identity;
using PayrollManager.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Infrastructure.PayrollDbContext.Seed
{
    public class GeneralSeed
    {
        public static async Task SeedData(PayrollDbContext context)
        {
            if (!context.Departments.Any())
            {
                var departments = new List<DepartmentEntity>
                {
                    new DepartmentEntity
                    {
                        Id = Guid.NewGuid(),
                        CreatedDate = DateTime.Now,
                        DepartmentName = "Directors"
                    },
                    new DepartmentEntity
                    {
                        Id = Guid.NewGuid(),
                        CreatedDate = DateTime.Now,
                        DepartmentName = "Engineering"
                    },
                    new DepartmentEntity
                    {
                        Id = Guid.NewGuid(),
                        CreatedDate = DateTime.Now,
                        DepartmentName = "Human Resources"
                    },
                    new DepartmentEntity
                    {
                        Id = Guid.NewGuid(),
                        CreatedDate = DateTime.Now,
                        DepartmentName = "Marketing"
                    },
                    new DepartmentEntity
                    {
                        Id = Guid.NewGuid(),
                        CreatedDate = DateTime.Now,
                        DepartmentName = "Information Technology"
                    },
                    new DepartmentEntity
                    {
                        Id = Guid.NewGuid(),
                        CreatedDate = DateTime.Now,
                        DepartmentName = "Finance"
                    },
                };

                await context.Departments.AddRangeAsync(departments);
            }

            if (!context.Teams.Any())
            {
                var teams = new List<TeamEntity>
                {
                    new TeamEntity
                    {
                        Id = Guid.NewGuid(),
                        CreatedDate = DateTime.Now,
                        Department = "Engineering",
                        TeamName = "Splunkies",
                    },
                    new TeamEntity
                    {
                        Id = Guid.NewGuid(),
                        CreatedDate = DateTime.Now,
                        Department = "Human Resources",
                        TeamName = "Resourcerers",
                    },
                };

                await context.Teams.AddRangeAsync(teams);
            }

            await context.SaveChangesAsync();
        }
    }
}
