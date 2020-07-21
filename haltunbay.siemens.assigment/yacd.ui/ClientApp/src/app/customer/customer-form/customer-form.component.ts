import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
  providers: [ConfirmationService]
})
export class CustomerFormComponent implements OnInit {
  country: any;
  countries: any[];
  filteredFirstNames: any[];
  filteredLastNames: any[];
  customers: customer[] = [];
  firstNames: string[] = [];
  lastNames: string[] = [];
  customerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    eMail: ['', Validators.email],
    city: ['', Validators.required],
    address: ['', Validators.required],
    phoneNumber: ['']
  });

  constructor(private fb: FormBuilder, private apiService: CustomerService,
    private router: Router, private route: ActivatedRoute, private location: Location, private confirmationService: ConfirmationService) { }


  ngOnInit() {
    firstName: String;
    lastName: String;
    const _this = this;
    this.buildSuggestionLists();
    this.route.queryParams.subscribe(params => {
      if (params['firstName'] && params['lastName']) {
        this.apiService.getCustomer(params['firstName'], params['lastName']).subscribe(data => {
          this.customerForm.setValue(data);
        });
      }
    });
  }

  onSubmit() {
    if (!this.customerForm.valid) {
      console.log('form invalid cannot submit!!');
      return;
    }
    console.warn(this.customerForm.value);
    this.apiService.upsertCustomer(this.customerForm.value)
      .subscribe(() => this.goToListView());
  }

  goToListView() {
    this.router.navigateByUrl('/customer');
  }

  onCancel() {
    this.router.navigateByUrl('/customer');
  }

  filterFirstNames(event) {
    this.filteredFirstNames = [];
    for (let i = 0; i < this.firstNames.length; i++) {
      let x = this.firstNames[i];
      if (x.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredFirstNames.push(x);
      }
    }
  }

  filterLastNames(event) {
    this.filteredLastNames = [];
    for (let i = 0; i < this.lastNames.length; i++) {
      let x = this.lastNames[i];
      if (x.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredLastNames.push(x);
      }
    }
  }

  buildSuggestionLists() {
    this.apiService.getCustomers().subscribe(
      data => {
        this.firstNames = [...new Set(data.map(c => c.firstName))];
        this.lastNames = [...new Set(data.map(c => c.lastName))];
      },
      err => console.error(err),
      () => console.log(`done loading customers ${this.customers.length}`)
    );
  }

  onSelectNameSuggestion(event) {
    this.apiService.getCustomer(this.customerForm.get('firstName').value, this.customerForm.get('lastName').value)
      .subscribe(data => {
        if (data) {
          this.customerForm.setValue(data);
        }
      });
  }

  isFieldValid(fieldName: string) {
    var field = this.customerForm.get(fieldName);
    return (field.invalid && (field.dirty || field.touched));
  }

  canDeactivate() {
    return this.customerForm.dirty;
  }
}


