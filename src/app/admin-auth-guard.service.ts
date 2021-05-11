import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { ConfirmDialogService } from './confirm-dialog/confirm-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService {

  constructor(private router: Router, private confirmDialogService: ConfirmDialogService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLogin(state.url);
  }

  checkLogin(url: string): boolean {
    if (sessionStorage.getItem("access-admin-token")) {
      return true;
    }
    this.confirmDialogService.confirmThis("Please Login to check Admin Detailss", () =>{
      this.router.navigate(['/admin'])
    }, () =>{

    })
    return false;
  }
}
