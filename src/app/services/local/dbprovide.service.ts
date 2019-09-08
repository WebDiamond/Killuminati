import {Injectable} from '@angular/core';
import {UserAuthModel} from "@src/app/services/local/models/userauth";
import {StorageMap} from "@ngx-pwa/local-storage";
import {UserAuthService} from "@src/app/services/local/extensions/userauth.service";

@Injectable({
  providedIn: 'root'
})
export class DbprovideService {
  public UserAuthValue: UserAuthModel;
  constructor(
    private storage: StorageMap,
    private userauthService: UserAuthService) {
  }
  public load(): void{
    let userexample ={
      user:'',
      password:'',
      token:''
    };
    this.userauthService.add(this.UserAuthValue);
    this.userauthService.set(userexample);
  }
}
