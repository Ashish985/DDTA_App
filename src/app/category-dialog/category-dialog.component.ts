import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validator, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {

  categoryForm!: FormGroup;
  actionBtn : string="Save";

  constructor(private FormBuilder:FormBuilder, private api:ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef:MatDialogRef<CategoryDialogComponent>
    ) { }

  ngOnInit(): void {

    this.categoryForm=this.FormBuilder.group(
      {
        category : ['',Validators.required],
        date : ['',Validators.required]
      });

    if(this.editData){

      this.actionBtn="Update";
      this.categoryForm.controls['category'].setValue(this.editData.category);
      this.categoryForm.controls['date'].setValue(this.editData.date);

    }
    console.log(this.editData);
  }
  
  addCategory(){
    if(!this.editData){
       if(this.categoryForm.valid){
      this.api.postCategory(this.categoryForm.value)
      .subscribe({
        next:(res)=>{
          // alert("category added successfuly");
          this.categoryForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("error while adding the category");

        }
      })

    } 
    }else{
      this.updateCategory();
    }
   
  }
  updateCategory() {
     this.api.putCategory(this.categoryForm.value,this.editData.id)
     .subscribe({
          next:(res)=>{
            // alert("Category Update successfuly");
            this.categoryForm.reset();
            this.dialogRef.close('update');
          },
          error:()=>{
            alert("error while updating the Category !");
  
          } 
  })

}
}

