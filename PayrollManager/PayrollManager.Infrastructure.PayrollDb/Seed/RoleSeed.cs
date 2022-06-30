using Microsoft.AspNetCore.Identity;
using PayrollManager.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Infrastructure.PayrollDbContext.Seed
{
    public class RoleSeed
    {
        public static async Task SeedData(RoleManager<RoleEntity> roleManager)
        {
            if (!roleManager.Roles.Any())
            {
                var roles = new List<RoleEntity>
                {
                    new RoleEntity
                    {
                        Id = Guid.NewGuid(),
                        Name = "HR",
                    },
                    new RoleEntity
                    {
                        Id = Guid.NewGuid(),
                        Name = "Employee",
                    },
                    new RoleEntity
                    {
                        Id = Guid.NewGuid(),
                        Name = "Manager",
                    },
                    new RoleEntity
                    {
                        Id = Guid.NewGuid(),
                        Name = "Admin",
                    },
                };

                foreach (var role in roles)
                {
                    await roleManager.CreateAsync(role);
                }
            }
        }
    }
}
