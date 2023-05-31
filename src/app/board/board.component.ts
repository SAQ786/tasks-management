import { Component, Input } from '@angular/core';
import { ServiceService } from '../service.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  tasks:any = []
  taskSearch: string= ""
  filteredItems: any;
  constructor(public dialog: MatDialog, private service: ServiceService) { }

  ngOnInit() {
    this.filteredItems = this.tasks;
    //get new task value from dialog
    this.service.event.subscribe((res) => {
      if(res)
      this.addTask(res)
    });
  }

  openDialog() {
    this.dialog.open(AddTaskComponent, {
      height: "300px",
      width: "410px"
    });
  }

//method to add task
  addTask(data:any){
    data.id =  this.tasks.length ? (this.tasks[this.tasks.length - 1].id + 1) : 1;
    this.tasks.push(data)
  }

  getTaskList() {
    this.service.getTask().subscribe((res) => {
      this.tasks = res;
      this.filteredItems = res;
    })
  }

  //method to delete task from list
  deleteTask(index : number) {
    this.tasks.splice(index,1);
  }

  //method to update task status
  updateTask(task: any, action: string) {
    if (action === "arrow_forward") {
      task.status += 1;
    } else {
      task.status -= 1;
    }
    this.tasks.forEach((item: any) => {
      if(item.id === task.id){
        item.status = task.status;
      }
    });
  }


 //method to search task status
  searchTask(){
    this.tasks = this.filteredItems.filter((item:any) =>
      item.title.toLowerCase().includes(this.taskSearch.toLowerCase())
    );
  }
}
