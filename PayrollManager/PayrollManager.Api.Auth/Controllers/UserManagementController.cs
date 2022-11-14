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
    [Authorize(Policy = "AdminPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserManagementController : ControllerBase
    {
        private readonly UserManager<UserEntity> _userManager;
        private readonly SignInManager<UserEntity> _signInManager;
        private readonly PayrollDbContext _payrollDbContext;

        public UserManagementController(UserManager<UserEntity> userManager, SignInManager<UserEntity> signInManager, PayrollDbContext payrollDbContext)
        {
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            _signInManager = signInManager ?? throw new ArgumentNullException(nameof(signInManager));
            _payrollDbContext = payrollDbContext;
        }

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
            }).ToList();

            return Ok(userEntity);
        }

        [HttpPut("UpdateUserStatus/{userId}")]
        public async Task<IActionResult> UpdateUserStatus(Guid userId)
        {
            var user = _userManager.Users.FirstOrDefault(x => x.Id == userId);

            user.IsActive = !user.IsActive;

            await _userManager.UpdateAsync(user);
            await _payrollDbContext.SaveChangesAsync();
            return Ok("User status updated");
        }

        [HttpPut("UpdateUserDetails")]
        public async Task<IActionResult> UpdateUserDetails([FromBody] UserDetailsDto userDto)
        {
            var user = _userManager.Users.FirstOrDefault(x => x.Id == userDto.Id);

            user.Email = userDto.Email;
            user.PhoneNumber = userDto.PhoneNumber;
            user.UserName = userDto.UserName;

            await _userManager.UpdateAsync(user);
            await _payrollDbContext.SaveChangesAsync();
            return Ok("User updated");
        }
    }
}
