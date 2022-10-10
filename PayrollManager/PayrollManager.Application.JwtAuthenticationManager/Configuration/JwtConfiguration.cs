using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Application.JwtAuthenticationManager.Configuration
{
    public static class JwtConfiguration
    {
        public const string JWT_KEY = "super secret key";
        public const string JWT_ISSUER = "https://localhost:44346";
        public const string JWT_AUDIENCE = "https://localhost:44346";
        public const int JWT_TOKEN_EXPIRY = 10;
    }
}
