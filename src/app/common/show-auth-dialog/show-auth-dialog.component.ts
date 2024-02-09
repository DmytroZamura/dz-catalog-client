import {Component, OnInit} from '@angular/core';
import {AppService} from '../../app.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-show-auth-dialog',
  templateUrl: './show-auth-dialog.component.html',
  styleUrls: ['./show-auth-dialog.component.css']
})
export class ShowAuthDialogComponent implements OnInit {

  constructor(public appService: AppService, private router: Router) {
  }

  ngOnInit(): void {
  }


  goToLogin() {
    this.appService.showAuthDialog = false;
    this.router.navigate(['/auth']);
  }


}
