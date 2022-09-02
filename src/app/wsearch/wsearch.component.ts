import { Component, OnInit, ViewChild } from '@angular/core';
import { Options } from 'selenium-webdriver';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
 
const d: any = [
  {
    "id": 18,
    "name": "Prakash",
    "phone": "9977890452",
    "category": "Electrician",
    "subcategory": null,
    "location": "Internal",
    "date": ""
  }]
@Component({
  selector: 'app-wsearch',
  templateUrl: './wsearch.component.html',
  styleUrls: ['./wsearch.component.scss']
})
export class WsearchComponent implements OnInit {
  

  title = 'Worker Search List';
  selectedValue : string = '';
  displayedColumns: string[] = ['sn','name','location','phone'];
  dataSource: any = [];
 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  testModel: Options[];
  isLoaded = false;
 
  
 constructor(private api:ApiService){

 }
 ngOnInit(): void {
  this.getallCategory();
  
 
 }
 getallCategory(){
  this.api.getCategory()
    .subscribe({
      next:(res)=>{
        if(res) {
          this.testModel = res;
          this.isLoaded = true;
          // console.log(this.testModel);
        }
      },
      error:(_err)=>{
        alert("error while fatching the record")

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


categoryChange(){
  let result = this.api.workerCategory(this.selectedValue);
  result.subscribe({
    next:(res)=>{
      if(res) {
        // this.testModel = res;
        // this.isLoaded = true;
        console.log(res.response);
        this.dataSource = res.response;
      }
    },
    error:(_err)=>{
      alert("error while fatching the record")

    }
  });
}
 

}
