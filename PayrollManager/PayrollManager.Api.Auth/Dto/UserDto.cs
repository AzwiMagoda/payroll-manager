using System;

namespace PayrollManager.Api.Auth.Dto
{
    public class UserDto
    {
        public string Token { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public Guid EmployeeId { get; set; }
    }
}
