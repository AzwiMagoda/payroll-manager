using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using PayrollManager.Application.JwtAuthenticationManager.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayrollManager.Application.JwtAuthenticationManager.ExtensionMethod
{
    public static class JwtAuthenticationManagerExtensionMethod
    {
        public static void AddCustomJwtAuthentication(this IServiceCollection services)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtConfiguration.JWT_KEY));

            services.AddAuthentication(opt =>
                    {
                        opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                        opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    })
                    .AddJwtBearer(opt =>
                    {
                        opt.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuerSigningKey = true,
                            IssuerSigningKey = key,
                            ValidateIssuer = false,
                            ValidateAudience = false,
                            ValidateLifetime = true,
                            ClockSkew = TimeSpan.Zero
                            //ValidIssuer = JwtConfiguration.JWT_ISSUER,
                            //ValidAudience = JwtConfiguration.JWT_AUDIENCE,
                        };
                    });
        }
    }
}
