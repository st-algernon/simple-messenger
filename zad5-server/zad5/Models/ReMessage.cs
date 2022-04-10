using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace zad5.Models
{
    public class ReMessage : Message
    {
        public Guid RepliedMessageId { get; set; }
    }
}
