using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace zad5.Models
{
    public class Message
    {
        public Guid Id { get; set; }
        public Guid AuthorId { get; set; }
        public User Author { get; set; }
        public Guid RecipientId { get; set; }
        public User Recipient { get; set; }
        public string Subject { get; set; }
        public string Text { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
