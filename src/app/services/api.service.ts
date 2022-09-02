import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl; 

  constructor(private _http: HttpClient, private http:HttpClient) {}

  getTypeRequest(url: string) {
    return this._http.get(`${this.baseUrl}${url}`).pipe(
      map((res) => {
        return res;
      })
    );
  }
  postTypeRequest(url: string, payload: any) {
    return this._http.post(`${this.baseUrl}${url}`, payload).pipe(
      map((res) => {
        return res;
      })
    );
  }
  putTypeRequest(url: string, payload: any) {
    return this._http.put(`${this.baseUrl}${url}`, payload).pipe(
      map((res) => {
        return res;
      })
    );
  }

  postWorker(data:any){
    return this.http.post<any>("http://localhost:5000/worker/create/",data);
  }

  getWorker(){

    return this.http.get<any>("http://localhost:5000/worker/");
  }
  putWorker(data:any,id:number){
    return this.http.put<any>("http://localhost:5000/worker/update/"+id,data);

  }
  deleteWorker(id:number){
    return this.http.delete<any>("http://localhost:5000/worker/delete/"+id);

  }

  postCategory(data:any){
    return this.http.post<any>("http://localhost:5000/category/create/",data);
  }

  getCategory(){

    return this.http.get<any>("http://localhost:5000/category/");
  }
  putCategory(data:any,id:number){
    return this.http.put<any>("http://localhost:5000/category/update/"+id,data);

  }
  deleteCategory(id:number){
    return this.http.delete<any>("http://localhost:5000/category/delete/"+id);

  }

  workerCategory(category: string){
    console.log(`http://localhost:5000/worker/category/${category}`)
    console.log(category)
    return this.http.get<any>(`http://localhost:5000/worker/category/${category}`);

  }

}
