import {Injectable} from '@angular/core';
import {DbTable} from "../storage.service";
import {StorageMap} from "@ngx-pwa/local-storage";

@Injectable({
  providedIn: 'root'
})
export class UserAuthService extends DbTable {
  constructor(storageMap: StorageMap) {
    super(storageMap, 'userauth');
  }
}
