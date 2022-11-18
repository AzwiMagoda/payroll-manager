using AutoMapper;
using PayrollManager.Application.Employee.Dto;
using PayrollManager.Application.Employee.Interfaces;
using PayrollManager.Infrastructure.Models;
using PayrollManager.Infrastructure.PayrollDbContext;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.ContactDetailsRepository;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Dependant;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Employee;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.NotificationsRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PayrollManager.Application.Employee.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IContactDetailsRepository _contactDetailsRepository;
        private readonly IDependantRepository _dependantRepository;
        private readonly INotificationsRepository _notificationsRepository;
        private readonly PayrollDbContext _payrollDbContext;
        private readonly IMapper _mapper;


        public EmployeeService(IEmployeeRepository employeeRepository,
                               IContactDetailsRepository contactDetailsRepository,
                               IDependantRepository dependantRepository,
                               INotificationsRepository notificationsRepository,
                               PayrollDbContext payrollDbContext,
                               IMapper mapper)
        {
            _employeeRepository = employeeRepository ?? throw new ArgumentNullException(nameof(employeeRepository));
            _contactDetailsRepository = contactDetailsRepository ?? throw new ArgumentNullException(nameof(contactDetailsRepository));
            _dependantRepository = dependantRepository ?? throw new ArgumentNullException(nameof(dependantRepository));
            _notificationsRepository = notificationsRepository ?? throw new ArgumentNullException(nameof(notificationsRepository));
            _payrollDbContext = payrollDbContext ?? throw new ArgumentNullException(nameof(payrollDbContext));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
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

                return employee == null ? null
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
                        CreatedDate = employee.CreatedDate,
                        EmployeeNumber = employee.EmployeeNumber,
                        EmployeeType = employee.EmployeeType,
                        HireDate = employee.HireDate,
                        JobType = employee.JobType,
                        Location = employee.Location,
                        ManagerEmployeeId = employeeId,
                        OriginalHireDate = employee.OriginalHireDate,
                        TeamId = employee.TeamId
                    };
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }

        public async Task<string> CreateEmployee(CreateEmployeeDto employee)
        {
            try
            {
                var user = _payrollDbContext.Users.FirstOrDefault(x => x.Id == employee.Id);

                if (user != null)
                {
                    var employeeEntity = new EmployeeEntity
                    {
                        Company = "42Company",
                        Name = employee.Name,
                        Surname = employee.Surname,
                        Id = employee.Id,
                        CreatedDate = DateTime.Now,
                        EmployeeId = employee.Id,
                        JobTitle = employee.JobTitle,
                        Department = employee.Department,
                        Title = employee.Title,
                    };

                    await _employeeRepository.Create(employeeEntity);
                    return "User created";

                }
                return "User profile does not exist for this employee";

            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
                return ex.Message;
            }
        }

        public async Task UpdateEmployee(EmployeeDto employee)
        {
            try
            {
                var entity = await _employeeRepository.GetByEmployeeId(employee.Id);

                entity = _mapper.Map(employee, entity);

                await _employeeRepository.Update(entity);
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

        public IEnumerable<NotificationDto> GetAllNotifications(Guid employeeId)
        {
            try
            {
                var entities = _notificationsRepository.GetAllByEmployeeId(employeeId);
                return entities.Select(x =>
                {
                    return new NotificationDto
                    {
                        Id = x.Id,
                        EmployeeId = x.EmployeeId,
                        Message = x.Message,
                        NotificationType = x.NotificationType,
                        CreatedDate = x.CreatedDate,
                        Read = x.Read
                    };
                }).OrderByDescending(x => x.CreatedDate);
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }
    }
}
