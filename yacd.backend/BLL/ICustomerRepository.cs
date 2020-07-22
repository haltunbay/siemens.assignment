using System.Collections.Generic;
using yacd.webapi.DAL.Models;

namespace yacd.webapi.BLL
{
    public interface ICustomerRepository
    {
        Customer Get(string firstName, string lastName);
        List<Customer> GetAll();
        int Upsert(Customer customer);
        int Remove(Customer customer);

    }
}
