import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'ngd-theme-block',
  template: `
<div class="block-container">
  <p class="block-title"><a [routerLink]="" fragment="{{themeName}}" ngdFragment> <i class="ion-link"></i></a> Theme {{themeName}}</p>
  <p *ngIf="parentTheme">inherited from {{parentTheme}} theme</p>
  <input #searchInput [(ngModel)]="searchFieldValue" (keyup.enter)="onTermChange(searchInput.value)">
  <p *ngIf="isWarning" class="filter-warning">Nothing found</p>
  <table class="table table-striped">
    <thead>
      <tr>
        <td>Name</td>
        <td>Value</td>
        <td>Parent</td>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let prop of filteredContent;">
        <td><a [routerLink]="" fragment="{{themeName}}Theme-{{prop.name}}" ngdFragment> <i class="ion-link"></i></a> 
          {{ prop.name }} 
         
          <ng-template #popContent>Inherited from:
            <div *ngFor="let parent of prop.ancestors;let last = last">
              <span>{{parent.prop}} from {{parent.theme}} theme</span> 
              <i *ngIf="!last" class="inheritance-icon ion-arrow-up-c"></i>
            </div>
          </ng-template>
          <button *ngIf="prop.ancestors.length > 0"[ngbPopover]="popContent" placement="right">i</button>
        
        </td>
        <td ngdColorSwatch>{{ prop.value }}</td>
        <td><a [routerLink]="" fragment="{{prop.ancestors[0]?.theme}}Theme-{{prop.ancestors[0]?.prop}}">{{ prop.ancestors[0]?.theme }} {{ prop.ancestors[0]?.prop }}</a></td>
      </tr>
    </tbody>
  </table>
</div>
`,
})
export class NgdThemeComponent implements OnInit {
  themeContent: any;
  themeName: string;
  filteredContent: any;
  parentTheme: string;
  searchFieldValue: string;
  isWarning: boolean = false;

  @Input('block')
  set setProps(block: any) {
    this.themeContent = Object.keys(block.blockData.data).map(key => block.blockData.data[key]);
    this.filteredContent = this.themeContent;
    this.themeName = block.blockData.name;
    this.parentTheme = block.blockData.parent;
  }

  constructor(private route: ActivatedRoute) {  }

  onTermChange(term: string) {
    let filterResult = this.themeContent.filter(item => new RegExp(`${term}`, 'gi').test(item.name));
    if (filterResult.length > 0) {
      this.filteredContent = filterResult;
      this.isWarning = false;
    } else {
      this.filteredContent = this.themeContent;
      this.isWarning = true;
    }

  }

  ngOnInit() {
    this.route.fragment
      .subscribe(fr => {
        this.searchFieldValue = '';
        this.onTermChange('');
      })
  }
}
