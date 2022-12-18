import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Data } from '../data';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.sass']
})
export class AddressBookComponent implements OnInit {

  addresses: Data[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dataService: DataService) { }

  ngOnInit(){
    this.dataService.sendGetRequest().pipe(
      takeUntil(this.destroy$)).subscribe((data: Data[])=>{
        console.log(data);
        this.addresses = data;
      }
    )
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  lowValue: number = 0;
  highValue: number = 3;

  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

}
