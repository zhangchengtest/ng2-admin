import { Component, OnInit, Input } from '@angular/core';
import 'prismjs/components/prism-jsx.js';
import { NgdThemesService } from './ngd-themes.service';

@Component({
  selector: 'ngd-theme-block',
  template: `
<div class="block-container">
  <p class="block-title"> Theme {{block.blockData.name}}</p>
  <p *ngIf="block.blockData.parent">inherited from {{block.blockData.parent}} theme</p>
  <table class="table table-striped">
    <thead>
      <tr>
        <td>Name</td>
        <td>Value</td>
        <td>Parent</td>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let prop of block.blockData.data | ObjValues">
        <td>{{ prop.name }}</td>
        <td ngdColorSwatch>{{ prop.value }}</td>
        <td>{{ prop.ancestors[0]?.theme }} {{ prop.ancestors[0]?.prop }}</td>
      </tr>
    </tbody>
  </table>
</div>
`,
})
export class NgdThemeComponent {
  themeContent: any;
  themeName: string;
  filteredContent: any;

  @Input('block')
  set setProps(block: any) {
    this.themeContent = block.blockData.data.keys().map(key => block.blockData.data[key]);
    this.themeName = block.blockData.name;
  }

  constructor(private ThemesService: NgdThemesService) {}

  ngOnInit() {
    this.ThemesService.getFilter()
      .subscribe(term => this.filteredContent = this.themeContent.filter(item => new RegExp(`${term}`, 'gi').test(item)))
  }
}
