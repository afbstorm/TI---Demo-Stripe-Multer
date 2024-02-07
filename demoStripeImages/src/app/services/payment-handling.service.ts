import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from "../components/list/list.component";
import {StripeCardComponent, StripeService} from 'ngx-stripe';
import {of, switchMap} from "rxjs";
import {StripeCardElementOptions, StripeElement, StripeElementsOptions} from "@stripe/stripe-js";

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class PaymentHandlingService {
  private API_URL = 'http://localhost:8001/api/payment';
  card: any;
  selectedProduct!: Product;
  elementsOptions: StripeElementsOptions = {
    locale: 'fr'
  };
  cardOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  selectProduct(product: Product) {
    this.selectedProduct = product;
  }

  getSelectedProduct(): Product {
    return this.selectedProduct;
  }
  constructor(
    private http: HttpClient,
    private stripeService: StripeService
  ) { }


  processPayment(product: Product, customerInfos: any, card: StripeCardComponent) {
    // check if this.card is correctly initialized at this point
    return this.stripeService.createToken(card.element).pipe(
      switchMap(result => {
        console.log(result)
        if (result.token) {
          return this.http.post(this.API_URL, {
            description: `${product.name} ${product.category}`,
            amount: product.price * 100,
            currency: product.currency,
            stripeToken: result.token.id,

          })
        } else {
          if (result.error) {
            console.log(result.error.message);
          }
          return of(null);
        }
      })
    );
  }
}
