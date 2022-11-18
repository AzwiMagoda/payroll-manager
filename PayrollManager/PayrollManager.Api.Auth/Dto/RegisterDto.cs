using System.ComponentModel.DataAnnotations;

namespace PayrollManager.Api.Auth.Dto
{
    public class RegisterDto
    {
        public string Password { get; set; } = "Pa$$w0rd";
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Role { get; set; }
    }
}
