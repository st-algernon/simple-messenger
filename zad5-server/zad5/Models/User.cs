using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace zad5.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public List<Chat> Chats { get; set; }
        public User()
        {
            Chats = new List<Chat>();
        }
    }
}
