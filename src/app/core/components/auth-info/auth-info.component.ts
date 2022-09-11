import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-auth-info',
  templateUrl: './auth-info.component.html',
  styleUrls: ['./auth-info.component.scss']
})
export class AuthInfoComponent implements OnInit {


  constructor(private authService:AuthenticationService) { }

  ngOnInit(): void {

  }

}
