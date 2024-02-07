import { Component } from '@angular/core';
import { nanoid } from "nanoid";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {PaymentHandlingService} from "../../services/payment-handling.service";
import {Router} from "@angular/router";
import {MatButton} from "@angular/material/button";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  currency: string;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    MatButton
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  products: Product[] = [
    {id: nanoid(), currency: 'EUR', name: 'Château', price: 3456999, category: 'Housing', image: 'https://nypost.com/wp-content/uploads/sites/2/2017/04/don1019-1.jpg?quality=75&strip=all'},
    {id: nanoid(), currency: 'EUR', name: 'Gaming computer', price: 2899, category: 'Computer', image: 'https://i.ebayimg.com/images/g/wO4AAOSwaJ1kgN2S/s-l1200.webp'},
    {id: nanoid(), currency: 'EUR', name: 'Luxury Yacht', price: 24568000, category: 'Vehicles', image: 'https://media.fraseryachts.com/Yachts/Y459_KrB_MC/images/website/14-DpMhMibA.jpg?vh=c6387f'},
    {id: nanoid(), currency: 'EUR', name: 'Coffee Machine', price: 599, category: 'Kitchen appliances', image: 'https://breville.scene7.com/is/image/brevilleprod/Sage_ReactCarousel6_1136x639?fmt=webp'},
    {id: nanoid(), currency: 'EUR', name: 'Apple iPhone 13', price: 1299, category: 'Electronics', image: 'https://assets.swappie.com/cdn-cgi/image/width=600,height=600,fit=contain,format=auto/swappie-iphone-13-pro-max-alpine-green.png?v=42'},
    {id: nanoid(), currency: 'EUR', name: 'Adidas Running Shoes', price: 79, category: 'Sportswear', image: 'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enGB/Images/CAM_Onsite_RunningIWP_FW22_Desktop_400x248_836213_tcm143-915629.jpg'},
    {id: nanoid(), currency: 'EUR', name: 'Macbook Pro', price: 2399, category: 'Computer', image: 'https://images.frandroid.com/wp-content/uploads/2023/11/macbook-pro-m3-frandroid-img-1413.jpeg'},
    {id: nanoid(), currency: 'EUR', name: 'Leather Sofa', price: 1799, category: 'Furniture', image: 'https://img.etimg.com/thumb/width-640,height-480,imgsize-97090,resizemode-75,msid-99474776/top-trending-products/furniture/sofas/find-your-perfect-leather-sofa-set-our-top-7-picks-for-home-decor-and-comfort/cs-1.jpg'},
    {id: nanoid(), currency: 'EUR', name: 'Samsung Smart TV', price: 899, category: 'Electronics', image: 'https://images.samsung.com/is/image/samsung/assets/be_fr/tvs/smart-tv/smart-hub-and-apps/2023-smart-tv-smart-hub-and-apps-f01-kv-mo.jpg?$720_N_JPG$'}
  ];

  constructor(private paymentService: PaymentHandlingService, private router: Router) {}

  buyProduct(product: Product) {
    // Saving the selected product, we'll use it later
    this.paymentService.selectProduct(product);
    // Redirect the user to the payment component
    this.router.navigate(['/payment']);
  }
}
