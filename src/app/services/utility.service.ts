import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  redirectUrl: string;
  loginStatus: EventEmitter<boolean> = new EventEmitter<boolean>();
  roles :any;

  constructor(private router: Router) { 
    this.redirectUrl="";
    this.roles="";
  }

  public getToken() {
    return sessionStorage.getItem('acess_token');
  }

  public getadminDetail() {
    let admin_details=sessionStorage.getItem('admin_details');
    if (admin_details) {
      return JSON.parse(admin_details);
    } else {
      return null;
    }
  }

  public setToken(data: any) {
    console.log(data.acessToken)
    sessionStorage.setItem('acess_token', data.accessToken);
    sessionStorage.setItem('admin_details', JSON.stringify(data));
    this.updateRoles();
  }

  checkIfTokenExist():boolean{
      return !!sessionStorage.getItem('acess_token');
  }

  public logout(): void {
    this.redirectUrl = document.location.pathname;
    sessionStorage.removeItem('acess_token');
    sessionStorage.removeItem('user_details');
    this.router.navigate(['/admin']);
    this.loginStatus.emit(false);
    this.updateRoles();
  }

  public updateRoles(){
    let v = sessionStorage.getItem('admin_details');
    let a = null;
    if (v && v!== null) {
      a = JSON.parse(v);
    } else {
      a = null;
      this.roles=[]; return;
    }
    if(a.roles){
      this.roles=a.roles;
    }
  }
}
