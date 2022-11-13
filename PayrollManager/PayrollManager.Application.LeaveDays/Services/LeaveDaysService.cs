using PayrollManager.Application.LeaveDays.Dto;
using PayrollManager.Application.LeaveDays.Enums;
using PayrollManager.Application.LeaveDays.Helpers;
using PayrollManager.Application.LeaveDays.Interfaces;
using PayrollManager.Infrastructure.Models;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.BookedLeaveDays;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.Employee;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.LeaveDays;
using PayrollManager.Infrastructure.PayrollDbContext.Repository.NotificationsRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PayrollManager.Application.LeaveDays.Services
{
    public class LeaveDaysService : ILeaveDaysService
    {
        private readonly ILeaveDaysRepository _leaveDaysRepository;
        private readonly IBookedLeaveDaysRepository _bookedLeaveDaysRepository;
        private readonly INotificationsRepository _notificationsRepository;
        private readonly IEmployeeRepository _employeeRepository;

        public LeaveDaysService(ILeaveDaysRepository leaveDaysRepository,
                               IBookedLeaveDaysRepository bookedLeaveDaysRepository,
                               INotificationsRepository notificationsRepository,
                               IEmployeeRepository employeeRepository)
        {
            _leaveDaysRepository = leaveDaysRepository ?? throw new ArgumentNullException(nameof(leaveDaysRepository));
            _bookedLeaveDaysRepository = bookedLeaveDaysRepository ?? throw new ArgumentNullException(nameof(bookedLeaveDaysRepository));
            _notificationsRepository = notificationsRepository ?? throw new ArgumentNullException(nameof(notificationsRepository));
            _employeeRepository = employeeRepository ?? throw new ArgumentNullException(nameof(employeeRepository));
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
                        StartDate = x.StartDate,
                        Approved = x.Approved,
                        Reason = x.Reason,
                        Status = x.Status,
                        CreatedDate = x.CreatedDate
                    };
                }).OrderBy(x => x.LeaveType);
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }

        public IEnumerable<BookedLeaveDaysDto> GetEmployeeBookedLeaveDays(Guid managerId)
        {
            try
            {
                var employees = _employeeRepository.GetAllManagerEmployees(managerId);
                var employeeIds = employees.Select(x => x.EmployeeId);
                var bookedLeaveDays = _bookedLeaveDaysRepository.GetBookedLeaveDaysForEmployeeList(employeeIds);

                var entitiesJoined = employees.Join(bookedLeaveDays,
                                                    employee => employee.EmployeeId,
                                                    bookedLeave => bookedLeave.EmployeeId,
                                                    (employee, bookedLeave) => new { Employee = employee, BookedLeave = bookedLeave });


                return entitiesJoined.Select(x =>
                {
                    return new BookedLeaveDaysDto
                    {
                        Id = x.BookedLeave.Id,
                        EndDate = x.BookedLeave.EndDate,
                        LeaveType = x.BookedLeave.LeaveType,
                        StartDate = x.BookedLeave.StartDate,
                        Approved = x.BookedLeave.Approved,
                        EmployeeId = x.Employee.EmployeeId,
                        Name = x.Employee.Name,
                        Surname = x.Employee.Surname,
                        TeamName = x.Employee.TeamName,
                        Status = x.BookedLeave.Status,
                        Reason = x.BookedLeave.Reason
                    };
                }).OrderBy(x => x.EmployeeId).OrderBy(x => x.LeaveType);
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }

        public async Task CreateBookedLeaveDay(BookLeaveDto bookLeave, Guid employeeId, string name)
        {
            try
            {
                //validate
                if (EmployeeHelper.ValidateDateRange(bookLeave.StartDate, bookLeave.EndDate))
                {
                    var employee = await _employeeRepository.GetByID(employeeId);

                    var bookedLeaveEntity = new BookedLeaveDaysEntity
                    {
                        Id = Guid.NewGuid(),
                        CreatedDate = DateTime.Now,
                        LeaveType = ((LeaveTypes)bookLeave.LeaveType).ToString(),
                        EmployeeId = employeeId,
                        EndDate = bookLeave.EndDate,
                        StartDate = bookLeave.StartDate,
                        Approved = false,
                        Status = ApprovalStatus.Pending.ToString()
                    };

                    var employeeNotification = new NotificationEntity
                    {
                        Id = Guid.NewGuid(),
                        CreatedDate = DateTime.Now,
                        EmployeeId = employeeId,
                        Message = $"Leave days booked from {bookLeave.StartDate.ToShortDateString()} - {bookLeave.EndDate.ToShortDateString()}",
                        NotificationType = NotificationTypes.LeaveDays.ToString(),
                        Read = false
                    };

                    var managerNotification = new NotificationEntity
                    {
                        Id = Guid.NewGuid(),
                        CreatedDate = DateTime.Now,
                        EmployeeId = employee.ManagerEmployeeId,
                        Message = $"{name} booked leave from {bookLeave.StartDate.ToShortDateString()} - {bookLeave.EndDate.ToShortDateString()}",
                        NotificationType = NotificationTypes.LeaveDays.ToString(),
                        Read = false
                    };

                    await _bookedLeaveDaysRepository.Create(bookedLeaveEntity);

                    await _notificationsRepository.Create(employeeNotification);
                    await _notificationsRepository.Create(managerNotification);
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
            }
        }

        public async Task UpdateBookedLeaveDay(BookedLeaveDaysDto bookedLeave, Guid employeeId)
        {
            try
            {
                //adjust leave days
                //get original, add original count back
                var old = await _bookedLeaveDaysRepository.GetByID(bookedLeave.Id);

                var leaveBalance = await _leaveDaysRepository.GetByEmployeeId(employeeId);
                var oldLeaveQty = EmployeeHelper.GetDateRanges(old.StartDate, old.EndDate).Count();
                var newLeaveQty = EmployeeHelper.GetDateRanges(bookedLeave.StartDate, bookedLeave.EndDate).Count();

                //remove new count
                await _leaveDaysRepository.Update(AdjustLeave(leaveBalance, oldLeaveQty - newLeaveQty, bookedLeave.LeaveType, employeeId));

                //update leave
                old.EndDate = bookedLeave.EndDate.AddDays(1);
                old.StartDate = bookedLeave.StartDate.AddDays(1);
                old.LeaveType = bookedLeave.LeaveType;


                await _bookedLeaveDaysRepository.Update(old);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
            }
        }

        public async Task DeleteBookedLeaveDay(Guid leaveId, Guid employeeId)
        {
            try
            {
                //adjust leave days
                var leaveBalance = await _leaveDaysRepository.GetByEmployeeId(employeeId);
                var bookedLeave = await _bookedLeaveDaysRepository.GetByEmployeeId(employeeId);


                var leaveQty = EmployeeHelper.GetDateRanges(bookedLeave.StartDate, bookedLeave.EndDate).Count();
                await _leaveDaysRepository.Update(AdjustLeave(leaveBalance, leaveQty, bookedLeave.LeaveType, employeeId));

                //delete leave
                await _bookedLeaveDaysRepository.Delete(bookedLeave.Id);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);

            }
        }

        public async Task ApproveLeave(IEnumerable<Guid> leaveIds)
        {
            var leaveEntities = _bookedLeaveDaysRepository.GetBookedLeaveByIds(leaveIds);

            leaveEntities = leaveEntities.Select(x =>
            {
                x.Approved = true;
                x.Status = ApprovalStatus.Approved.ToString();
                x.Reason = "";
                return x;
            });

            await _bookedLeaveDaysRepository.BulkUpdate(leaveEntities);
        }

        public async Task DeclineLeave(DeclineLeaveDto bookedLeave)
        {
            var entity = await _bookedLeaveDaysRepository.GetByID(bookedLeave.Id);

            entity.Reason = bookedLeave.Reason;
            entity.Approved = false;
            entity.Status = ApprovalStatus.Declined.ToString();

            await _bookedLeaveDaysRepository.Update(entity);
        }

        public static LeaveDaysEntity AdjustLeave(LeaveDaysEntity leaveBalance, int leaveQty, string leaveType, Guid employeeId)
        {
            switch (leaveType)
            {
                case "AnnualLeave":
                    leaveBalance.AnnualLeaveBalance += leaveQty;
                    return leaveBalance;

                case "SickLeave":
                    leaveBalance.SickLeaveBalance += leaveQty;
                    return leaveBalance;

                case "StudyLeave":
                    leaveBalance.StudyLeaveBalance += leaveQty;
                    return leaveBalance;
                default:
                    return leaveBalance;
            }
        }
    }
}
