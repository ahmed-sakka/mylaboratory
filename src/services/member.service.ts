import {Injectable} from '@angular/core';
import {GLOBAL} from '../app/app-config';
import {HttpClient} from '@angular/common/http';
import { Member } from 'src/models/member.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private path = `${environment.gatewayEndpoint}/membre-service`;
  // @ts-ignore
  public placeholderMembers: Member[] = GLOBAL._DB.members;

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getAllMembers(): Promise<Member[]> {
     return this.httpClient.get<Member[]>(`${this.path}/membres`).toPromise();
    //return new Promise(resolve => resolve(this.placeholderMembers));
  }

  getMemberById(id: string): Promise<Member> {
    return this.httpClient.get<Member>(`${this.path}/membres/${id}`).toPromise();
  }

  /**
   * create a new member or update an old member.
   * a new member doesn't have an id
   */
  saveMember(member: any): Promise<Member> {
    if (!!member.id) {
      return this.updateMember(member.id, member);
    } else {
      return this.createMember(member);
    }
  }

  createMember(member: any): Promise<Member> {
    return this.httpClient.post<Member>(`${this.path}/membres/etudiant`, member).toPromise();
  }

  updateMember(id: string, member: any): Promise<Member> {
    return this.httpClient.put<Member>(`${this.path}/membres/etudiant/${id}`, member).toPromise();
  }


  removeMemberById(id: string): Promise<void> {
    // return this.httpClient.delete<void>('linkToRestApi').toPromise();
    //this.placeholderMembers = this.placeholderMembers.filter(item => item.id !== id);
    this.httpClient.delete<Member>(`${this.path}/membres/${id}`).toPromise();
    return new Promise(resolve => resolve());
  }


}