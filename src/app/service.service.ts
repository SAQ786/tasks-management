import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http :HttpClient) { }
  url:string =  "http://localhost:3000";
  getTask(){
    return this.http.get(this.url+"/task")
  }

  addTask(data:any){
    return this.http.post(this.url+"/task/",data);
  }
  deleteTask(id:number){
    return this.http.delete(this.url+"/task/"+id);  
  }
  changeStatus(id:number,data:any){
    return this.http.put(this.url+"/task/"+id,data);
  }
}
