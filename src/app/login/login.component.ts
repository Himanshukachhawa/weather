import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  log($lg,$pass)
  {
     console.log($lg.value,$pass.value);
     if($lg.value=="admin")
     {
            if($pass="admin")
            {
            
              this.router.navigate(['./home']);
            }
          else{
            
            this.router.navigate(['./lg']);
          }
     }

  }

  constructor(private router:Router) { }

  ngOnInit() {
  }

}
