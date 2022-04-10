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
        public Guid ChatId { get; set; }
        public Chat Chat { get; set; }
        public string Text { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
