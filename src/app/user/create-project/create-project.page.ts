import { Component } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.page.html',
  styleUrls: ['./create-project.page.scss'],
})
export class CreateProjectPage {
  project = {
    name: '',
    description: '',
    status: 'pending', // Estado inicial del proyecto
  };

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService
  ) {}

  async createProject() {
    const userId = this.authService.getLoggedInUserId(); // Obtener el ID del usuario autenticado

    this.projectService.createProject({ ...this.project, userId }).subscribe(
      async () => {
        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'Proyecto creado con éxito.',
          buttons: ['OK'],
        });
        await alert.present();
        this.router.navigate(['/my-projects']); // Regresar a la lista de proyectos
      },
      async (error) => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Error al crear el proyecto.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }
}
