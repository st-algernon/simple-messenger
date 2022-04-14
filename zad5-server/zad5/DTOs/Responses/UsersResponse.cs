using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using zad5.Models;

namespace zad5.DTOs.Responses
{
    public class UsersResponse
    {
        public bool Result { get; set; }
        public List<User> Users { get; set; }
        public List<string> Errors { get; set; }
    }
}
