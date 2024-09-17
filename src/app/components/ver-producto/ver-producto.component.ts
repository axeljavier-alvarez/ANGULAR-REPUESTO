import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.scss'],
  providers: [ProductosService]
})
export class VerProductoComponent implements OnInit {

  constructor(
    public _activatedRoute: ActivatedRoute,
    public _productosService: ProductosService

  ) { }

  ngOnInit(): void {
    /* parte del activaded route */
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      console.log(dataRuta.get('idProducto'));
      this.getProductoId(dataRuta.get('idProducto'));
    })
  }

  getProductoId(idProducto) {
    this._productosService.obtenerProductoId(idProducto).subscribe(
      (response) => {

        console.log(response);
      },
      (error) => {

      }
    )
  }

}
