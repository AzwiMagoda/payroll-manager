using System;

namespace PayrollManager.Infrastructure.Models
{
    public class EmployeeEntity : IEntityBase
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Company { get; set; }
        public string Manager { get; set; }
        public string Department { get; set; }
        public string TeamName { get; set; }
        public string JobTitle { get; set; }
        public DateTime CreatedDate { get; set; }
        public Guid EmployeeId { get; set; }
        public Guid ManagerEmployeeId { get; set; }
        public string EmployeeNumber { get; set; }
        public string EmployeeType { get; set; }
        public string JobType { get; set; }
        public string Location { get; set; }
        public DateTime HireDate { get; set; }
        public DateTime OriginalHireDate { get; set; }
        public Guid TeamId { get; set; }


    }
}
