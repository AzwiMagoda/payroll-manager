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
            if (!context.Employees.Any())
            {
                var id = Guid.Parse("FDC2520B-A3D2-437C-88C3-8D814B151DBB");
                var idManager = Guid.Parse("575F6FFC-C82D-4540-8D92-1B098CA7C460");
                var idHr = Guid.Parse("b6d5a90e-bafc-44a8-8366-2d365647280e");

                var employees = new List<EmployeeEntity>
                {
                    new EmployeeEntity
                    {
                        Id = id,
                        EmployeeId = id,
                        Name = "Hulisani",
                        Surname = "Nefolovhodwe",
                        Company = "42Company",
                        Department = "Engineering",
                        JobTitle = "Splunk Engineer",
                        Manager = "Brandon",
                        TeamName = "Splunkies",
                        Title = "Mr",
                        EmployeeType= "Regular",
                        CreatedDate = DateTime.Now,
                        HireDate = DateTime.Parse("2020/01/01"),
                        OriginalHireDate = DateTime.Parse("2020/01/01"),
                        JobType = "Full Time",
                        Location = "Johannesburg",
                        ManagerEmployeeId = idManager,
                    },
                    new EmployeeEntity
                    {
                        Id = idManager,
                        EmployeeId = idManager,
                        Name = "Brandon",
                        Surname = "Friedman",
                        Company = "42Company",
                        Department = "Engineering",
                        JobTitle = "Head of Splunk Engineering",
                        Manager = "Paula",
                        TeamName = "Splunkies",
                        Title = "Mr",
                        EmployeeType= "Regular",
                        CreatedDate = DateTime.Now,
                        HireDate = DateTime.Parse("2002/01/01"),
                        OriginalHireDate = DateTime.Parse("2002/01/01"),
                        JobType = "Full Time",
                        Location = "Johannesburg",
                        ManagerEmployeeId = Guid.NewGuid(),
                    },
                    new EmployeeEntity
                    {
                        Id = idHr,
                        EmployeeId = idHr,
                        Name = "Sheila",
                        Surname = "Smithson",
                        Company = "42Company",
                        Department = "Human Resources",
                        JobTitle = "Head of Human Resources",
                        Manager = "Adam",
                        TeamName = "Resourcerers",
                        Title = "Mrs",
                        EmployeeType= "Regular",
                        CreatedDate = DateTime.Now,
                        HireDate = DateTime.Parse("2005/01/01"),
                        OriginalHireDate = DateTime.Parse("2005/01/01"),
                        JobType = "Full Time",
                        Location = "Johannesburg",
                        ManagerEmployeeId = Guid.NewGuid(),
                    },
                };

                var remunerations = new List<RemunerationEntity>
                {
                    new RemunerationEntity
                    {
                        Id = Guid.NewGuid(),
                        EmployeeId = id,
                        AnnualBaseSalary = 240000,
                        BonusFrequency = 1,
                        BonusPercentage = 10,
                        CreatedDate = DateTime.Now,
                        RetirementContributionPercentage = 5
                    },
                    new RemunerationEntity
                    {
                        Id = Guid.NewGuid(),
                        EmployeeId = idManager,
                        AnnualBaseSalary = 1000500,
                        BonusFrequency = 1,
                        BonusPercentage = 25,
                        CreatedDate = DateTime.Now,
                        RetirementContributionPercentage = 20
                    },
                    new RemunerationEntity
                    {
                        Id = Guid.NewGuid(),
                        EmployeeId = idHr,
                        AnnualBaseSalary = 650000,
                        BonusFrequency = 1,
                        BonusPercentage = 25,
                        CreatedDate = DateTime.Now,
                        RetirementContributionPercentage = 10
                    }
                };

                var contactDetails = new List<ContactDetailsEntity>
                {
                    new ContactDetailsEntity
                    {
                        Id = Guid.NewGuid(),
                        EmployeeId=id,
                        Cellphone = "0768987799",
                        Telephone = "0987898888",
                        Email = "hulisani.nefolovhodwe@42company.com",
                        PhysicalAddress = "20 Kingfisher Court, North Riding, Johannsburg",
                        PostalAddress = "20 Kingfisher Court, North Riding, Johannsburg",
                        CreatedDate= DateTime.Now,
                        WorkAddress = "3 Mulberry Lane, Bryanston"
                    },
                    new ContactDetailsEntity
                    {
                        Id = Guid.NewGuid(),
                        EmployeeId=idManager,
                        Cellphone = "0678987767",
                        Telephone = "0765456545",
                        Email = "brandon.friedman@42company.com",
                        PhysicalAddress = "6 Alacazam Street, Bryanston, Gauteng",
                        PostalAddress = "6 Alacazam Street, Bryanston, Gauteng",
                        CreatedDate= DateTime.Now,
                        WorkAddress = "3 Mulberry Lane, Bryanston"
                    }
                    ,
                    new ContactDetailsEntity
                    {
                        Id = Guid.NewGuid(),
                        EmployeeId=idHr,
                        Cellphone = "0875486985",
                        Telephone = "0118987858",
                        Email = "sheila.smithson@42company.com",
                        PhysicalAddress = "21 Street Street, Bryanston, Gauteng",
                        PostalAddress = "21 Street Street, Bryanston, Gauteng",
                        CreatedDate= DateTime.Now,
                        WorkAddress = "3 Mulberry Lane, Bryanston"
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

                var leaveDays = new List<LeaveDaysEntity>
                {
                    new LeaveDaysEntity
                    {
                        Id = Guid.NewGuid(),
                        EmployeeId = id,
                        AnnualLeaveBalance = 14,
                        SickLeaveBalance = 30,
                        StudyLeaveBalance = 5,
                        CreatedDate = DateTime.Now
                    },
                    new LeaveDaysEntity
                    {
                        Id = Guid.NewGuid(),
                        EmployeeId = idManager,
                        AnnualLeaveBalance = 21,
                        SickLeaveBalance = 30,
                        StudyLeaveBalance = 5,
                        CreatedDate = DateTime.Now
                    },
                    new LeaveDaysEntity
                    {
                        Id = Guid.NewGuid(),
                        EmployeeId = idHr,
                        AnnualLeaveBalance = 21,
                        SickLeaveBalance = 30,
                        StudyLeaveBalance = 5,
                        CreatedDate = DateTime.Now
                    },
                };

                var bookedLeaveDays = new List<BookedLeaveDaysEntity>
                {
                    new BookedLeaveDaysEntity
                    {
                        Id = Guid.NewGuid(),
                        EmployeeId = id,
                        LeaveType = "AnnualLeave",
                        StartDate = DateTime.Today,
                        EndDate = DateTime.Today.AddDays(2),
                        CreatedDate = DateTime.Now
                    }
                };

                var deductions = new List<DeductionEntity>
                {
                    new DeductionEntity
                    {
                        Id = Guid.NewGuid(),
                        EmployeeId = id,
                        CreatedDate = DateTime.Now,
                        LifeInsurance = 90.45M,
                        MedicalAid = 3500,
                        Tax = 3000
                    },
                    new DeductionEntity
                    {
                        Id = Guid.NewGuid(),
                        EmployeeId = idManager,
                        CreatedDate = DateTime.Now,
                        LifeInsurance = 90.45M,
                        MedicalAid = 7000,
                        Tax = 11000
                    },
                    new DeductionEntity
                    {
                        Id = Guid.NewGuid(),
                        EmployeeId = idHr,
                        CreatedDate = DateTime.Now,
                        LifeInsurance = 90.45M,
                        MedicalAid = 6000,
                        Tax = 9000
                    }
                };

                await context.Employees.AddRangeAsync(employees);
                await context.Remunerations.AddRangeAsync(remunerations);
                await context.ContactDetails.AddRangeAsync(contactDetails);
                await context.Dependents.AddRangeAsync(dependents);
                await context.LeaveDays.AddRangeAsync(leaveDays);
                await context.BookedLeaveDays.AddRangeAsync(bookedLeaveDays);
                await context.Deductions.AddRangeAsync(deductions);
                await context.SaveChangesAsync();
            }
        }
    }
}
