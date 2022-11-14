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

        [AllowAnonymous]
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

        [Authorize(Policy = "AdminPolicy")]
        [HttpPost("Register")]
        public async Task<ActionResult<Guid>> RegisterUser(RegisterDto registerDto)
        {
            var userId = Guid.NewGuid();
            var user = new UserEntity
            {
                Id = userId,
                Email = registerDto.Email,
                PhoneNumber = registerDto.PhoneNumber,
                UserName = $"{registerDto.FirstName.ToLower()}.{registerDto.LastName.ToLower()}",
                IsActive = false,
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, registerDto.Role);
                return Ok(userId);
            }
            return BadRequest();
        }

        [Authorize(Policy = "AdminPolicy")]
        [HttpGet("GetUserList")]
        public ActionResult<IEnumerable<UserDetailsDto>> GetUserList()
        {
            var userEntity = _userManager.Users.Select(x => new UserDetailsDto
            {
                ActivationDate = x.ActivationDate,
                DeactivationDate = x.DeactivationDate,
                Email = x.Email,
                IsActive = x.IsActive,
                PhoneNumber = x.PhoneNumber,
                UpdatedDate = x.UpdatedDate,
                UserName = x.UserName,
            }).ToList();

            return Ok(userEntity);
        }

        [Authorize(Policy = "AuthenticatedPolicy")]
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
