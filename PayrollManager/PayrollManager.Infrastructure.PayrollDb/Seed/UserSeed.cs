using Microsoft.AspNetCore.Identity;
using PayrollManager.Infrastructure.Models;
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
                        Email = "jen@test.com",
                        UserName = "Jen",
                        PhoneNumber = "0812909837"
                    },
                    new UserEntity
                    {
                        Email = "mark@test.com",
                        UserName = "Mark",
                        PhoneNumber = "0879876789"
                    },
                    new UserEntity
                    {
                        Email = "huli@test.com",
                        UserName = "Huli",
                        PhoneNumber = "0768987799"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                    //await userManager.AddToRoleAsync(user, "Employee");
                }
            }
        }
    }
}
