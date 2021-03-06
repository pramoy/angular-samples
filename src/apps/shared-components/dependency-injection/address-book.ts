import {Component, OnInit} from '@angular/core';
import {AddressBookService} from './address-book-service';
import {AddressBookTitleService} from './address-book-title-service';
import {map} from 'rxjs/operators';
import {IPerson} from '../../models';
import {Observable} from 'rxjs';

@Component({
  selector: 'address-book',
  templateUrl: './address-book.html',
  providers: [AddressBookService],
})
export class AddressBook implements OnInit {
  title: string;
  res: Observable<Array<{}>>;

  constructor(
    private addressBookService: AddressBookService,
    private addressBookTitleService: AddressBookTitleService,
  ) {
    console.log('Creating AddressBook');
  }

  ngOnInit() {
    this.res = this.addressBookService.getEntries().pipe(
      map((persons: Array<IPerson>) => {
        // IPerson is generated by Bazel from person.proto
        return persons.map((person: IPerson) => ({
          firstName: person.name,
          streetAddress: person.address,
        }));
      }),
    );

    this.title = this.addressBookTitleService.getTitle();

    console.log(this.addressBookTitleService.callCount);
  }
}
