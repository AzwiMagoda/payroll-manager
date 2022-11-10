using PayrollManager.Infrastructure.Models;

namespace PayrollManager.Application.JwtAuthenticationManager.Services
{
    public interface ITokenService
    {
        string CreateToken(UserEntity user, string role);
    }
}
