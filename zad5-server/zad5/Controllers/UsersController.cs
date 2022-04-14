using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using zad5.DTOs.Responses;
using zad5.Models;

namespace zad5.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly MessengerContext db;
        public UsersController(MessengerContext context)
        {
            db = context;
        }

        [HttpGet("current")]
        public async Task<IActionResult> GetCurrent()
        {
            var userId = HttpContext.User.Identity.Name;
            var user = await db.Users.FirstOrDefaultAsync(u => u.Id.ToString() == userId);

            return Ok(new UsersResponse
            {
                Result = true,
                Users = new List<User> { user }
            });
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> GetByUsername(string username)
        {
            var user = await db.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
            {
                return BadRequest(new UsersResponse
                {
                    Result = false,
                    Errors = new List<string> { "No users were found with this username" }
                });
            }

            return Ok(new UsersResponse
            {
                Result = true,
                Users = new List<User> { user }
            });
        }

        [HttpGet("search/{query}")]
        public async Task<IActionResult> SearchUsers(string query)
        {
            var users = await db.Users.Where(u => EF.Functions.Like(u.Username, $"%{query}%")).ToListAsync();

            return Ok(new UsersResponse
            {
                Result = true,
                Users = users
            });
        }

        [HttpGet("contacts")]
        public async Task<IActionResult> GetContacts(string query)
        {
            var userId = Guid.Parse(HttpContext.User.Identity.Name);

            var incomingMsgContacts = await db.Messages
                .Where(m => m.RecipientId == userId)
                .Select(m => m.Author)
                .ToListAsync();
            var sentMsgContacts = await db.Messages
                .Where(m => m.AuthorId == userId)
                .Select(m => m.Recipient)
                .ToListAsync();
            var contacts = incomingMsgContacts
                .Union(sentMsgContacts)
                .ToList();

            return Ok(new UsersResponse
            {
                Result = true,
                Users = contacts
            });
        }
    }
}
