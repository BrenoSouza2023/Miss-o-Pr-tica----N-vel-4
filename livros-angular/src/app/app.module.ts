import { Component, OnInit } from '@angular/core';
import  Editora from './editora';
import  Livro from './livro';
import { ControleEditoraService } from './controle-editora.service';
import {ControleLivrosService} from './controle-livros.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Observable } from 'rxjs';

@NgModule({
  declarations: [
    Component    
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    ControleEditoraService,
    ControleLivrosService   
  ],
  bootstrap: [Component]
})
export class AppModule {}

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css']
})
export class LivroListaComponent implements OnInit {  
  public editoras$: Observable<Editora[]> | undefined;
  public livros: Array<Livro> = [];
  constructor(private servEditora: ControleEditoraService, private servLivros: ControleLivrosService) { }  
  ngOnInit(): void {
    this.editoras$ = this.servEditora.getEditoras();
    this.livros = this.servLivros.obterLivros();  }
  
  excluir = (codigo: number) => {
    this.servLivros.excluir(codigo);
    this.livros = this.servLivros.obterLivros();
  }
  
  obterNome = (codEditora: number) => {
    return this.servEditora.getNomeEditora(codEditora);
  }

}
