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
                        Id = Guid.Parse("FDC2520B-A3D2-437C-88C3-8D814B151DBB"),
                        Email = "huli@test.com",
                        UserName = "hulisani.nefolovhodwe",
                        PhoneNumber = "0768987799",
                        IsActive = true,
                        StatusUpdateDate = DateTime.Now,
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
                    UserName = "brandon.friedman",
                    PhoneNumber = "0876789089",
                    IsActive = true,
                    StatusUpdateDate = DateTime.Now,
                };

                await userManager.CreateAsync(manager, "Pa$$w0rd");
                await userManager.AddToRoleAsync(manager, "Manager");

                var hr = new UserEntity
                {
                    Id = Guid.Parse("b6d5a90e-bafc-44a8-8366-2d365647280e"),
                    Email = "sheila@test.com",
                    UserName = "sheila.smithson",
                    PhoneNumber = "0875486985",
                    IsActive = true,
                    StatusUpdateDate = DateTime.Now,
                };

                await userManager.CreateAsync(hr, "Pa$$w0rd");
                await userManager.AddToRoleAsync(hr, "HR");

                var admin = new UserEntity
                {
                    Id = Guid.Parse("a5d399c8-62c5-4f63-bd73-e85e09308f07"),
                    Email = "admin@test.com",
                    UserName = "Admin",
                    PhoneNumber = "0875486985",
                    IsActive = true,
                    StatusUpdateDate = DateTime.Now,
                };

                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRoleAsync(admin, "Admin");
            }
        }
    }
}
