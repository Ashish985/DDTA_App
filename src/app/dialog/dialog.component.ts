import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validator, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Options } from 'selenium-webdriver';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  location = ['Internal', 'External'];
  workerForm!: FormGroup;
  actionBtn : string="Save";
  testModel: Options[];
  isLoaded = false;
 
  constructor(private FormBuilder:FormBuilder, private api:ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef:MatDialogRef<DialogComponent>
    ) { }

  ngOnInit(): void {
 
    this.getallCategory();

    this.workerForm=this.FormBuilder.group(
      {
        name : ['',Validators.required],
        phone : ['',Validators.required],
        category : ['',Validators.required],
        location : ['',Validators.required],
        date : ['',Validators.required]
      });

    if(this.editData){  

      this.actionBtn="Update";
      this.workerForm.controls['name'].setValue(this.editData.name);
      this.workerForm.controls['phone'].setValue(this.editData.phone);
      this.workerForm.controls['category'].setValue(this.editData.category);
      this.workerForm.controls['location'].setValue(this.editData.location);
      this.workerForm.controls['date'].setValue(this.editData.date);

    }
    
  }
   
  addWorker(){
    if(!this.editData){
       if(this.workerForm.valid){
      this.api.postWorker(this.workerForm.value)
      .subscribe({
        next:(res)=>{
          // alert("Worker added successfuly");
          this.workerForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("error while adding the worker");

        }
      })

    } 
    }else{
      this.updateWorker();
    }
   
  }
  updateWorker() {
     this.api.putWorker(this.workerForm.value,this.editData.id)
     .subscribe({
          next:(res)=>{
            // alert("worker Update successfuly");
            this.workerForm.reset();
            this.dialogRef.close('update');
          },
          error:()=>{
            alert("error while updating the worker !");
  
          } 
  })

}

getallCategory(){
  this.api.getCategory()
    .subscribe({
      next:(res)=>{
        if(res) {
          this.testModel = res;
          this.isLoaded = true;
          console.log(this.testModel);
        }
      },
      error:(_err)=>{
        alert("error while fatching the record")

      }
    })
  
}
}
