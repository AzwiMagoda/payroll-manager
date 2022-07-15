﻿using PayrollManager.Application.Employee.Dto;
using PayrollManager.Application.Employee.Helpers;
using PayrollManager.Application.Employee.Interfaces;
using PayrollManager.Infrastructure.Models;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.BookedLeaveDays;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.ContactDetailsRepository;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Dependant;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Employee;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.LeaveDays;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Remuneration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PayrollManager.Application.Employee.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IRemunerationRepository _remunerationRepository;
        private readonly IContactDetailsRepository _contactDetailsRepository;
        private readonly IDependantRepository _dependantRepository;
        private readonly ILeaveDaysRepository _leaveDaysRepository;
        private readonly IBookedLeaveDaysRepository _bookedLeaveDaysRepository;

        public EmployeeService(IEmployeeRepository employeeRepository,
                               IRemunerationRepository remunerationRepository,
                               IContactDetailsRepository contactDetailsRepository,
                               IDependantRepository dependantRepository,
                               ILeaveDaysRepository leaveDaysRepository,
                               IBookedLeaveDaysRepository bookedLeaveDaysRepository)
        {
            _employeeRepository = employeeRepository ?? throw new ArgumentNullException(nameof(employeeRepository));
            _remunerationRepository = remunerationRepository ?? throw new ArgumentNullException(nameof(remunerationRepository));
            _contactDetailsRepository = contactDetailsRepository ?? throw new ArgumentNullException(nameof(contactDetailsRepository));
            _dependantRepository = dependantRepository ?? throw new ArgumentNullException(nameof(dependantRepository));
            _leaveDaysRepository = leaveDaysRepository ?? throw new ArgumentNullException(nameof(leaveDaysRepository));
            _bookedLeaveDaysRepository = bookedLeaveDaysRepository ?? throw new ArgumentNullException(nameof(bookedLeaveDaysRepository));
        }

        public IEnumerable<EmployeeDto> GetAllEmployees()
        {
            try
            {
                var entities = _employeeRepository.GetAll();
                return entities.Select(x =>
                {
                    return new EmployeeDto
                    {
                        Id = x.Id,
                        Company = x.Company,
                        Name = x.Name,
                        Surname = x.Surname,
                        Department = x.Department,
                        JobTitle = x.JobTitle,
                        Manager = x.Manager,
                        TeamName = x.TeamName,
                        Title = x.Title,
                        CreatedDate = x.CreatedDate
                    };
                });
            }
            catch (Exception ex)
            {
                throw new Exception();
            }

        }

        public async Task<EmployeeDto> GetEmployee(Guid employeeId)
        {
            try
            {
                var employee = await _employeeRepository.GetByID(employeeId);
                var contactDetails = await _contactDetailsRepository.GetByEmployeeId(employeeId);

                return employee == null || contactDetails == null ? null
                    : new EmployeeDto
                    {
                        Id = employeeId,
                        Company = employee.Company,
                        Name = employee.Name,
                        Surname = employee.Surname,
                        Department = employee.Department,
                        JobTitle = employee.JobTitle,
                        Manager = employee.Manager,
                        TeamName = employee.TeamName,
                        Title = employee.Title,
                        Cellphone = contactDetails.Cellphone,
                        Email = contactDetails.Email,
                        PhysicalAddress = contactDetails.PhysicalAddress,
                        Telephone = contactDetails.Telephone,
                        PostalAddress = contactDetails.PostalAddress,
                        CreatedDate = employee.CreatedDate
                    };
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }

        public async Task CreateEmployee(EmployeeDto employee)
        {
            try
            {
                var id = Guid.NewGuid();

                var employeeEntity = new EmployeeEntity
                {
                    Company = employee.Company,
                    Name = employee.Name,
                    Surname = employee.Surname,
                    Id = id,
                    CreatedDate = DateTime.Now,
                };

                await _employeeRepository.Create(employeeEntity);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
            }

        }

        public async Task UpdateEmployee(EmployeeDto employee)
        {
            try
            {
                var employeeEntity = new EmployeeEntity
                {
                    Company = employee.Company,
                    Name = employee.Name,
                    Surname = employee.Surname,
                    Id = employee.Id,
                    CreatedDate = DateTime.Now,
                };


                await _employeeRepository.Update(employeeEntity);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
            }

        }

        public async Task DeleteEmployee(Guid id)
        {
            try
            {
                await _remunerationRepository.Delete(id);
                await _employeeRepository.Delete(id);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);

            }
        }

        public async Task UpdatePersonalInfo(PersonalInfoDto info, Guid id)
        {
            try
            {
                var employee = await _employeeRepository.GetByID(id);

                employee.Name = info.Name;
                employee.Surname = info.Surname;
                employee.Title = info.Title;
                employee.JobTitle = info.JobTitle;
                employee.Department = info.Department;


                await _employeeRepository.Update(employee);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
            }

        }

        public async Task UpdateContactDetails(ContactDetailsDto info, Guid id)
        {
            try
            {
                var contactDetails = await _contactDetailsRepository.GetByID(id);

                contactDetails.Telephone = info.Telephone;
                contactDetails.Cellphone = info.Cellphone;
                contactDetails.PhysicalAddress = info.PhysicalAddress;
                contactDetails.PostalAddress = info.PostalAddress;


                await _contactDetailsRepository.Update(contactDetails);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
            }
        }

        public IEnumerable<DependantDto> GetEmployeeDependants(Guid employeeId)
        {
            try
            {
                var dependants = _dependantRepository.GetEmployeeDependants(employeeId);

                return dependants.Any() ? dependants.Select(x =>
                {
                    return new DependantDto
                    {
                        Cellphone = x.Cellphone,
                        CreatedDate = x.CreatedDate,
                        DateOfBirth = x.DateOfBirth,
                        Email = x.Email,
                        IDNumber = x.IDNumber,
                        Name = x.Name,
                        Surname = x.Surname,
                        Id = x.Id,
                        EmployeeId = employeeId
                    };
                }) : Array.Empty<DependantDto>();
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task CreateDependant(DependantDto dependant)
        {
            try
            {
                var dependantEntity = new DependentEntity
                {
                    Id = dependant.Id,
                    Cellphone = dependant.Cellphone,
                    CreatedDate = DateTime.Today,
                    DateOfBirth = dependant.DateOfBirth,
                    Email = dependant.Email,
                    EmployeeId = dependant.EmployeeId,
                    IDNumber = dependant.IDNumber,
                    Name = dependant.Name,
                    Surname = dependant.Surname
                };

                await _dependantRepository.Create(dependantEntity);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
            }
        }

        public async Task UpdateDependant(DependantDto dependant)
        {
            try
            {
                var dependantEntity = new DependentEntity
                {
                    Id = dependant.Id,
                    Cellphone = dependant.Cellphone,
                    CreatedDate = DateTime.Today,
                    DateOfBirth = dependant.DateOfBirth,
                    Email = dependant.Email,
                    EmployeeId = dependant.EmployeeId,
                    IDNumber = dependant.IDNumber,
                    Name = dependant.Name,
                    Surname = dependant.Surname
                };


                await _dependantRepository.Update(dependantEntity);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
            }
        }

        public async Task DeleteDependant(Guid dependantId)
        {
            try
            {
                await _dependantRepository.Delete(dependantId);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);

            }
        }

        public async Task<LeaveDaysDto> GetLeaveDaysBalances(Guid employeeId)
        {
            try
            {
                var leaveDays = await _leaveDaysRepository.GetByEmployeeId(employeeId);

                return new LeaveDaysDto
                {
                    AnnualLeaveBalance = leaveDays.AnnualLeaveBalance,
                    EmployeeId = employeeId,
                    SickLeaveBalance = leaveDays.SickLeaveBalance,
                    StudyLeaveBalance = leaveDays.StudyLeaveBalance,
                };
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }

        public IEnumerable<BookedLeaveDaysDto> GetBookedLeaveDays(Guid employeeId)
        {
            try
            {
                var entities = _bookedLeaveDaysRepository.GetAllByEmployeeId(employeeId);
                return entities.Select(x =>
                {
                    return new BookedLeaveDaysDto
                    {
                        Id = x.Id,
                        EndDate = x.EndDate,
                        LeaveType = x.LeaveType,
                        StartDate = x.StartDate
                    };
                }).OrderBy(x => x.LeaveType);
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }

        public async Task CreateBookedLeaveDay(BookedLeaveDaysDto bookedLeave, Guid employeeId)
        {
            try
            {
                //validate
                if (EmployeeHelper.ValidateDateRange(bookedLeave.StartDate, bookedLeave.EndDate))
                {
                    //calculateBalance
                    var leaveBalance = await _leaveDaysRepository.GetByEmployeeId(employeeId);
                    var leaveQty = EmployeeHelper.GetDateRanges(bookedLeave.StartDate, bookedLeave.EndDate).Count();

                    switch (bookedLeave.LeaveType)
                    {
                        case "AnnualLeave":
                            leaveBalance.AnnualLeaveBalance -= leaveQty;
                            await _leaveDaysRepository.Update(leaveBalance);
                            break;

                        case "SickLeave":
                            leaveBalance.SickLeaveBalance -= leaveQty;
                            await _leaveDaysRepository.Update(leaveBalance);
                            break;
                        case "StudyLeave":
                            leaveBalance.StudyLeaveBalance -= leaveQty;
                            await _leaveDaysRepository.Update(leaveBalance);
                            break;
                        default:
                            break;
                    }

                    var range = EmployeeHelper.RemoveWeekendsFromBookedLeave(bookedLeave.StartDate, bookedLeave.EndDate);

                    var bookedLeaveEntity = new BookedLeaveDaysEntity
                    {
                        Id = Guid.NewGuid(),
                        CreatedDate = DateTime.Now,
                        LeaveType = bookedLeave.LeaveType,
                        EmployeeId = employeeId,
                        EndDate = bookedLeave.EndDate,
                        StartDate = bookedLeave.StartDate
                    };

                    await _bookedLeaveDaysRepository.Create(bookedLeaveEntity);
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
            }
        }

    }
}
