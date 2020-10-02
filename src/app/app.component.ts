import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { FreFullRootMetadata, FreNavOption, FreRootSource } from 'fre-base-components';
import { Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'fre-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent extends FreRootSource implements OnInit {

  showNav = false;

  loadingRouteConfig: boolean;


  private currentMenu: FreFullRootMetadata;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
        super();

        this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
        ).subscribe(event => {
        this.activatedRoute.children.forEach((r) => {
        this.showNav = !r.snapshot.data.hideNavigation;
        });

        this.activeLink = this.router.url;
        }
        );

        this.didChangeMenu.subscribe((menu: FreNavOption) => {
          this.router.navigate([menu.link]);
      });
}

      ngOnInit(): void {
        this.router.events.subscribe(event => {
          if (event instanceof RouteConfigLoadStart) {
            this.loadingRouteConfig = true;
          } else if (event instanceof RouteConfigLoadEnd) {
            this.loadingRouteConfig = false;
          }
        });
      }

      getSystemMetadata(): Observable<FreFullRootMetadata> {
        return of({
          schemas: [
            {title: 'cadastro', options: ['form']},
            {title: 'pagina', options: ['base']},
          ],
          menus: [
            {
              key: 'cadastro',
              title: 'Cadastro',
              icon: 'home',
              options: [
                {key: 'form', title: 'Formulário', order: 1, link: 'form'},
              ]
            },
            {
              key: 'pagina',
              title: 'Página',
              icon: 'build',
              options: [
                {key: 'base', title: 'Teste', order: 1, link: 'base'},
              ]
            }
          ]
        });
      }
}
