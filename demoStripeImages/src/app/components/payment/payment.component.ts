import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {EMPTY, Observable} from 'rxjs';
import { StripeCardComponent, StripeService } from "ngx-stripe";
import { Product } from "../list/list.component";
import { PaymentHandlingService } from "../../services/payment-handling.service";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    StripeCardComponent,
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatLabel
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent | undefined;
  checkoutForm: FormGroup;
  paymentMessageShown: boolean = false;
  paymentMessageSuccess: boolean = false;
  paymentMessageText: string = '';

  product: Product | undefined;
  paymentResponse$: Observable<any> = EMPTY;

  constructor(public paymentService: PaymentHandlingService, private fb: FormBuilder) {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      zipcode: [''],
      city: ['']
    });
  }

  ngOnInit() {
    this.product = this.paymentService.getSelectedProduct();

  }

  processPayment() {
    if (!this.card || !this.product) return;
    this.paymentResponse$ = this.paymentService.processPayment(this.product, this.checkoutForm, this.card);
    this.paymentResponse$.subscribe({
      next: () => this.updatePaymentMessage("Payment successful", true),
      error: (error: Error) => this.updatePaymentMessage(error.message || "Payment failed", false)
    });
  }

  private updatePaymentMessage(message: string, isSuccess: boolean) {
    this.paymentMessageShown = true;
    this.paymentMessageSuccess = isSuccess;
    this.paymentMessageText = message;

    setTimeout(() => {
      this.paymentMessageShown = false;
    }, 4000);
  }
}
