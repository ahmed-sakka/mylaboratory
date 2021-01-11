import {Injectable} from '@angular/core';
import {GLOBAL} from '../app/app-config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Publication } from 'src/models/publication.model';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private path = `${environment.gatewayEndpoint}/publication-service`;
  // @ts-ignore
  public placeholderPublications: Publication[] = GLOBAL._DB.publications;
  private headers  = new HttpHeaders();


  constructor(
    private httpClient: HttpClient,
    private authService: AuthenticationService
  ) {
    this.headers.append('authorization'
    , this.authService.loadToken());
  }

  getAllPublications(): Promise<Publication[]> {
     return this.httpClient.get<Publication[]>(`${this.path}/publications`, {headers: this.headers}).toPromise();
  }

  getPublicationById(id: string): Promise<Publication> {
    return this.httpClient.get<Publication>(`${this.path}/publications/${id}`, {headers: this.headers}).toPromise();
  }

  /**
   * create a new publication or update an old publication.
   * a new publication doesn't have an id
   */
  savePublication(publication: any): Promise<Publication> {
    if (!!publication.id) {
      return this.updatePublication(publication.id, publication);
    } else {
      return this.createPublication(publication);
    }
  }

  createPublication(publication: any): Promise<Publication> {
    return this.httpClient.post<Publication>(`${this.path}/publications`, publication, {headers: this.headers}).toPromise();
  }

  updatePublication(id: string, publication: any): Promise<Publication> {
    return this.httpClient.put<Publication>(`${this.path}/publications/${id}`, publication, {headers: this.headers}).toPromise();
  }


  removePublicationById(id: string): Promise<void> {
    return this.httpClient.delete<void>(`${this.path}/publications/${id}`, {headers: this.headers}).toPromise();
  }


}