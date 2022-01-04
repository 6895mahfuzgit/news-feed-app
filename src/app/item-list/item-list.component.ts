import { UsService } from './../../_services/us.service';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ItemTypeService } from './../../_services/item-type.service';
import { WorldService } from './../../_services/world.service';
import { ScienceService } from './../../_services/science.service';
import { ArtsService } from './../../_services/arts.service';
import { HomeService } from './../../_services/home.service';
import { ItemEnum } from './../../_enums/item.enum';
import { Iitem } from 'src/_models/item';

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

  constructor(
    private itemTypeService: ItemTypeService,
    private artsService: ArtsService,
    private homeService: HomeService,
    private scienceService: ScienceService,
    private worldService: WorldService,
    private usService: UsService
  ) { }

  ngOnInit(): void {
    this.itemTypeService.itemType$
      .pipe(takeUntil(this.isActive$))
      .subscribe((itemType) => {
        this.loadDataByItemType(itemType);
      });
  }

  loadDataByItemType(itemType: string) {

    if (itemType == ItemEnum.Arts) {
      this.artsService.getAll().pipe(takeUntil(this.isActive$)).subscribe(data => {
        this.itemSubject.next(data as Iitem[]);
      });
    } else if (itemType == ItemEnum.Home) {
      this.homeService.getAll().pipe(takeUntil(this.isActive$)).subscribe(data => {
        this.itemSubject.next(data as Iitem[]);
      });
    } else if (itemType == ItemEnum.Science) {
      this.scienceService.getAll().pipe(takeUntil(this.isActive$)).subscribe(data => {
        this.itemSubject.next(data as Iitem[]);
      });
    } else if (itemType == ItemEnum.World) {
      this.worldService.getAll().pipe(takeUntil(this.isActive$)).subscribe(data => {
        this.itemSubject.next(data as Iitem[]);
      });
    } else if (itemType == ItemEnum.Us) {
      this.usService.getAll().pipe(takeUntil(this.isActive$)).subscribe(data => {
        this.itemSubject.next(data as Iitem[]);
      });
    }
  }

  ngOnDestroy(): void {
    this.isActive$.next(true);
    this.isActive$.unsubscribe();
  }
}
