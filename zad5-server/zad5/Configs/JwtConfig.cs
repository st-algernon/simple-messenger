using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace zad5.Configs
{
    public class JwtConfig
    {
        public const string ISSUER = "ChatServer";
        public const string AUDIENCE = "ChatClient";
        private const string KEY = "nnuFFSju3Hh0Eamzeey3kznqbvqyYK8Q";
        public const int LIFETIME = 15;

        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
