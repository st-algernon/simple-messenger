using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using zad5.DTOs.Requests;
using zad5.DTOs.Responses;
using zad5.Models;

namespace zad5.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MessagesController : ControllerBase
    {
        private readonly MessengerContext db;
        public MessagesController(MessengerContext context)
        {
            db = context;
        }

        [HttpGet("incoming")]
        public async Task<IActionResult> GetIncomingMessages()
        {
            var userId = HttpContext.User.Identity.Name;
            var incomingMessages = await db.Messages
                .Include(m => m.Author)
                .Where(m => m.RecipientId.ToString() == userId)
                .OrderByDescending(m => m.CreationDate)
                .ToListAsync();

            return Ok(new MessagesResponse
            {
                Result = true,
                Messages = incomingMessages
            });
        }

        [HttpGet("sent")]
        public async Task<IActionResult> GetSentMessages()
        {
            var userId = HttpContext.User.Identity.Name;
            var sentMessages = await db.Messages
                .Include(m => m.Recipient)
                .Where(m => m.AuthorId.ToString() == userId)
                .OrderByDescending(m => m.CreationDate)
                .ToListAsync();

            return Ok(new MessagesResponse
            {
                Result = true,
                Messages = sentMessages
            });
        }
    }
}
