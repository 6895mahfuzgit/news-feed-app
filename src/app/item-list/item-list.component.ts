import { ItemService } from './../../_services/item.service';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';

import { SafeURLPipe } from './../../_pipes/safe.pipe.';
import { UsService } from './../../_services/us.service';

import { ItemTypeService } from './../../_services/item-type.service';
import { WorldService } from './../../_services/world.service';
import { ScienceService } from './../../_services/science.service';
import { ArtsService } from './../../_services/arts.service';
import { HomeService } from './../../_services/home.service';
import { ItemEnum } from './../../_enums/item.enum';
import { Iitem } from 'src/_models/item';
import { PopupDialogComponent } from '../popup-dialog/popup-dialog.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemListComponent implements OnInit, OnDestroy {
  isActive$ = new Subject<boolean>();

  private itemSubject = new BehaviorSubject<Iitem[]>([]);
  items$ = this.itemSubject.asObservable();

  private loaderSubject = new BehaviorSubject<boolean>(false);
  showLoader$ = this.loaderSubject.asObservable();





  constructor(
    private itemTypeService: ItemTypeService,
    private artsService: ArtsService,
    private homeService: HomeService,
    private scienceService: ScienceService,
    private worldService: WorldService,
    private usService: UsService,
    public dialog: MatDialog,
    private itemService:ItemService,
  ) { }

  ngOnInit(): void {
    this.itemTypeService.itemType$
      .pipe(takeUntil(this.isActive$))
      .subscribe((itemType) => {
        this.loadDataByItemType(itemType);
      });
  }

  loadDataByItemType(itemType: string) {
    this.showLoader(true);
    if (itemType == ItemEnum.Arts) {
      this.artsService.getAll().pipe(takeUntil(this.isActive$)).subscribe(data => {
        this.itemSubject.next(data as Iitem[]);
        this.showLoader(false);
      }, error => {
        this.showLoader(false);
      });
    } else if (itemType == ItemEnum.Home) {
      this.homeService.getAll().pipe(takeUntil(this.isActive$)).subscribe(data => {
        this.itemSubject.next(data as Iitem[]);
        this.showLoader(false);
      }, error => {
        this.showLoader(false);
      });
    } else if (itemType == ItemEnum.Science) {
      this.scienceService.getAll().pipe(takeUntil(this.isActive$)).subscribe(data => {
        this.itemSubject.next(data as Iitem[]);
        this.showLoader(false);
      }, error => {
        this.showLoader(false);
      });
    } else if (itemType == ItemEnum.World) {
      this.worldService.getAll().pipe(takeUntil(this.isActive$)).subscribe(data => {
        this.itemSubject.next(data as Iitem[]);
        this.showLoader(false);
      }, error => {
        this.showLoader(false);
      });
    } else if (itemType == ItemEnum.Us) {
      this.usService.getAll().pipe(takeUntil(this.isActive$)).subscribe(data => {
        this.itemSubject.next(data as Iitem[]);
        this.showLoader(false);
      }, error => {
        this.showLoader(false);
      });
    } else {
      this.itemSubject.next([] as Iitem[]);
      this.showLoader(false);
    }
  }


  showLoader(display: boolean) {
    this.loaderSubject.next(display);
  }

  changeURL(url:string){
   this.itemService.changeURL(url);
   setTimeout(()=>{
    this.dialog.open(PopupDialogComponent);
   },1000);
  }

  ngOnDestroy(): void {
    this.isActive$.next(true);
    this.isActive$.unsubscribe();
  }
}
