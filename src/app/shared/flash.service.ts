import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";


@Injectable()
export class FlashService {
  flashChanged = new Subject<{message:string, type:string}>();

  success(message: string){
    this.flashChanged.next({message, type: 'success'});
  }

  error(message: string){
    this.flashChanged.next({message, type: 'error'});
  }
}
