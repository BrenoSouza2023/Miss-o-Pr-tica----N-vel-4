import { Injectable } from '@angular/core';
import Editora from './editora';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControleEditoraService {
    editoras: Array<Editora> = [
        {codEditora: 1, nome: 'Editora A'},
        {codEditora: 2, nome: 'Editora B'},
        {codEditora: 3, nome: 'Editora C'}
    ];

    getNomeEditora(codEditora: number): string {      
      let editora = this.editoras.filter(e => e.codEditora == codEditora)[0];
      return editora ? editora.nome : 'Editora não encontrada';
    }
    getEditoras(): Observable<Editora[]> { 
      return of(this.editoras);
    }
  }  
