using System.ComponentModel.DataAnnotations;

namespace yacd.webapi.DAL.Models
{
    public class Customer
    {
        [Key]
        public string FirstName { get; set; }
        [Key]
        public string LastName { get; set; }
        public string EMail { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }

        public bool isPkEqual(string firstName, string lastName)
        {
            return this.FirstName == firstName && this.LastName == lastName;
        }

        public bool isPkEqual(Customer customer)
        {
            return this.FirstName == customer.FirstName && this.LastName == customer.LastName;
        }

        public void updateFrom(Customer source)
        {
            this.Address = source.Address;
            this.City = source.City;
            this.EMail = source.EMail;
            this.PhoneNumber = source.PhoneNumber;
        }

    }
}
