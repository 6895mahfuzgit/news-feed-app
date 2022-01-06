import { ItemService } from './../../_services/item.service';
import { SafeURLPipe } from './../../_pipes/safe.pipe.';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Observable } from 'rxjs';

@Component({
  selector: 'app-popup-dialog',
  templateUrl: './popup-dialog.component.html',
  styleUrls: ['./popup-dialog.component.css'],
  providers:[SafeURLPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupDialogComponent implements OnInit {

  // private urlSubject = new BehaviorSubject<string>('');
  // url$ = this.urlSubject.asObservable();
  url$:Observable<string>;

  constructor( public dialog: MatDialog,
              private itemService:ItemService) {

  }

  ngOnInit(): void {
   this.url$=this.itemService.url$;
  }



  close(){
       this.dialog.closeAll();
  }

}
