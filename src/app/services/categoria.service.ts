import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Categoria } from '../models/categoria';

@Injectable()
export class CategoriaService {
	constructor(protected localStorage: LocalStorage) {
	}


}