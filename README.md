# Yet Another Customer Data
Yet Another Customer Data is simple single page application provides CRUD operations on customer data.
It is built with 
- ASP.NET Core and C# for cross-platform server-side code
- Angular and TypeScript for client-side code
- Bootstrap and PrimeNg for layout and styling (normally one of them could do work but based on my previous experince I preferred Bootstrap 3 for layout and styling, but I benefit from Primeng features like typehead and modal confirmations.)
- EntityFrameworkCore for Data access
- SQLite for persistence layer. SQLite was preferred because it is stable, cross-platform, serverless. Fits perfectly to our project needs.
- Swashbuckle Swagger for webapi testing
- During development Visual Studio 2019 and Vs Code was used.

##  Application components. 
The application consist of two components. 
### Backend Web API
The  backend webapi was developed with ASP.NET Core and C#. It provides rest inteface for CRUD operations. It is hosted on 5000 port by default.
It provides following rest endpoints 
- get all customers, method: [get], route /customer
- get single customer, method: [get], route /customer/single?firstName=&lastName=
- upsert(update if exists insert otherwise) [put or post], route /customer
- delete method: [delete], route /customer

##### Data access
For data access layer Entity Framework Core with Code First approach was used. On top of this Repository pattern without Unit of Work used. The repository is injected to Controller so that it manages data persistence operations. The database can be initially created with `dotnet ef migrations add InitialCreate` then after `dotnet ef database update`. The customers.db file is created under projects root folder. If file existed before should be deleted first.

##### Exception handling, 
For exception handling a middleware was created, which is a central point to evaluate and log exceptions. For logging serilog is used. Because of the time contraints it is not working right now but idea was to log into  rolling file. 

##### Testing,
Considering application simplicity no unit tests was developed. For testing rest endpoints however Swashbuckle Swagger component is used. 
****
### Web Frontend
The second component is client app. It has ASP.Net Core Web api part to communicate with backend webapi includes an Angular SPA part as user interface. The angular app served inside asp.net core application using Microsoft.AspNetCore.SpaServices.Extensions. Both web api and angular app hosted  on 5001 port by default. 

##### ASP.Net Core Web api

> Browser security prevents a web page from making requests to a different domain than the one that served the web page. This restriction is called the same-origin policy. Usually it is the case that backend api and client user interface run on different hosts or domain. To deal with that problem an extra web api layer.is required to communicate with backend service. 

The Asp.Net Core web api part on client app project has the responsibility to making rest calls to the backend service. It is very simple and straightforward service performs async rest calls using HttpClient and pass response to the angular. It has following endpoints

- get all customers, method: [get], route /api/customer
- get single customer, method: [get], route /api/customer/single?firstName=&lastName=
- upsert(update if exists insert otherwise) [put or post], route /api/customer
- delete method: [delete], route /api/customer

##### Angular App
This is part where end user interacts with. The dependencies are listed in introduction of this document. It has three angular components 
- **Home:** It is greeting page for end users which contains brief information about application. 
- **Customer:** The customers are listed in table format. Edit or delete existing customers is possible. 
- **Customer form:** Allows editing or inserting new customers. In the component Angular ReactiveForms is used. 
Beside that followingcomponents used
- **CustomerService:** Service module for making http calls to the asp.net core web api. 
- **CanDeactivateCustomer:** canDeactive guard for warning user before leaving form with unsaved changes. 
-- An existing customer data is displayed if first and last name is in querystring provided. 

-- In first name and lastname fields typehead search suggestion(from PrimeNg) list is displayed. For the exising first and last name customer information is retrieved from database. 
-- The primary keys first and last name are case sensitive which means same name with different letter case can be saved. 
-- Form has validation controls for required fields and formatting of phone number and email. 
-- Additionally a dirty  check with canDeactive feature is made to warn user if unsaved data exists before leaving form.

### Docker support
To dockerize backend and frontend service Docker files is placed inside projects. The generated images pushed to the dockerhub with tag haltunbay/yacdbackend and haltunbay/yacdfrontend. They can be run with docker-compose.yml which placed in root folder. 
