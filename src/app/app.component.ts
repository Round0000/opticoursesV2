import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

interface Product {
  product: string,
  brand: string,
  detail: string,
  shop: string,
  volume: string,
  price: number,
  kgPrice: number
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  private itemsCollection: AngularFirestoreCollection<Product>;
  products$: Observable<Product[]>;
  items: any;
  constructor(public afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Product>('products');
    this.products$ = this.itemsCollection.valueChanges();
    this.products$.subscribe(res => this.items = res)
  }

  addItem(item: any) {
    this.itemsCollection.add(item);
  }

  form = new FormGroup({
    product: new FormControl(''),
    brand: new FormControl(''),
    detail: new FormControl(''),
    shop: new FormControl(''),
    volume: new FormControl(''),
    price: new FormControl(''),
    kgPrice: new FormControl(''),
  })

  onProductCreation(e: any) {
    e.preventDefault();
    console.log(this.form.value);
    this.addItem(this.form.value)
  }

  ngOnInit() {
    // this.item$.subscribe(res => {
    //   console.log(res);
    //   this.products = res;
    // })

  }
}
