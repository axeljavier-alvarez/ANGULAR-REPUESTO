import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Producto } from 'src/app/models/productos.model';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.scss'],
  providers: [ProductosService, UsuarioService]
})
export class GraficasComponent implements OnInit {

  public token;
  public productoModelGet: any = [];

  /*https://stackblitz.com/edit/ng-charts-pie?file=src%2Fapp%2Fapp.component.ts */
  chartOptions = {
    responsive: true,
  };
  chartLabels : any = [];
  chartData:any = [];
  chartColors = [{
    backgroundColor: []

  }];
  chartLegend = true;
  chartPlugins = [];


  constructor(
    private _productoService: ProductosService,
    private _usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(){
    // AA mandar a llamar al token
    // BB cada vez que ingrese al controlador refrescara el token
    // 2:03:14
    this._productoService.obtenerProductos(this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        this.productoModelGet = response.productos;
        this.productoModelGet.forEach(dato => {

          console.log(dato.nombre);
          this.chartLabels.push(dato.nombre);
          this.chartData.push(dato.cantidad);
          // comando para que me aparezca cualquier color que quiera
          this.chartColors[0].backgroundColor.push(`#${ Math.floor(Math.random()*16777215).toString(16)}`)
        });
      },
      (error)=>{
        console.log(<any>error);
      }
    )
  }

}
