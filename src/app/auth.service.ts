import { Injectable } from '@angular/core';
import { UserManager, User, UserManagerSettings } from 'oidc-client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userManager: UserManager;

  constructor() {
    const settings: UserManagerSettings = {
      authority: 'https://your-identity-provider.com',
      client_id: 'your-client-id',
      redirect_uri: 'http://localhost:4200/auth-callback',
      response_type: 'code',
      scope: 'openid profile api1',
      post_logout_redirect_uri: 'http://localhost:4200/',
    };

    this.userManager = new UserManager(settings);
  }

  login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  async completeLogin(): Promise<User> {
    return this.userManager.signinRedirectCallback();
  }

  async getUser(): Promise<User | null> {
    const user = await this.userManager.getUser();
    if (user) {
      // Use the user object
      return user;
    } else {
      // Handle the case when the user is not logged in
      return null;
    }
  }
}
