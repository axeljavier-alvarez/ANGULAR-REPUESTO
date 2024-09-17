import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Producto } from '../models/productos.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(public _http: HttpClient) { }

  obtenerProductos(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)

    return this._http.get(this.url + '/productos', { headers: headersToken })
  }

  obtenerProductoId(id: String): Observable<any> {
    return this._http.get(this.url + '/productos/' + id, { headers: this.headersVariable })
  }

  agregarProducto(modeloProducto: Producto, token): Observable<any> {
    // convertir el modelo producto a string que sea entendido
    let parametros = JSON.stringify(modeloProducto);
    // enviar las cabeceras
    return this._http.post(this.url + '/agregarProductos', parametros, { headers: this.headersVariable});

  }

  eliminarProducto( idProducto, token ): Observable<any> {

    let headersToken = this.headersVariable.set('Authorization', token );

    return this._http.delete(this.url + '/eliminarProducto/' +  idProducto, { headers: headersToken});

  }

  /* ruta activated */



  editarProducto(modeloProducto: Producto): Observable<any>{
    let parametros = JSON.stringify(modeloProducto);
    return this._http.put(this.url + '/editarProductos/' + modeloProducto._id, parametros, { headers: this.headersVariable});

  }
}
