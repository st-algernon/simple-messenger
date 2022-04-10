using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace zad5.Models
{
    public class ChatContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Chat> Chats { get; set; }
        public DbSet<ReMessage> ReMessages { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        public ChatContext(DbContextOptions<ChatContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
