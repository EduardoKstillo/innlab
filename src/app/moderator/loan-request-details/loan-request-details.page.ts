import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanRequestService } from '../../services/loan-request.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-loan-request-details',
  templateUrl: './loan-request-details.page.html',
  styleUrls: ['./loan-request-details.page.scss'],
})
export class LoanRequestDetailsPage implements OnInit {
  loanRequest: any;

  constructor(
    private route: ActivatedRoute,
    private loanRequestService: LoanRequestService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    const loanRequestIdParam = this.route.snapshot.paramMap.get('id');
    if (loanRequestIdParam) {
      const loanRequestId = +loanRequestIdParam;
      this.loadLoanRequestDetails(loanRequestId);
    } else {
      console.error('No se encontró el ID de la solicitud en la ruta');
    }
  }

  loadLoanRequestDetails(loanRequestId: number) {
    this.loanRequestService.getLoanRequestById(loanRequestId).subscribe(
      (response) => {
        this.loanRequest = response; // Cargar detalles de la solicitud
      },
      async (error) => {
        console.error('Error fetching loan request details:', error);
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'No se pudo cargar los detalles de la solicitud.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }

  async approveRequest() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas aprobar esta solicitud?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.loanRequestService.approveLoanRequest(this.loanRequest.id).subscribe(
              async () => {
                const successAlert = await this.alertController.create({
                  header: 'Éxito',
                  message: 'Solicitud aprobada.',
                  buttons: ['OK']
                });
                await successAlert.present();
                this.router.navigate(['/moderator-loan-requests']);
              },
              async (error) => {
                console.error('Error approving loan request:', error);
                const errorAlert = await this.alertController.create({
                  header: 'Error',
                  message: 'Error al aprobar la solicitud.',
                  buttons: ['OK']
                });
                await errorAlert.present();
              }
            );
          },
        },
      ],
    });

    await alert.present();
  }

  async rejectRequest() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas rechazar esta solicitud?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Rechazar',
          handler: () => {
            this.loanRequestService.rejectLoanRequest(this.loanRequest.id).subscribe(
              async () => {
                const successAlert = await this.alertController.create({
                  header: 'Éxito',
                  message: 'Solicitud rechazada.',
                  buttons: ['OK']
                });
                await successAlert.present();
                this.router.navigate(['/moderator-loan-requests']);
              },
              async (error) => {
                console.error('Error rejecting loan request:', error);
                const errorAlert = await this.alertController.create({
                  header: 'Error',
                  message: 'Error al rechazar la solicitud.',
                  buttons: ['OK']
                });
                await errorAlert.present();
              }
            );
          },
        },
      ],
    });

    await alert.present();
  }
}
