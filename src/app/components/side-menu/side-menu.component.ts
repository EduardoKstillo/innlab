import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent {
  user: any = {};

  constructor(
    private authService: AuthService,
    private menu: MenuController,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    const userId = this.authService.getLoggedInUserId(); // Puede ser number o null
    
    // Verifica si userId no es nulo antes de llamar al servicio
    if (userId !== null) {
      this.userService.getUserById(userId).subscribe(
        (response) => {
          this.user = response; // Asignar la información del usuario
        },
        (error) => {
          console.error('Error fetching user profile:', error);
        }
      );
    } else {
      console.error('User ID is null, cannot fetch user profile');
      // Aquí puedes manejar el caso cuando el usuario no está autenticado
    }
  }


  closeMenu() {
    this.menu.close(); // Cierra el menú
  }

  logout() {
    this.authService.logout(); // Llama al servicio de autenticación para cerrar sesión
    // Aquí puedes redirigir al usuario a la página de inicio de sesión si es necesario
  }
}
