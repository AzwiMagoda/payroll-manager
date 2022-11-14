using System;

namespace PayrollManager.Api.Auth.Dto
{
    public class UserDetailsDto
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsActive { get; set; }
        public DateTime ActivationDate { get; set; }
        public DateTime DeactivationDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
