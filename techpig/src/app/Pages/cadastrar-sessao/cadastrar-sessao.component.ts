import { Component, OnInit } from '@angular/core';
import { BancoService } from '../../utils/banco.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Suino } from '../../Models/suino';
import { Sessao } from '../../Models/sessao';

@Component({
  selector: 'app-cadastrar-sessao',
  templateUrl: './cadastrar-sessao.component.html',
  styleUrls: ['./cadastrar-sessao.component.css']
})
export class CadastrarSessaoComponent implements OnInit {

  sessaoForm!: FormGroup;
  suinos!: Suino[];
  sessao!: Sessao;
  dialogoBrinco: boolean = false;
  dialogoAtividade: boolean = false;

  constructor(private servico: BancoService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.carregarSuinos();
    this.sessaoForm = this.formBuilder.group({
      data: ['', Validators.required],
      descricao: ['', Validators.required],
      brincos: this.formBuilder.array([]), // Inicializa um FormArray para brincos
      atividadesPlanejadas: this.formBuilder.array([]) // Inicializa um FormArray para atividadesPlanejadas
    });
  }

  carregarSuinos() {
    this.servico.getSuinos().subscribe(suinos => {
      this.suinos = suinos;
    });
  }

  onSubmit() {
    if (this.sessaoForm.valid) {
      const sessao = new Sessao(
        this.sessaoForm.get('data')?.value,
        this.sessaoForm.get('descricao')?.value,
        this.sessaoForm.get('brincos')?.value,
        this.sessaoForm.get('atividadesPlanejadas')?.value
      );

      console.log('Nova Sessão:', sessao);

      this.servico.adicionarSessao(sessao);

      this.sessaoForm.reset();
    }
  }

  addAtividade() {
    const atividadesPlanejadas = this.sessaoForm.get('atividadesPlanejadas') as FormArray;
    atividadesPlanejadas.push(this.formBuilder.control('', Validators.required));
    this.dialogoAtividade = true;

    setTimeout(() => {
      this.dialogoAtividade = false;
    }, 2000); // Exibe a mensagem por 2 segundos
  }

  addSuino() {
    const brincos = this.sessaoForm.get('brincos') as FormArray;
    brincos.push(this.formBuilder.control('', Validators.required));
    this.dialogoBrinco = true;

    setTimeout(() => {
      this.dialogoBrinco = false;
    }, 2000); // Exibe a mensagem por 2 segundos
  }

}
