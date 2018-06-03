import { AuthenticationService } from './../../authentication/authentication.service';
import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'stbui-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  styleUrls: ['./toolbar-user.component.scss']
})
export class ToolbarUserComponent implements OnInit {

  isOpen: boolean = false;
  currentUser = null;
  private redirect:string;

  @HostListener('document:click', ['$event', '$event.target']) onClick(event: MouseEvent, targetElement: HTMLElement) {
    if (!targetElement) {
      return;
    }

    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.isOpen = false;
    }
  }

  /*constructor(private _elementRef: ElementRef,
              private router: Router,
              private auth:AuthService) {
    this.currentUser = this.auth;
  }*/

  constructor(private _elementRef: ElementRef
    ,private auth:AuthenticationService,
    private router: Router,
    public route: ActivatedRoute) {
this.currentUser = 'ABHISEK';
}

  ngOnInit() {
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    this.redirect = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  logout() {
   this.auth.doLogout();
   this.router.navigate([this.redirect]);
  }
}
