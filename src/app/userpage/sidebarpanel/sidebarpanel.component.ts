import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-sidebarpanel',
  templateUrl: './sidebarpanel.component.html',
  styleUrls: ['./sidebarpanel.component.scss']
})
export class SidebarpanelComponent implements OnInit {

  constructor(public auth: AuthenticationService) { }

  ngOnInit() {
  }

}
