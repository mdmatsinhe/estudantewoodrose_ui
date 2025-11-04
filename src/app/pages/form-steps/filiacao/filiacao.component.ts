import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormDataService } from 'src/app/core/services/form-data.service';

@Component({
  selector: 'app-filiacao',
  templateUrl: './filiacao.component.html',
  styleUrls: ['./filiacao.component.scss']
})
export class FiliacaoComponent implements OnInit {
  filiacaoForm!: FormGroup;
  responsavelOptions = [
    { label: 'Pai', value: 'Pai' },
    { label: 'Mãe', value: 'Mãe' },
    { label: 'Outro', value: 'Outro' },
  ];
  constructor(
    private formDataService: FormDataService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService) {}

  ngOnInit(): void {
    this.filiacaoForm = this.fb.group({
      nomePai: [this.formDataService.getData('nomePai')||'', Validators.required],
      nomeMae: [this.formDataService.getData('nomeMae')||'', Validators.required],
      telefonePai: [this.formDataService.getData('telefonePai')||'', Validators.required],
      telefoneMae: [this.formDataService.getData('telefoneMae')||'', Validators.required],
      tipoEncarregado: [this.formDataService.getData('tipoEncarregado')||null, Validators.required],
      nomeEncarregado: [this.formDataService.getData('nomeEncarregado')||''],
      telefoneEncarregado: [this.formDataService.getData('telefoneEncarregado')||''],
    });
  }

  saveData() {
    const formValues = this.filiacaoForm.value;
    for (const key in formValues) {
      if (formValues.hasOwnProperty(key)) {
        this.formDataService.setData(key, formValues[key]);
      }
    }
  }

  nextPage() {
    if (this.filiacaoForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Campos obrigatórios',
        detail: 'Preencha todos os campos obrigatórios antes de continuar.',
      });
      // Marca todos os campos como "touched" para exibir mensagens de erro nos inputs
      this.filiacaoForm.markAllAsTouched();
    }else{
      this.saveData();
    this.router.navigate(['steps/course']);
    }
}

prevPage() {
  this.saveData();
this.router.navigate(['steps/personal']);
}
}