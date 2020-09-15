import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  redCheck: any;
  products: any;
  filter: any = {
    category: [],
    color: [],
    priceRange: {
      minimum: '',
      maximum: ''
    }
  };
  name: any;
  constructor(public productService: ProductsService) { }

  ngOnInit(): void {
    this.fetchProducts({category:["1"]});
  }

  async fetchProducts(body) {
    console.log('body', body);
    let url = 'http://localhost:8000/fetchProducts';
    let data = await this.productService.getProducts(url, body).toPromise();
    data.data.forEach((elem) => {
      elem.quantity = 0;
    })
    this.products = data.data;
  }

  category(event){
    this.fetchProducts({category:[(event.index + 1).toString()]})
  }
  applyFilter() {
    this.fetchProducts(this.filter);
  }
  captureValues(event) {
    console.log(event.target.name)
    console.log(event.target.checked);
    if(event.target.checked) {
      this.filter[event.target.name].push(event.target.value);
    } else if(!event.target.checked) {
      let index = this.filter[event.target.name].indexOf(event.target.value)
      if(index != -1) {
        this.filter[event.target.name].splice(index, 1);
      }
    }
  }
  search() {
    this.fetchProducts({name: this.name});
  }
}
