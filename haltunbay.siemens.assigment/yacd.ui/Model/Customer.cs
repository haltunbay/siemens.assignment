using System.ComponentModel.DataAnnotations;

namespace yacd.ui.Model
{
    public class Customer
    {
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string eMail { get; set; }
        public string city { get; set; }
        public string address { get; set; }
        public string phoneNumber { get; set; }

    }
}
