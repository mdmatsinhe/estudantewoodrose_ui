import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-steps',
  templateUrl: './form-steps.component.html',
  styleUrls: ['./form-steps.component.scss']
})
export class FormStepsComponent implements OnInit {
  items!: MenuItem[];
 
  subscription!: Subscription;
  userlogado = '';
  constructor(public messageService: MessageService) {}

  ngOnInit() {
      this.items = [{
              label: 'Dados Pessoais',
              routerLink: 'personal'
          },
          {
            label: 'Filiação',
            routerLink: 'parents'
          },
          {
              label: 'Dados do Curso',
              routerLink: 'course'
          },
          
          {
              label: 'Confirmação',
              routerLink: 'confirmation'
          }
      ];

    //  this.subscription = this.ticketService.paymentComplete$.subscribe((personalInformation) =>{
    //      this.messageService.add({severity:'success', summary:'Order submitted', detail: 'Dear, ' + personalInformation.firstname + ' ' + personalInformation.lastname + ' your order completed.'});
    //  });
  }

  ngOnDestroy() {
      if (this.subscription) {
          this.subscription.unsubscribe();
      }
  }
}
