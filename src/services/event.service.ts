import { AuthenticationService } from 'src/services/authentication.service';
import {Injectable} from '@angular/core';
import {GLOBAL} from '../app/app-config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event } from 'src/models/event.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  private path = `${environment.gatewayEndpoint}/evenement-service`;
  // @ts-ignore
  public placeholderEvents: Event[] = GLOBAL._DB.events;
  private headers  = new HttpHeaders();


  constructor(
    private httpClient: HttpClient,
    private authService: AuthenticationService
  ) {
    this.headers.append('authorization'
    , this.authService.loadToken());
  }

  getAllEvents(): Promise<Event[]> {
     return this.httpClient.get<Event[]>(`${this.path}/evenements`).toPromise();
  }

  getEventById(id: string): Promise<Event> {
    return this.httpClient.get<Event>(`${this.path}/evenements/${id}`).toPromise();
  }

  /**
   * create a new event or update an old event.
   * a new event doesn't have an id
   */
  saveEvent(event: any): Promise<Event> {
    if (!!event.id) {
      return this.updateEvent(event.id, event);
    } else {
      return this.createEvent(event);
    }
  }

  createEvent(event: any): Promise<Event> {
    return this.httpClient.post<Event>(`${this.path}/evenements`, event).toPromise();
  }

  updateEvent(id: string, event: any): Promise<Event> {
    return this.httpClient.put<Event>(`${this.path}/evenements/${id}`, event).toPromise();
  }


  removeEventById(id: string): Promise<void> {
    return this.httpClient.delete<void>(`${this.path}/evenements/${id}`).toPromise();
  }


}