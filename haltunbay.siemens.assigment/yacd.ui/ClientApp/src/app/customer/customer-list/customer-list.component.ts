import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers: customer[] = [];
  constructor(private apiService: CustomerService) { }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
    this.apiService.getCustomers().subscribe(
      data => { this.customers = data },
      err => console.error(err),
      () => console.log(`done loading customers ${this.customers.length}`)
    );
  }

  deleteCustomer(firstName: string, lastName: string) {
    if (confirm("Are you sure to delete " + name)) {
      this.apiService.deleteCustomer(firstName, lastName).subscribe(
        err => console.error(err),
        () => console.log(`deleted customer ${firstName} ${lastName}`)
      );
    }
  }

}
