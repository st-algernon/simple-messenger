using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace zad5.DTOs.Requests
{
    public class MessageRequest
    {
        public string[] RecipientIds { get; set; }
        public string Subject { get; set; }
        public string Text { get; set; }
    }
}
