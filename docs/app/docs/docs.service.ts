/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable } from '@angular/core';
import { List } from 'immutable';
import { NgaMenuItem } from '@akveo/nga-theme';

import { STRUCTURE } from '../../structure';
const PARSEDDOCS: any = require('../../output.json');

@Injectable()
export class DocsService {

  getStructure(): any {
    return STRUCTURE;
  }

  getPreparedMenu(prependMenu?: any): any {
    return this.prepareMenu(this.getStructure(), '/docs', prependMenu);
  }

  getParsedDocs(): any {
    return PARSEDDOCS;
  }

  getPreparedStructure() {
    return this.prepareStructure(this.getStructure(), this.getParsedDocs());
  }

  protected prepareStructure(structure, preparedDocs) {
    structure.map((item: any) => {
      if (item.type === 'block' && typeof item.blockData === 'string') {
        if (item.block === 'theme') {
          item.blockData = preparedDocs.themes[item.blockData]
        } else {
          item.blockData = preparedDocs.classes.find((data) => data.name === item.blockData );
        }
      }
      if (item.children) {
        item.children = this.prepareStructure(item.children, preparedDocs);
      }
    });
    return structure;
  }

  protected prepareMenu(structure, parentLink?: string, prependMenu?: any, parentItem?: any): any {

    let menuItems = structure.map((item: any) => {
      if (item.name) {
        const menuItem: any = {};
        const itemLink = item.type === 'block' ?
          `${parentLink}`
          : `${parentLink ? parentLink : ''}/${item.name.replace(/\s/, '-').toLowerCase()}`;

        if (item.type !== 'section') {
          menuItem['link'] = itemLink;
        }

        (item.type === 'block') ? menuItem['data'] = parentItem : menuItem['data'] = item;
        if (item.type === 'block') {
          menuItem['fragment'] = item.name;
        }
        menuItem['pathMath'] = 'false';
        menuItem['title'] = item.name;

        if (item.children && item.children[0] && item.children[0].type === 'page') {
          menuItem['children'] = this.prepareMenu(item.children, itemLink);
        }
        if (item.children && item.type === 'page' && item.isSubpages) {
          menuItem['children'] = this.prepareMenu(item.children, itemLink, null, item);
        }
        return menuItem;
      }
    });

    if (prependMenu) {
      menuItems = prependMenu.concat(menuItems);
    }

    return List<NgaMenuItem>(menuItems);
  }
}
