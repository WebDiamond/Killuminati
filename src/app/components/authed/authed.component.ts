import {Component} from '@angular/core';
import {first} from 'rxjs/operators';
import {User} from "@src/app/services/auth/auth.service";
import {UserService} from "@src/app/services/auth/user.service";

@Component({
  templateUrl: 'authed.component.html'
})

export class AuthedComponent {
  loading = false;
  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loading = true;
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.loading = false;
      this.users = users;
    });
  }
}
