import { Component, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ProjectService } from '../../services/project.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-invite-members',
  templateUrl: './invite-members.page.html',
  styleUrls: ['./invite-members.page.scss'],
})
export class InviteMembersPage {
  @Input() projectId?: number; // ID del proyecto al que se invitarán miembros
  emails: string[] = []; // Lista de correos electrónicos a invitar
  searchTerm: string = ''; // Término de búsqueda
  emailInput: string = ''; // Variable para almacenar el input del correo
  searchResults: any[] = []; // Resultados de la búsqueda

  constructor(
    private modalController: ModalController,
    private projectService: ProjectService,
    private userService: UserService,
    private alertController: AlertController
  ) {}

  // Método para buscar usuarios por correo
  searchUsers() {
    console.log('Searching for:', this.emailInput); // Debug
    if (this.emailInput.trim().length > 0) {
      this.userService.searchUsersByEmail(this.emailInput).subscribe(
        (results) => {
          console.log('Search results:', results); // Debug
          this.searchResults = results; // Asigna los resultados a la variable
        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      );
    } else {
      this.searchResults = []; // Limpiar resultados si no hay término de búsqueda
    }
  }

  addEmail(email: string) {
    if (email) {
      this.emails.push(email.trim()); // Agrega el correo a la lista
      this.emailInput = ''; // Limpia el campo de entrada
      this.searchTerm = ''; // Limpiar el término de búsqueda después de agregar
      this.searchResults = []; // Limpiar resultados de búsqueda
    }
  }

  removeEmail(email: string) {
    this.emails = this.emails.filter(e => e !== email); // Eliminar el correo de la lista
  }

  async sendInvitations() {
    if (this.projectId && this.emails.length > 0) {
      this.projectService.inviteMembers(this.projectId, this.emails).subscribe(
        async () => {
          const alert = await this.alertController.create({
            header: 'Éxito',
            message: 'Invitaciones enviadas.',
            buttons: ['OK']
          });
          await alert.present();
          this.dismiss(); // Cerrar el modal
        },
        async (error) => {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Error al enviar invitaciones.',
            buttons: ['OK']
          });
          await alert.present();
        }
      );
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
