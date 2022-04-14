using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using zad5.DTOs.Requests;
using zad5.Models;

namespace zad5.Hubs
{
    [Authorize]
    public class MessagesHub : Hub
    {
        private readonly MessengerContext db;

        public MessagesHub(MessengerContext context)
        {
            db = context;
        }

        public async Task Send(MessageRequest request)
        {
            var userId = Context.User.Identity.Name;

            foreach (var recipientId in request.RecipientIds)
            {
                var message = new Message
                {
                    AuthorId = Guid.Parse(userId),
                    RecipientId = Guid.Parse(recipientId),
                    Subject = request.Subject,
                    Text = request.Text,
                    CreationDate = DateTime.Now
                };

                await db.Messages.AddAsync(message);
                await db.SaveChangesAsync();
                await db.Entry(message).Reference(m => m.Author).LoadAsync();

                await Clients.User(recipientId).SendAsync("Receive", message);
            }
        }
    }
}
