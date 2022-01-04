import { ItemTypeService } from './../../_services/item-type.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-menu-bar',
  templateUrl: './top-menu-bar.component.html',
  styleUrls: ['./top-menu-bar.component.css'],
})
export class TopMenuBarComponent implements OnInit {
  constructor(private itemTypeService: ItemTypeService) {}

  ngOnInit() {}

  loadData(itemType: string) {
    console.log('set:-',itemType);

    this.itemTypeService.changeSelectedItemType(itemType);
  }
}
