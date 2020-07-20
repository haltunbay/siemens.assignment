import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  customerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    eMail: ['', Validators.email],
    city: ['', Validators.required],
    address: ['', Validators.required],
    phoneNumber: ['', Validators.pattern("[0-9 ]{12}")]
  });

  constructor(private fb: FormBuilder, private apiService: CustomerService,
    private router: Router, private route: ActivatedRoute, private location: Location) { }


  ngOnInit() {
    firstName: String;
    lastName: String;
    const _this = this;
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
    this.location.back();
  }

}
