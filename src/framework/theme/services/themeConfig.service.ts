/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Inject, Injectable, Type } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/publish';

import { ngaThemeOptionsToken } from '../theme.options';

const builtInThemes = [
  {
    name: 'default',
    base: null,
    variables: {
      color: '#fff',
    },
  },
  {
    name: 'cosmic',
    base: 'defaults',
    variables: {
      color: 'black',
    },
  },
  {
    name: 'light',
    base: null,
    variables: {
      color: 'white',
    },
  },
];

@Injectable()
export class NgaThemeConfig {

  themes: any;

  constructor() {
    builtInThemes.forEach((theme: any) => {
      this.registerConfig(theme.variables, theme.name, theme.base);
    });
  }

  registerConfig(config: any, themeName: string, baseTheme: string) {
    // TODO: get and merge
  }

  get(themeName: string): any {
    // TODO: returns registered config colors
  }
}
