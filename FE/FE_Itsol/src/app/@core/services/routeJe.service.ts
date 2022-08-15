import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {TokenService} from "./token.service";

@Injectable()export class RouteJeService implements CanActivate {
  constructor(private token: TokenService, private route: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const tokenIf = JSON.parse(localStorage.getItem('user'));
    const routes = tokenIf.auth;
    if (routes === 'ROLE_ADMIN' ) {
      console.log(routes);
      return true;
    } else {
      this.route.navigate(['/home']);
      return false;
    }
    return undefined;
  }

}
