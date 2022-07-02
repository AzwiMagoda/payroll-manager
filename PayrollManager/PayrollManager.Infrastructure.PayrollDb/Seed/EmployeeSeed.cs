﻿using PayrollManager.Infrastructure.Models;
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
            if (!context.Employees.Any())
            {
                var id = Guid.Parse("FDC2520B-A3D2-437C-88C3-8D814B151DBB");
                var employees = new List<EmployeeEntity>
                {
                    new EmployeeEntity
                    {
                        Id = id,
                        Name = "Hulisani",
                        Surname = "Nefolovhodwe",
                        Company = "42Company",
                        Department = "Engineering",
                        JobTitle = "Splunk ENgineer",
                        Manager = "Brandon",
                        TeamName = "Splunkies",
                        Title = "Mr",
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

                var contactDetails = new List<ContactDetailsEntity>
                {
                    new ContactDetailsEntity
                    {
                        Id = id,
                        EmployeeId=id,
                        Cellphone = "0768987799",
                        Telephone = "0987898888",
                        Email = "hulisani.nefolovhodwe@42company.com",
                        PhysicalAddress = "20 Kingfisher Court, North Riding, Johannsburg",
                        PostalAddress = "20 Kingfisher Court, North Riding, Johannsburg",
                        CreatedDate= DateTime.Now,

                    }
                };

                var dependents = new List<DependentEntity>
                {
                    new DependentEntity
                    {
                        Id = Guid.NewGuid(),
                        EmployeeId=id,
                        Name = "Anza",
                        Surname = "Nefolovhodwe",
                        Cellphone = "",
                        DateOfBirth = DateTime.Parse("11/02/2021"),
                        Email = "",
                        IDNumber = "1234567891234",
                        CreatedDate= DateTime.Now,

                    }
                };

                await context.Employees.AddRangeAsync(employees);
                await context.Remunerations.AddRangeAsync(remunerations);
                await context.ContactDetails.AddRangeAsync(contactDetails);
                await context.Dependents.AddRangeAsync(dependents);
                await context.SaveChangesAsync();
            }
        }
    }
}
