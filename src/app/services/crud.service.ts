import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Inscricao } from '../model/inscricao';
import { campos } from '../model/campos';
var httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};
@Injectable({
  providedIn: 'root'
})
export class CrudService {
  
  url = 'http://localhost:8080';

  constructor(private http: HttpClient) { }
  inscricao:Inscricao[];
  campo:campos[];

  public getInscricoes(): Observable<Inscricao>{
    return this.http.get<Inscricao>(this.url)
  }

  public postInscricoes(campo:any){
    return this.http.post<any>(this.url,campo,httpOptions)
   

  }
}
