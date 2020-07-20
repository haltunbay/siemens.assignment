using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using yacd.ui.Model;

namespace yacd.ui
{
    public class BackendService
    {
        public HttpClient Client;
        private readonly IHttpClientFactory _clientFactory;

        public BackendService(IHttpClientFactory clientFactory, IOptions<AppConfig> config)
        {
            _clientFactory = clientFactory;
            Client = clientFactory.CreateClient();
            Client.BaseAddress = new Uri(config.Value.BackendWebApi);
        }

        public async Task<IEnumerable<Customer>> getCustomers()
        {
            var response = await Client.GetAsync("/customer");
            response.EnsureSuccessStatusCode();
            await using var responseStream = await response.Content.ReadAsStreamAsync();
            return await JsonSerializer.DeserializeAsync
                <IEnumerable<Customer>>(responseStream);
        }

        public async Task<Customer> getCustomer(string firstName, string lastName)
        {
            var response = await Client.GetAsync($"/customer/single?firstName={firstName}&lastName={lastName}");
            response.EnsureSuccessStatusCode();
            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                await using var responseStream = await response.Content.ReadAsStreamAsync();
                return await JsonSerializer.DeserializeAsync<Customer>(responseStream);
            }
            return null;
        }

        public async Task PostItemAsync(Customer customer)
        {
            var json = new StringContent(
                JsonSerializer.Serialize(customer),
                Encoding.UTF8,
                "application/json");

            using var httpResponse =
                await Client.PostAsync("/customer", json);

            httpResponse.EnsureSuccessStatusCode();
        }

        public async Task DeleteItemAsync(Customer customer)
        {
            var json = new StringContent(
                JsonSerializer.Serialize(customer),
                Encoding.UTF8,
                "application/json");
            var method = HttpMethod.Delete;
            var requestUri = new Uri(Client.BaseAddress + "customer");
            var request = new HttpRequestMessage { Content = json, Method = method, RequestUri = requestUri };
            using var httpResponse = await Client.SendAsync(request);

            httpResponse.EnsureSuccessStatusCode();
        }
    }
}