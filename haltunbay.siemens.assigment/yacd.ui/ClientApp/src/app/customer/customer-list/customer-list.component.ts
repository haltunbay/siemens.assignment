import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { ConfirmationService, Message } from 'primeng/api';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  providers: [ConfirmationService]
})
export class CustomerListComponent implements OnInit {

  msgs: Message[] = [];
  customers: customer[] = [];
  constructor(private apiService: CustomerService, private confirmationService: ConfirmationService) { }

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
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {

        this.apiService.deleteCustomer(firstName, lastName).subscribe(
          err => console.error(err),
          () => console.log(`deleted customer ${firstName} ${lastName}`),
          () => this.getCustomers()
        );
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' }];
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

}
