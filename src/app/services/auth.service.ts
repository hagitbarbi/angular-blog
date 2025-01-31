import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInGuard:boolean = false;

  constructor(private afAuth:AngularFireAuth, private toastr:ToastrService,private router:Router) { }



  login(email, password){
    this.afAuth.signInWithEmailAndPassword(email,password).then(logReef =>{
     this.toastr.success('logged in successfully');
     this.router.navigate(['/']);
     this.loadUser();
     this.loggedIn.next(true);
this.isLoggedInGuard=true;

    }).catch(e=>{
      this.toastr.warning(e);
    })
  }

  loadUser(){
    this.afAuth.authState.subscribe(user =>{
    localStorage.setItem('user',JSON.stringify(user));
});
}

logOut(){
  this.afAuth.signOut().then(()=>{
    this.toastr.success('user loggedout succesfully');
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.isLoggedInGuard=false;


    this.router.navigate(['/login']);
  }
  )
}
isLoggedIn(){
  return this.loggedIn.asObservable();
}

}
