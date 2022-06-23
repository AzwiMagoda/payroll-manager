using PayrollManager.Infrastructure.Models;

namespace PayrollManager.Api.Auth.Services
{
    public interface ITokenService
    {
        string CreateToken(UserEntity user, string role);
    }
}
