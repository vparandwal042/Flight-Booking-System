import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightDataService } from '../flight-data.service';
import { FlightService } from '../flight.service';

declare const nav: any

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public signUpForm: any
  public submittedSignUp: any
  public LoginForm: any
  public submittedLogin: any
  public allFlights: any
  public navItem: any
  public loginDetails: any
  public returnField: boolean = true
  public flightSearch: any;
  public submitted = false;
  public flights: any
  public from: any = []
  public destination: any = []
  isLogin: any
  constructor(
    private flightService: FlightService, 
    private fb: FormBuilder, 
    private route: Router
    ) {  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      mobile: ['', Validators.required]
    })

    this.LoginForm = this.fb.group({
      id: [0],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.flightSearch = this.fb.group({
      id: [0],
      from: ['', Validators.required],
      destination: ['', Validators.required],
      departure: [new Date(), Validators.required]
    })

    this.flightService.getAllFlights("flights").subscribe(flightData =>{
      this.allFlights = flightData 
      let tmpF = [], tmpD = [] 
      for(let a of this.allFlights){
        tmpF.push(a["from"])
        tmpD.push(a["destination"])
      }
      this.from = Array.from(new Set(tmpF))
      this.destination = Array.from(new Set(tmpD))
    })

  }
  enableReturn(){
    this.returnField = false
  }
  disableReturn(){
    this.returnField = true
  }

  @HostListener('window:scroll', ['$event'])

  onWindowScroll() {
    let element = document.querySelector('.navbar') as HTMLElement;
    let navBrandElement = document.querySelector('.navbar-brand') as HTMLElement;
    let navLinkElement = document.querySelectorAll('.nav-link');
    if (window.pageYOffset > 495) {
      element.classList.add('navbar-inner');
      navBrandElement.classList.add('navbar-inverse')
      navLinkElement.forEach(ele =>{
        ele.classList.add('navbar-inverse');
      })
    } 
    else {
      element.classList.remove('navbar-inner');
      navBrandElement.classList.remove('navbar-inverse');
      navLinkElement.forEach(ele =>{
        ele.classList.remove('navbar-inverse');
      })
    }
  }

  get fs(){ return this.signUpForm.controls }
  get fl(){ return this.LoginForm.controls }
  get f(){ return this.flightSearch.controls }

  signUp(){
    this.submittedSignUp = true
    if(this.signUpForm.invalid){
      return
    }
      console.log(this.signUpForm.value)
      this.flightService.signUp("users/signup", this.signUpForm.value).subscribe(signUpData =>{
        console.log(signUpData)
        //alert("Sign Up Successfully!!")
        this.signUpForm.reset();
        this.submittedSignUp = false
      })
  }

  Login(){
    this.submittedLogin = true
    if(this.LoginForm.invalid){
      return
    }
      console.log(this.LoginForm.value)
      this.flightService.login("users/login", this.LoginForm.value).subscribe(loginData =>{
        console.log(loginData)
        this.loginDetails = loginData
        //alert("Login Successfully!!")
        sessionStorage.setItem("access-token", this.loginDetails["token"])
        sessionStorage.setItem("login", "yes");

        this.LoginForm.reset();
        this.submittedLogin = false

        this.route.navigate(['/flight'])
        return true
      })
    }
    logout(){
      sessionStorage.removeItem("login")
      sessionStorage.removeItem('access-token');
    }

  searchFlight(){
    this.submitted = true
    if(this.flightSearch.invalid){
      return
    }
    console.log("in searchFlight()")
    this.flightService.getFlights("flights/search", this.flightSearch.value).subscribe(flightData =>{
      console.log("Flight Search")
      this.flights = flightData
      localStorage.setItem('flightData', JSON.stringify(this.flights));
      this.route.navigate(['flight-search'])
    })
  }
}
