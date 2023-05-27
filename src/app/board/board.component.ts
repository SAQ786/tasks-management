import { Component, Input } from '@angular/core';
import { ServiceService } from '../service.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  tasks: any
  taskSearch:string= ""
  filteredItems: any;
  constructor(public dialog: MatDialog, private service: ServiceService) { }

  ngOnInit() {
    this.getTaskList()
  }

  openDialog() {
    this.dialog.open(AddTaskComponent, {
      height: "300px",
      width: "410px"
    });
  }

  getTaskList() {
    this.service.getTask().subscribe((res) => {
      this.tasks = res;
      this.filteredItems = res;
      console.log(this.tasks)
    })
  }

  deleteTask(id: number) {
    this.service.deleteTask(id).subscribe(() => {
      alert("Deleted sucessfully")
      this.getTaskList()
    })
  }

  updateTask(task: any, action: string) {
    if (action === "arrow_forward") {
      task.status += 1;
    } else {
      task.status -= 1;
    }
    this.service.changeStatus(task.id, task).subscribe(() => {
      this.getTaskList();
    })
  }
  searchTask(){
    this.tasks = this.filteredItems.filter((item:any) =>
      item.title.toLowerCase().includes(this.taskSearch.toLowerCase())
    );
    
  }
}
