import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public flightUrl: any
  constructor(private route: Router) { }

  ngOnInit(): void {
    this.flightUrl = this.route.url
    console.log(this.flightUrl)
    let navbar = document.querySelector('.navbar') as HTMLElement;
    if(this.flightUrl === '/flight-search'){
      navbar.classList.add('navbar-inner');
    }
  }

  Login(){
    if(sessionStorage.getItem("login") === "yes"){
      return true
    }
    else{
      return false
    }
  }

}
