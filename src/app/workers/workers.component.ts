import { Component, OnInit ,ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
 
@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss']
})
export class WorkersComponent implements OnInit {
  title = 'WorkerList';
  displayedColumns: string[] = ['sn','name', 'phone', 'location', 'category','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
 constructor(private dialog: MatDialog, private api:ApiService){

 }
 ngOnInit(): void {
  this.getAllWorker();
 }

  openDialog() {
    this.dialog.open(DialogComponent, {
  
     
}).afterClosed().subscribe(val=>{
  if(val === 'save'){
    this.getAllWorker();
  }
})

}

getAllWorker(){
 
  this.api.getWorker()
    .subscribe({
      next:(res)=>{
        this.dataSource= new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort
      },
      error:(_err)=>{
        alert("error while fatching the record")

      }
    })
   
}

editWorker(row : any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getAllWorker();
      }
    })
}
 
deleteWorker(id:number){
  this.api.deleteWorker(id)
  .subscribe({ 
    next:(_res)=>{
      // alert("Worker deleted successfully");
      this.getAllWorker();
    },
    error:(_err)=>{
      alert("error while deleting the record");

    }
  })

}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

}
