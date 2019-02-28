import { Component, OnInit } from '@angular/core';
import{User} from '../user';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private inputVar: string;
  use: User;
  selectedOption:String;
  var:any;
  file;
  show:any;
  first;
  second:Subscription;

convert()
{
   console.log(this.selectedOption);
  this.var=this.selectedOption;
   if(this.var > 0 && this.var < 20)
   {
     
     this.inputVar = "cold";
     console.log(this.show);
       
   }else if( this.var > 20 && this.var < 40)
   {
     this.inputVar = "Hot";
     console.log("hot");

   }else if( this.var > 40 && this.var < 62 ){
     this.inputVar = "Extrem hot";
      console.log("extremly hot");

   }


}




  constructor(private se:ServiceService,private router:Router) {
    
    

    this.inputVar = "changed";
  }

  ngOnInit() {
}

data1;data2;data3;data4;data5 = [];tem;
fileupload(data){
  this.file = data.target.files[0];
  console.log(this.file);
  let fileReader = new FileReader(); 

  fileReader.onload = (data) => {
    console.log(fileReader.result);
    this.data3=fileReader.result;
    this.data4=this.data3.split('\n');
    console.log(this.data4);
  } 
  fileReader.readAsText(this.file);}

  submit(country,state,city,date)
  {
    this.first= this.se.remove();
    this.second = this.first.subscribe( (d)  =>{
console.log(d);
    },
    (err) =>{
      console.log(err);
    },
    ()=>{
      console.log("done");
    });



    
   console.log(country,state,city,date);
    //console.log(dt2,dt3,dt4);
    for (let i = 0; i < this.data4.length; i++) 
    {
      this.tem=this.data4[i].split(",");
      this.data5.push( {"Time":this.tem[0], "Temperature":this.tem[1]} ); 
    }
    this.use= new User(country,state,city,date,this.data5);
    console.log(this.use);
    this.data1 = this.se.signin(this.use);
    this.data2 = this.data1.subscribe( (d) => {
      console.log(d);
      
    },
     (err) => {
      console.log(err);
     },
     () => {
      console.log("hy");
     });
    
     
  }



}


