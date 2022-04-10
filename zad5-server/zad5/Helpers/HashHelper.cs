using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using SHA3.Net;
using zad5.Configs;

namespace zad5.Helpers
{
    public class HashHelper
    {
        public static string ComputeSha3Hash(string data)
        {
            using Sha3 sha3512 = Sha3.Sha3512();
            using SHA256 sha256Hash = SHA256.Create();
            byte[] bytes = sha3512.ComputeHash(Encoding.UTF8.GetBytes(data + HashConfig.SALT));

            return ConvertToHex(bytes);
        }

        public static string ConvertToHex(byte[] bytes)
        {
            StringBuilder builder = new StringBuilder();

            for (int i = 0; i < bytes.Length; i++)
            {
                builder.Append(bytes[i].ToString("x2"));
            }

            return builder.ToString();
        }
    }
}
