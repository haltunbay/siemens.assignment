using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using yacd.webapi.BLL;
using yacd.webapi.DAL.Models;

namespace yacd.webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerRepository _repository;

        public CustomerController(ICustomerRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<CustomersController>
        [Route("single")]
        [HttpGet]
        public IEnumerable<Customer> Get()
        {
            return _repository.GetAll();
        }

        // GET api/<CustomersController>/5
        [Route("single")]
        [HttpGet]
        public ActionResult Get([FromQuery] string firstName, [FromQuery] string lastName)
        {
            var result = _repository.Get(firstName, lastName);
            if (result == null) return NoContent();
            return Ok(result);
        }

        // POST api/<CustomersController>
        [HttpPost]
        public void Post([FromBody] Customer value)
        {
            _repository.Upsert(value);
        }

        // PUT api/<CustomersController>/5
        [HttpPut]
        public void Put([FromBody] Customer value)
        {
            _repository.Upsert(value);
        }

        // DELETE api/<CustomersController>/5
        [HttpDelete]
        public void Delete([FromBody] Customer customer)
        {
            _repository.Remove(customer);
        }
    }
}
