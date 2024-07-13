import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs:AngularFirestore ,private toastr:ToastrService) { }

  saveData(data){
    this.afs.collection('categories').add(data).then(docRef=>{
      console.log(docRef);
      this.toastr.success('Data Insert Successfully ..!');

      //this.afs.doc(`categories/${docRef.id}`).collection('subcategories').add(subCategoryData)

      // this.afs.collection('categories').doc(docRef.id).collection('subcategories').add(subCategoryData).then(docRef1=>{
      //   console.log(docRef1);

        //this.afs.doc(`categories/${docRef.id}/subcategories/${docRef1.id}`).collection('subsubcategories').add(subCategoryData)
       // this.afs.doc(`categories/${docRef.id}/subcategories/${docRef1.id}/subsubcategories`).add(subCategoryData)//לא תקין


        // this.afs.collection('categories').doc(docRef.id).collection('subcategories').doc(docRef1.id).collection('subsubcategories').add(subCategoryData).then(docRef2=>{
        //   console.log('second level subcategory saved successfully');
          
      //   })
      // }
        
      // )
      
    })
    .catch(err=>{console.log(err);})

  }
  loadData():Observable<Object>{
    return this.afs.collection('categories').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a=> {
          const data=a.payload.doc.data();
          const id=a.payload.doc.id;
          return { id, data }
        })
      })
    )
  }

  updateData(id ,EditData){
    this.afs.doc(`categories/${id}`).update(EditData).then(docREf =>{
      this.toastr.success('Data Update Successfully ..!')
    })

  }
  deleteData(id){ 
    this.afs.doc(`categories/${id}`).delete().then(docRef =>{
      this.toastr.success('Data Deleted ..!');
    })
  }

}
