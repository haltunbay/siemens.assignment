using System.Collections.Generic;
using System.Linq;
using yacd.webapi.DAL.Models;

namespace yacd.webapi.BLL
{
    public class InMemoryRepository : ICustomerRepository
    {
        public InMemoryRepository()
        {
            
        }

        public List<Customer> customers = new List<Customer>() { 
            new Customer{FirstName="Max", LastName="Musterman" },
            new Customer{FirstName="John", LastName="Doe" },
            new Customer{FirstName="Huseyin", LastName="Altunbay" }
        };
        public Customer Get(string firstName, string lastName)
        {
            return customers.FirstOrDefault(c=> c.isPkEqual(firstName, lastName));
        }

        public List<Customer> GetAll()
        {
            return customers;
        }

        public int Remove(Customer customer)
        { 
            return customers.Remove(customers.Find(c=>c.isPkEqual(customer)))?1:0;
        }

        public int Upsert(Customer customer)
        {
            var isCustomerExist = customers.Exists(c=> c.isPkEqual(customer));
            var index = customers.FindIndex(customer.isPkEqual);
            if (index == -1)//not exists
            {
                customers.Add(customer);
            }
            else
            {
                customers[index] = customer;
            }

            return 1;
        }
    }
}