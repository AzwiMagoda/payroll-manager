using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PayrollManager.Api.Auth.Dto;
using PayrollManager.Infrastructure.Models;
using PayrollManager.Infrastructure.PayrollDbContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PayrollManager.Api.Auth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserManagementController : ControllerBase
    {
        private readonly UserManager<UserEntity> _userManager;
        private readonly SignInManager<UserEntity> _signInManager;
        private readonly PayrollDbContext _payrollDbContext;

        public UserManagementController(UserManager<UserEntity> userManager,
                                        SignInManager<UserEntity> signInManager,
                                        PayrollDbContext payrollDbContext)
        {
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            _signInManager = signInManager ?? throw new ArgumentNullException(nameof(signInManager));
            _payrollDbContext = payrollDbContext ?? throw new ArgumentNullException(nameof(payrollDbContext));
        }

        [Authorize(Policy = "AdminPolicy")]
        [HttpPost("Register")]
        public async Task<ActionResult<Guid>> RegisterUser(RegisterDto registerDto)
        {
            var userId = Guid.NewGuid();
            var userName = $"{registerDto.FirstName.ToLower()}.{registerDto.LastName.ToLower()}";
            var domain = "test";

            var exists = _userManager.Users.FirstOrDefault(x => x.UserName == userName);

            if (exists == null)
            {
                var user = new UserEntity
                {
                    Id = userId,
                    Email = $"{userName}@{domain}.com",
                    PhoneNumber = registerDto.PhoneNumber,
                    UserName = userName,
                    IsActive = false,
                    CreatedDate = DateTime.Now,
                    StatusUpdateDate = DateTime.Now,
                    FirstName = registerDto.FirstName,
                    LastName = registerDto.LastName,
                };

                var result = await _userManager.CreateAsync(user, registerDto.Password);

                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, registerDto.Role);
                    return Ok(userId);
                }
                return BadRequest("Unable to create user");
            }
            return BadRequest("user exists");
        }

        [Authorize(Policy = "AdminOrHR")]
        [HttpGet("GetUserList")]
        public ActionResult<IEnumerable<UserDetailsDto>> GetUserList()
        {
            var userEntity = _userManager.Users.Select(x => new UserDetailsDto
            {
                Id = x.Id,
                StatusUpdateDate = x.StatusUpdateDate,
                Email = x.Email,
                IsActive = x.IsActive,
                PhoneNumber = x.PhoneNumber,
                UpdatedDate = x.UpdatedDate,
                UserName = x.UserName,
                Role = GetUserRole(_userManager, x),
                CreatedDate = x.CreatedDate,
                HasEmployeeProfile = HasEmployeeProfile(_payrollDbContext, x.Id)
            }).OrderByDescending(x => x.CreatedDate).ToList();

            return Ok(userEntity);
        }

        [Authorize(Policy = "AdminPolicy")]
        [HttpPut("UpdateUserStatus/{userId}")]
        public async Task<IActionResult> UpdateUserStatus(Guid userId)
        {
            var user = _userManager.Users.FirstOrDefault(x => x.Id == userId);

            user.IsActive = !user.IsActive;
            user.StatusUpdateDate = DateTime.Now;

            await _userManager.UpdateAsync(user);
            return Ok("User status updated");
        }

        [Authorize(Policy = "AdminPolicy")]
        [HttpPut("UpdateUserDetails")]
        public async Task<IActionResult> UpdateUserDetails([FromBody] UserDetailsDto userDto)
        {
            var user = _userManager.Users.FirstOrDefault(x => x.Id == userDto.Id);

            user.Email = userDto.Email;
            user.PhoneNumber = userDto.PhoneNumber;
            user.UserName = userDto.UserName;

            await _userManager.UpdateAsync(user);
            return Ok("User updated");
        }

        private static string GetUserRole(UserManager<UserEntity> userManager, UserEntity user)
        {
            return userManager.GetRolesAsync(user).Result[0];
        }

        private static bool HasEmployeeProfile(PayrollDbContext payrollDbContext, Guid userId)
        {

            return payrollDbContext.Employees.Any(x => x.EmployeeId == userId);
        }
    }
}
