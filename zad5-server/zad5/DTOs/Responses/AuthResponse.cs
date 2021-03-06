using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace zad5.DTOs.Responses
{
    public class AuthResponse
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public int ExpiresIn { get; set; }
        public bool Result { get; set; }
        public List<string> Errors { get; set; }
    }
}
