import { Component } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {

  check(){
    interface Institution {
      name: string;
      id: number;
    }
    
    interface ListElement {
      Institutions: Institution[];
      name: string;
      mailAddress: object;
      SiteNumber: number;
    }

    let lists : ListElement[] =[
      { Institutions: [{name:'World1',id:1},{name:'World1-2',id:2}],name:' Hello1',mailAddress:{},SiteNumber:1},
      {Institutions: [{name:'world2-1', id:1},{name:'world2-2',id:2},{name:'world2-3', id:3}],name:' Hello2',mailAddress:{},SiteNumber:2},
      {Institutions: [{name:'world3-1',id:1},{name:'world3-2',id:2}],name:' Hello3',mailAddress:{},SiteNumber:3}
    ];

    let newList: Institution[];
    newList = lists.reduce((accumulator: any[], currentValue) => {
      return accumulator.concat(currentValue.Institutions);
    }, []);
    console.log(newList);
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/