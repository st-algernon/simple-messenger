using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using zad5.Models;

namespace zad5.DTOs.Responses
{
    public class MessagesResponse
    {
        public bool Result { get; set; }
        public List<Message> Messages { get; set; }
        public List<string> Errors { get; set; }
    }
}
