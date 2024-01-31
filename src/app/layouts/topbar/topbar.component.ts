import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../core/services/auth.service';
import { UserLogado } from 'src/app/account/auth/user-logado.model';
import { ProjetoGeral } from 'src/app/core/models/projeto/projetoGeral.model';
import { ProjetoService } from 'src/app/core/services/projeto.service';
import { Projeto } from 'src/app/core/models/projeto.models';
import { data } from 'jquery';
import { ControleFisicoComponent } from 'src/app/pages/controlefisico/controle-fisico.component';
import { CommunicationService } from './communication.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  localStorage = window.localStorage;
  public dados = new ProjetoGeral();
  public listaProjetos: ProjetoGeral[];
  public projeto: ProjetoGeral;
  public selectedValue: any;

  
  currentUser: UserLogado = this.authService.currentUser();
  

  notificationItems: Array<{}>;
  languages: Array<{
    id: number,
    flag?: string,
    name: string
  }>;
  selectedLanguage: {
    id: number,
    flag?: string,
    name: string
  };

  openMobileMenu: boolean;

  @Input() id: any;
  @Input() dadosEditando: any;
  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();

  constructor(
    private router: Router, 
    private authService: AuthenticationService,
    public _projetoService: ProjetoService,
    private communicationService: CommunicationService
    ) { }

  ngOnInit() {

    // get the notifications
    this._fetchNotifications();

    // get the language
    this._fetchLanguages();

    this.selectedLanguage = this.languages[0];
    this.openMobileMenu = false;
    this.carregarProjeto();

  }
  ngAfterViewInit() {}

  /**
   * Change the language
   * @param language language
   */
  changeLanguage(language) {
    this.selectedLanguage = language;
  }

  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Logout the user
   */
  logout() {
    this.authService.logout();
    this.router.navigate(['/account/login']);
  }

  saveToLocalStorage(projeto) {
    this.communicationService.emitirEventoToolbar();
    this.localStorage.setItem('projeto', projeto.descricao);
  }

  getFromLocalStorage() {
    const storedProjeto = this.localStorage.getItem('projeto');

    if (storedProjeto) {
        // If the storedProjeto is a string, parse it into an object
        const projeto = JSON.parse(storedProjeto);
        return projeto;
    }

    return null; // or handle the case when no project is stored
}


  projetoSelect(event: any) {
    this.projeto = event;
    this.dados.descricao = event.nome;
  }

  carregarProjeto() {
    
    this._projetoService.listarProjetos().subscribe((x) => {
      this.listaProjetos = x;
      this.selectedValue = this.filtrarPorDescricao()[0]
      if (this.id != undefined) {
        this.projeto = this.listaProjetos.find(
          (s) => s.descricao === this.dadosEditando.projeto
        );
        
      }
    });
    
  }
  
  filtrarPorDescricao() {
    const termoDeBusca = this.localStorage.getItem('projeto') // Converta para minúsculas para a comparação ser case-insensitive
  
    return this.listaProjetos.filter(objeto =>
      objeto.descricao.includes(termoDeBusca)
    );
  }
  /**
   * Fetches the supported languages
   */
  _fetchLanguages() {
    this.languages = [{
      id: 1,
      name: 'English',
      flag: 'assets/images/flags/us.jpg',
    },
    {
      id: 2,
      name: 'German',
      flag: 'assets/images/flags/germany.jpg',
    },
    {
      id: 3,
      name: 'Italian',
      flag: 'assets/images/flags/italy.jpg',
    },
    {
      id: 4,
      name: 'Spanish',
      flag: 'assets/images/flags/spain.jpg',
    },
    {
      id: 5,
      name: 'Russian',
      flag: 'assets/images/flags/russia.jpg',
    }];

    this.selectedLanguage = this.languages[0];
  }

  /**
   * Fetches the notification
   * Note: For now returns the hard coded notifications
   */
  _fetchNotifications() {
    this.notificationItems = [{
      text: 'Caleb Flakelar commented on Admin',
      subText: '1 min ago',
      icon: 'mdi mdi-comment-account-outline',
      bgColor: 'primary',
      redirectTo: '/notification/1'
    },
    {
      text: 'New user registered.',
      subText: '5 min ago',
      icon: 'mdi mdi-account-plus',
      bgColor: 'info',
      redirectTo: '/notification/2'
    },
    {
      text: 'Cristina Pride',
      subText: 'Hi, How are you? What about our next meeting',
      icon: 'mdi mdi-comment-account-outline',
      bgColor: 'success',
      redirectTo: '/notification/3'
    },
    {
      text: 'Caleb Flakelar commented on Admin',
      subText: '2 days ago',
      icon: 'mdi mdi-comment-account-outline',
      bgColor: 'danger',
      redirectTo: '/notification/4'
    },
    {
      text: 'Caleb Flakelar commented on Admin',
      subText: '1 min ago',
      icon: 'mdi mdi-comment-account-outline',
      bgColor: 'primary',
      redirectTo: '/notification/5'
    },
    {
      text: 'New user registered.',
      subText: '5 min ago',
      icon: 'mdi mdi-account-plus',
      bgColor: 'info',
      redirectTo: '/notification/6'
    },
    {
      text: 'Cristina Pride',
      subText: 'Hi, How are you? What about our next meeting',
      icon: 'mdi mdi-comment-account-outline',
      bgColor: 'success',
      redirectTo: '/notification/7'
    },
    {
      text: 'Caleb Flakelar commented on Admin',
      subText: '2 days ago',
      icon: 'mdi mdi-comment-account-outline',
      bgColor: 'danger',
      redirectTo: '/notification/8'
    }];
  }
}
