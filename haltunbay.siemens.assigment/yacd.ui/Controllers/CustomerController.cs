using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using yacd.ui.Model;

namespace yacd.ui.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly BackendService _backendService;

        public CustomerController(BackendService backendService)
        {
            _backendService = backendService;
        }
        [HttpGet]
        public Task<IEnumerable<Customer>> Get()
        {
            return _backendService.getCustomers();
        }

        [Route("single")]
        [HttpGet]
        public Task<Customer> Get([FromQuery] string firstName, [FromQuery] string lastName)
        {
            return _backendService.getCustomer(firstName, lastName);
        }

        [HttpPost]
        public Task Post([FromBody] Customer value)
        {
            return _backendService.PostItemAsync(value);
        }

        [HttpDelete]
        public Task Delete([FromBody] Customer customer)
        {
            return _backendService.DeleteItemAsync(customer);
        }
    }
}
