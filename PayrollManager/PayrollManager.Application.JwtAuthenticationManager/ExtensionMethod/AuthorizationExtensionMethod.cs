using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Application.JwtAuthenticationManager.ExtensionMethod
{
    public static class AuthorizationExtensionMethod
    {
        public static void AddAuthenticationMethod(this IServiceCollection services)
        {
            services.AddAuthorization(opt =>
            {
                opt.AddPolicy("EmployeePolicy", policy => policy.RequireClaim("Role", "Employee"));
                opt.AddPolicy("HRPolicy", policy => policy.RequireClaim("Role", "HR"));
                opt.AddPolicy("ManagerPolicy", policy => policy.RequireClaim("Role", "Manager"));
                opt.AddPolicy("AdminPolicy", policy => policy.RequireClaim("Role", "Admin"));
                opt.AddPolicy("AuthenticatedPolicy", policy => policy.RequireAuthenticatedUser());
            });
        }
    }
}
