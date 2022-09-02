import { Component, OnInit ,ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  title = 'CategoryList';
  displayedColumns: string[] = ['sn','category', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
 constructor(private dialog: MatDialog, private api:ApiService){

 }
 ngOnInit(): void {
  this.getAllCategory();
 }

  openDialog() {
    this.dialog.open(CategoryDialogComponent, {
  
     
}).afterClosed().subscribe(val=>{
  if(val === 'save'){
    this.getAllCategory();
  }
})

}

getAllCategory(){
 
  this.api.getCategory()
    .subscribe({
      next:(res)=>{
        this.dataSource= new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort
      },
      error:(_err)=>{
        alert("error while fatching the Category")

      }
    })
  
}

editCategory(row : any){
    this.dialog.open(CategoryDialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getAllCategory();
      }
    })
}
 
deleteCategory(id:number){
  this.api.deleteCategory(id)
  .subscribe({
    next:(_res)=>{
      // alert("Category deleted successfully");
      this.getAllCategory();
    },
    error:(_err)=>{
      alert("error while deleting Category");

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
