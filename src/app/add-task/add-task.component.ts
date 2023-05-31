import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { status } from '../status';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
addTaskform!:FormGroup;
  constructor(private service: ServiceService, private formBuilder:FormBuilder){
    this.addTaskform = formBuilder.group({
      title:(["",Validators.required]),
    })
  }
  addTask(){
    let data={
      title:this.addTaskform.value.title,
      status:status.Todo
    }
    if(this.addTaskform.invalid){
      alert("Enter valid details");
    }
    else{
      this.service.eventEmit(data);
      alert("Task Added Successfully");
  }
  }
}
