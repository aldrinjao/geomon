import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cat-create',
  templateUrl: './cat-create.component.html',
  styleUrls: ['./cat-create.component.scss']
})
export class CatCreateComponent implements OnInit {

  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit() {
  }
  category:any ={ }

  createCat() {
    this.http.post('/api/cat', this.category)
    .subscribe(res => {
        let id = res['_id'];
        this.router.navigate(['/cat-create/']);
      }, (err) => {
        console.log(err);
      }
    );
  }
}
