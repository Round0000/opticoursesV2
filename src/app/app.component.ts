import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

interface Product {
  product: string,
  brand: string,
  detail: string,
  shop: string,
  volume: string,
  price: number,
  kgPrice: number,
  picture: string,
  id: string
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  private productsCollection: AngularFirestoreCollection<Product>;
  data$: Observable<Product[]>;
  products: any;
  constructor(public afs: AngularFirestore) {
    this.productsCollection = afs.collection<Product>('products');
    console.log(this.productsCollection)
    this.data$ = this.productsCollection.valueChanges({ idField: 'id', created_at: 'created_at' });
    this.data$.subscribe(res => {
      console.log('DATA', res);
      this.products = res;
    })
  }

  addItem(item: any) {
    this.productsCollection.add(item);
  }

  removeItem(id: string) {
    this.productsCollection.doc(id).delete()
  }

  editProduct(id: string) {
    console.log(id)
  }

  form = new FormGroup({
    product: new FormControl(null),
    brand: new FormControl(null),
    detail: new FormControl(null),
    shop: new FormControl(null),
    volume: new FormControl(null),
    price: new FormControl(null),
    kgPrice: new FormControl(null),
    picture: new FormControl(null),
  })




  onProductCreation(e: any) {
    e.preventDefault();
    console.log(this.form.value);
    this.addItem(this.form.value);
    this.form.reset();
  }



  ngOnInit() {
    // this.item$.subscribe(res => {
    //   console.log(res);
    //   this.products = res;
    // })
    this.form.controls["product"].addValidators([Validators.required, Validators.minLength(2), Validators.maxLength(30)]);
    this.form.controls["brand"].addValidators([Validators.required, Validators.minLength(2), Validators.maxLength(20)]);
    this.form.controls["detail"].addValidators([Validators.required, Validators.minLength(2), Validators.maxLength(30)]);
    this.form.controls["shop"].addValidators([Validators.required, Validators.minLength(2), Validators.maxLength(20)]);
    this.form.controls["volume"].addValidators([Validators.required, Validators.minLength(2), Validators.maxLength(5)]);
    this.form.controls["price"].addValidators([Validators.required, Validators.minLength(1), Validators.maxLength(5)]);
    this.form.controls["kgPrice"].addValidators([Validators.required, Validators.minLength(1), Validators.maxLength(5)]);

  }
}
