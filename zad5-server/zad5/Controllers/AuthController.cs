using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using zad5.DTOs.Requests;
using zad5.DTOs.Responses;
using zad5.Helpers;
using zad5.Models;

namespace zad5.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ChatContext db;
        //private readonly TokenValidationParameters tokenValidationParameters;

        public AuthController(ChatContext context)
        {
            db = context;
            //tokenValidationParameters = validationParams;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            User user = await db.Users.FirstOrDefaultAsync(a => a.Email == request.Email
                 && a.Password == HashHelper.ComputeSha3Hash(request.Password));

            if (user == null)
            {
                return BadRequest(new AuthResponse()
                {
                    Result = false,
                    Errors = new List<string>() { "Account doesn't exist" }
                });
            }

            var tokenHelper = new TokenHelper(db);

            return Ok(await tokenHelper.GenerateJwtAsync(user));
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            User user = db.Users.FirstOrDefault(
                u => u.Email == request.Email || u.Username == request.Username
            );

            if (user != null)
            {
                return BadRequest(new AuthResponse()
                {
                    Result = false,
                    Errors = new List<string>() { "A user with this email or username already exists" }
                });
            }

            user = new User
            {
                Name = request.Name,
                Email = request.Email,
                Username = request.Username,
                Password = HashHelper.ComputeSha3Hash(request.Password),
            };

            await db.AddAsync(user);
            await db.SaveChangesAsync();

            var tokenHelper = new TokenHelper(db);

            return Ok(await tokenHelper.GenerateJwtAsync(user));
        }

        //[HttpPut("refresh")]
        //public async Task<IActionResult> RefreshToken([FromBody] TokenRequest tokenRequest)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        var tokenHelper = new TokenHelper(db);
        //        var res = await tokenHelper.VerifyToken(tokenRequest, tokenValidationParameters);

        //        if (res == null)
        //        {
        //            return BadRequest(new AuthResponse()
        //            {
        //                Result = false,
        //                Errors = new List<string>() { "Invalid tokens" }
        //            });
        //        }

        //        return Ok(res);
        //    }

        //    return BadRequest(new AuthResponse()
        //    {
        //        Result = false,
        //        Errors = new List<string>() { "Invalid payload" }
        //    });
        //}
    }
}
