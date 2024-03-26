import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BancoService } from '../../utils/banco.service';

import { CadastroPesoComponent } from '../cadastro-peso/cadastro-peso.component';
import { PesoSuino } from '../../Models/pesoSuino';


@Component({
  selector: 'app-listar-pesos',
  templateUrl: './listar-pesos.component.html',
  styleUrls: ['./listar-pesos.component.css']
})
export class ListarPesosComponent implements OnInit {
  pesos: PesoSuino[] = [];
  displayedColumns: string[] = ['brincoSuino', 'dataPesagem', 'pesoKg', 'actions'];

  constructor(
     private servico: BancoService,
     private dialog: MatDialog, 
     private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.carregarPesos();
    this.servico.atualizarListaPesos().subscribe(() => {
      this.carregarPesos();
    });
  }

  carregarPesos(): void {
    this.servico.obterTodosPesos().subscribe(pesos => {
      if (pesos) {
        this.pesos = pesos;
      } else {
        console.log('Nenhum peso encontrado.');
      }
    });
  }

  abrirDialog(): void {
    const dialogRef = this.dialog.open(CadastroPesoComponent, {
      width: '800px',
      data: { opcao: 'adicionar', peso: {}, indice: 0 }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.carregarPesos();
    });
  }

  abrirDialogEditar(id: string): void {
    const peso = this.pesos.find(p => p.id === id);
    if (peso) {
      const dialogRef = this.dialog.open(CadastroPesoComponent, {
        width: '800px',
        data: { opcao: 'editar', peso: peso, indice: this.pesos.indexOf(peso) }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.carregarPesos();
      });
    }
  }

  // abrirConfirmacaoExclusao(id: string): void {
  //   const dialogRef = this.dialog.open(ConfirmacaoExclusaoComponent);
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.excluirPeso(id);
  //     }
  //   });
  // }

  // excluirPeso(id: string): void {
  //   this.listarPesosService.excluirPeso(id).subscribe(() => {
  //     this.mostrarNotificacao("Peso excluído com sucesso");
  //     this.carregarPesos();
  //   });
  // }

  mostrarNotificacao(mensagem: string): void {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 3000, // 3 segundos
    });
  }
}
