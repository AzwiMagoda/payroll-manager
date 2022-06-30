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
    }
}
