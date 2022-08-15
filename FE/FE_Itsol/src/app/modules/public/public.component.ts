import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-public',
  templateUrl: 'public.component.html',
  styleUrls: ['./public.component.scss'],
})
export class PublicComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  onlogout(){
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-user');
    this.router.navigate(['/auth']);
  }
}
