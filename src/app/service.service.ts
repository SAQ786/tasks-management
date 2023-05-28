import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  event = new EventEmitter<boolean>();
  constructor(private http :HttpClient) { }
  url:string =  "https://tasks-7oqq.onrender.com";
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
  eventEmit(event:boolean){
    this.event.emit(event);
  }
}
