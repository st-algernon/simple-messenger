using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace zad5.Models
{
    public class Chat
    {
        public Guid Id { get; set; }
        public List<Message> Messages { get; set; }
        public DateTime CreationDate { get; set; }
        public List<User> Members { get; set; }
        public Chat()
        {
            Members = new List<User>();
            Messages = new List<Message>();
        }
    }
}
