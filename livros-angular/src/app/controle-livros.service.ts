import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import Livros from './livro';

@Injectable({
  providedIn: 'root'
})
export class ControleLivrosService {
  private livros: Array<Livros> = [
    { codigo: 1, codEditora: 1, titulo: 'titulo A', resumo: 'Resumo A', autores: ['autores'] },
    { codigo: 2, codEditora: 2, titulo: 'titulo B', resumo: 'Resumo B', autores: ['autores'] },
    { codigo: 3, codEditora: 3, titulo: 'titulo C', resumo: 'Resumo C', autores: ['autores'] }
  ];

  obterLivros(): Observable<Livros[]> {
    // Alterei para retornar this.livros diretamente
    return of(this.livros);
  }

  incluir(livro: Livros): void {
    // Utilizei o método `concat` para evitar a mutação direta do array
    const codigoMaisAlto = this.livros.reduce((max, l) => (l.codigo > max ? l.codigo : max), 0);
    livro.codigo = codigoMaisAlto + 1;
    this.livros = this.livros.concat([livro]);
  }

  excluir(codigo: number): Observable<void> {
    const indiceLivro = this.livros.findIndex(livro => livro.codigo === codigo);

    if (indiceLivro !== -1) {
      // Utilizei o método `filter` para criar um novo array sem o livro a ser excluído
      this.livros = this.livros.filter(livro => livro.codigo !== codigo);
      return of(null).pipe(delay(500)) as Observable<void>;
    }

    // Se não encontrar o livro, pode retornar um Observable com um erro, por exemplo:
    return Observable.throw(`Livro com código ${codigo} não encontrado.`);
  }
}
