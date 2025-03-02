﻿using Microsoft.Extensions.Configuration;
using PayrollManager.Infrastructure.Models;
using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using PayrollManager.Application.JwtAuthenticationManager.Configuration;

namespace PayrollManager.Application.JwtAuthenticationManager.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;

        public TokenService(IConfiguration config)
        {
            _config = config;
        }

        public string CreateToken(UserEntity user, string role)
        {
            var claims = new List<Claim>
            {
                new Claim("Name", user.UserName),
                new Claim("Email", user.Email),
                new Claim("Role", role),
                new Claim("Id", user.Id.ToString()),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddMinutes(JwtConfiguration.JWT_TOKEN_EXPIRY),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
