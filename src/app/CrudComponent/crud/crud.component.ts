import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { campos } from '../../model/campos';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  campo: campos;

  formulario: FormGroup;

  inscricoes: campos[] = [];


  constructor(
    private crudService: CrudService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService

  ) {
  }
  ngOnInit() {
    this.formularios();
    this.inserirTabela();
  }

  formularios() {
    this.formulario = this.formBuilder.group({
      Ano: ['', [Validators.required, Validators.minLength(4)]],
      Acordo_AutoInfracao: ['', [Validators.required]],
      Processo: ['', [Validators.required]],
      Apartirde: ['', [Validators.required]],
    })
  }
  inserirTabela() {
    const { Ano, Acordo_AutoInfracao, Processo, Apartirde } = this.formulario.value
    this.campo = {
      Ano: Ano,
      Acordo_AutoInfracao: Acordo_AutoInfracao,
      Processo: Processo,
      Apartirde: Apartirde

    };

    if (this.formulario.valid) {
      this.inscricoes.push(this.campo)
    }


  }
  
  onSubmit() {
    for (var i = 0; i < this.inscricoes.length; i++) {
      var item = this.inscricoes[i];
      this.crudService.postInscricoes(item).subscribe(data => {
        this.toastr.success('Dados salvos com sucesso')

      })

    }
    this.inscricoes = [];

  }

  remover(item: any) {

    for (var g = 0; g < this.inscricoes.length; g++) {
      if (item == this.inscricoes[g]) {
        this.inscricoes.splice(g, 1)
      }
    }
  }
}