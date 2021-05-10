import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { ConfirmDialogService } from 'src/app/confirm-dialog/confirm-dialog.service';
import { FlightService } from 'src/app/flight/flight.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-top-dest-table',
  templateUrl: './top-dest-table.component.html',
  styleUrls: ['./top-dest-table.component.css']
})
export class TopDestTableComponent implements OnInit {

  public allTopDest: any
  public topDestForm: any;
  addTopDest: any;
  formHeading: any;
  buttonName: any;
  image: any;
  submitted: any;
  editTopDest: any;
  public query: any = ""
  admin_details: any;

  constructor(
    private flightService: FlightService, 
    private adminService: AdminService,
    private fb: FormBuilder,
    private confirmDialogService: ConfirmDialogService) { }

  ngOnInit(): void {
    this.flightService.getAllTopDest("top-dest").subscribe(dest =>{
      this.allTopDest = dest;
    })

    this.addTopDest = true
    this.formHeading = 'Add Airline';
    this.buttonName = 'Add';
    this.image = 'Upload City Image'
    this.topDestForm = this.fb.group({
      id: [0],
      from: ['', Validators.required],
      destination: ['', Validators.required],
      fare: ['', Validators.required],
      cityImage: [null, Validators.required],
    })
  }

  get fs(){ return this.topDestForm.controls }

  topDest(){
    if(this.addTopDest === true){
      this.submitted = true
      if(this.topDestForm.invalid){
        return
      }
      console.log(this.addTopDest)
      this.adminService.addTopDest("topDest/add", this.topDestForm.value.from, this.topDestForm.value.destination, this.topDestForm.value.cityImage, this.topDestForm.value.fare).subscribe(Data =>{
        console.log(Data)
        alert("Top Dest Added Successfully!!")
        this.topDestForm.reset();
        this.submitted = false
        this.ngOnInit();
      })
    }
    else{
      console.log(this.addTopDest)
      let id = this.topDestForm.value.id;
      this.adminService.updateAirline("airline/update/" + id, this.topDestForm.value.airlineName, this.topDestForm.value.airlineImage).subscribe(data =>{
        alert("Updated");
        this.ngOnInit();
      });
    }
  }

  edit(topDestId: any){
    this.formHeading = 'Edit Top Destination';
    this.buttonName = 'Update';
    this.addTopDest = false;
    console.log(topDestId)

    this.topDestForm = this.fb.group({
      id: [topDestId],
      from: ['', Validators.required],
      destination: ['', Validators.required],
      fare: ['', Validators.required],
      cityImage: [null, Validators.required],
    })  

    this.adminService.getTopDest("topDest/edit/" + topDestId).subscribe(userData =>{
      this.editTopDest = userData
      console.log(this.editTopDest)
      this.topDestForm.patchValue(this.editTopDest)
    })
  }

  delete(TopDestId: any){
    this.confirmDialogService.confirmThis("Really want to delete?", () =>{
      this.adminService.deleteTopDest("topDest/delete/" + TopDestId).subscribe(topDest =>{
        this.ngOnInit();
      })
    }, () =>{

    })
  }
}
