import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { InviteMembersPage } from '../invite-members/invite-members.page';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.page.html',
  styleUrls: ['./project-details.page.scss'],
})
export class ProjectDetailsPage implements OnInit {
  project: any;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    const projectIdParam = this.route.snapshot.paramMap.get('id');
    const projectId = projectIdParam ? +projectIdParam : null;

    if (projectId !== null) {
      this.loadProjectDetails(projectId);
    } else {
      console.error('Project ID is null');
    }
  }

  loadProjectDetails(projectId: number) {
    this.projectService.getProjectWithMembers(projectId).subscribe(
        (response) => {
            this.project = response;
        },
        async (error) => {
            console.error('Error fetching project details:', error);
            const alert = await this.alertController.create({
                header: 'Error',
                message: 'No se pudo cargar los detalles del proyecto.',
                buttons: ['OK'],
            });
            await alert.present();
        }
    );
}


  async deleteProject() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas eliminar este proyecto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Eliminar',
          // handler: () => {
          //   this.projectService.deleteProject(this.project.id).subscribe(
          //     async () => {
          //       const alert = await this.alertController.create({
          //         header: 'Éxito',
          //         message: 'Proyecto eliminado con éxito.',
          //         buttons: ['OK'],
          //       });
          //       await alert.present();
          //       this.router.navigate(['/my-projects']);
          //     },
          //     async (error) => {
          //       const alert = await this.alertController.create({
          //         header: 'Error',
          //         message: 'Error al eliminar el proyecto.',
          //         buttons: ['OK'],
          //       });
          //       await alert.present();
          //     }
          //   );
          // },
        },
      ],
    });

    await alert.present();
  }

  editProject() {
    this.router.navigate(['/edit-project', this.project.id]); // Navegar a la página de edición
  }

  async openInviteModal() {
    const modal = await this.modalController.create({
      component: InviteMembersPage,
      componentProps: { projectId: this.project.id } // Pasar el ID del proyecto
    });
    return await modal.present();
  }
}
