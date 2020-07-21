using System.Collections.Generic;
using System.Linq;
using yacd.webapi.DAL;
using yacd.webapi.DAL.Models;

namespace yacd.webapi.BLL
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly CustomerDbContext _dbContext;

        public CustomerRepository(CustomerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Customer Get(string firstName, string lastName)
        {
            return _dbContext.Customers.Find(firstName, lastName);
        }

        public List<Customer> GetAll()
        {
            return _dbContext.Customers.ToList();
        }

        public int Upsert(Customer customer)
        {
            var customerFromDb = Get(customer.FirstName, customer.LastName);
            if (customerFromDb == null)
                _dbContext.Add(customer);
            else
            {
                customerFromDb.updateFrom(customer);
                _dbContext.Update(customerFromDb);
            }

            return _dbContext.SaveChanges();
        }

        public int Remove(Customer customer)
        {
            var customerFromDb = Get(customer.FirstName, customer.LastName);
            if (customerFromDb == null)
                return 0;
            _dbContext.Remove(customerFromDb);
            return _dbContext.SaveChanges();
        }
    }
}