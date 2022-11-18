using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PayrollManager.Api.Auth.Dto;
using PayrollManager.Application.JwtAuthenticationManager.Services;
using PayrollManager.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace PayrollManager.Api.Auth.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<UserEntity> _userManager;
        private readonly SignInManager<UserEntity> _signInManager;
        private readonly TokenService _tokenService;

        public AuthController(TokenService tokenService, SignInManager<UserEntity> signInManager, UserManager<UserEntity> userManager)
        {
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpPost("Login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users
                        .FirstOrDefaultAsync(x => x.Email == loginDto.Email);
            if (user == null || user.IsActive == false) return Unauthorized();

            var result = await _signInManager.PasswordSignInAsync(user, loginDto.Password, true, false);
            var role = _userManager.GetRolesAsync(user).Result[0];

            return result.Succeeded ? CreateUserObject(user, role) : Unauthorized();
        }

        [HttpPost("Logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();

            return Ok();
        }

        private UserDto CreateUserObject(UserEntity user, string role)
        {
            return new UserDto
            {
                Email = user.Email,
                Role = role,
                EmployeeId = user.Id,
                Token = _tokenService.CreateToken(user, role),
            };
        }
    }
}
