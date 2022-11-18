using System;
using System.Globalization;

namespace PayrollManager.Api.Auth.Dto
{
    public class UserDetailsDto
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsActive { get; set; }
        public DateTime StatusUpdateDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string Role { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool HasEmployeeProfile { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
