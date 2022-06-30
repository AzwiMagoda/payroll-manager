using System;

namespace PayrollManager.Application.Employee.Dto
{
    public class EmployeeDto
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
        public string Email { get; set; }
        public string Telephone { get; set; }
        public string Cellphone { get; set; }
        public string PhysicalAddress { get; set; }
        public string PostalAddress { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
