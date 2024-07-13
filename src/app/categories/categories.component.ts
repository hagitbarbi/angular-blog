import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';
// import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categoryArray:any;
  formCategory:string;
  formStatus:string='Add';
  categoryId:string;

  constructor(private categoryService:CategoriesService) { }

  ngOnInit(): void {
  

    this.categoryService.loadData().subscribe(val => {
      console.log(val);
      this.categoryArray=val;
      
    })
  }
  onEdit(category, id){
    console.log(category);
    this.formCategory=category;
    this.formStatus='Edit';
    this.categoryId=id;
    
  }
  onDelete(id){
    this.categoryService.deleteData(id);


  }
  onSubmit(formData){
   //console.log(formData.value);
    let categoryData :Category={
       category:formData.value.category,

      // status:'active'
    }
    if (this.formStatus == 'Add'){
      this.categoryService.saveData(categoryData);
      formData.reset();

    }
    else if(this.formStatus == 'Edit'){
      this.categoryService.updateData(this.categoryId,categoryData);
      formData.reset();
      this.formStatus='Add';

    }

   
    // //console.log(categoryData);
    // let subCategoryData={
    //   subCategory:'subCategory1'
    
    // }
    

  }

}
