using Microsoft.AspNetCore.Identity;
using PayrollManager.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PayrollManager.Infrastructure.PayrollDbContext.Seed
{
    public class UserSeed
    {
        public static async Task SeedData(UserManager<UserEntity> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<UserEntity>
                {
                    new UserEntity
                    {
                        Id = Guid.Parse("D3B8BC49-BC21-49CC-ACBD-2A8381D06243"),
                        Email = "azwi@test.com",
                        UserName = "Azwi",
                        PhoneNumber = "0813147181"
                    },
                    new UserEntity
                    {
                        Id = Guid.Parse("FDC2520B-A3D2-437C-88C3-8D814B151DBB"),
                        Email = "huli@test.com",
                        UserName = "Huli",
                        PhoneNumber = "0768987799"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                    await userManager.AddToRoleAsync(user, "Employee");
                }

                var manager = new UserEntity
                {
                    Id = Guid.Parse("575F6FFC-C82D-4540-8D92-1B098CA7C460"),
                    Email = "brandon@test.com",
                    UserName = "Brandon",
                    PhoneNumber = "0876789089"
                };

                await userManager.CreateAsync(manager, "Pa$$w0rd");
                await userManager.AddToRoleAsync(manager, "Manager");

                var hr = new UserEntity
                {
                    Id = Guid.Parse("b6d5a90e-bafc-44a8-8366-2d365647280e"),
                    Email = "sheila@test.com",
                    UserName = "Sheila",
                    PhoneNumber = "0875486985"
                };

                await userManager.CreateAsync(hr, "Pa$$w0rd");
                await userManager.AddToRoleAsync(hr, "HR");

            }
        }
    }
}
