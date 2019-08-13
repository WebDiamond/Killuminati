import {BehaviorSubject, Observable, throwError} from "rxjs";
import {StorageMap} from '@ngx-pwa/local-storage';

export class DbTable {
  tableName: string = '';
  currentBehaviour = new BehaviorSubject<any>(null);
  currentValue: Observable<any> = this.currentBehaviour.asObservable();

  constructor(private storageMap: StorageMap, name){
    this.tableName = name;
    this.storageMap.get(this.tableName).subscribe((value) => {
      this.currentBehaviour.next(value);
      this.currentValue = this.currentBehaviour.asObservable();
    });
  }

  get(): Observable<any>{
    this.storageMap.get(this.tableName).subscribe(
      (value) => {
        return this.currentBehaviour.next(value)
      });
    return this.currentBehaviour.asObservable();
  }

  set(value: any): Observable<any> {
    let val = JSON.parse(JSON.stringify(value));
    this.currentBehaviour.next(val);
    this.storageMap.set(this.tableName,val).subscribe({
      next: (value) => {
        return value
      },
      error: (err) => throwError(err),
    });
    return this.currentValue;
  }


  add(value: any): any{
    let obj = [];
    if(this.currentBehaviour.value)
      obj = obj.concat(this.currentBehaviour.value,value);
    else
      obj.push(value);
    obj = obj.filter((e) => {
      return !!e
    });
    return this.set(obj);
  }

  remove(item?: any): Observable<any>{
    let obj = [];
    obj = obj.concat(this.currentBehaviour.value);
    let index = obj.findIndex((tupla) => {
      return tupla == item;
    });
    obj.splice(index,1)
    return this.set(obj);
  }

  /**
   * @description rimuove l'intera collezione
   * @param index
   */
  delete(): Observable<any> {
    return this.set(null);
  }
}
