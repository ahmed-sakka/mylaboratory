import {Injectable} from '@angular/core';
import {GLOBAL} from '../app/app-config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Member } from 'src/models/member.model';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private path = `${environment.gatewayEndpoint}/membre-service`;
  private headers  = new HttpHeaders();
  // @ts-ignore
  public placeholderMembers: Member[] = GLOBAL._DB.members;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthenticationService
  ) {

    this.headers.append('authorization'
    , this.authService.loadToken());
  }

  // tslint:disable-next-line:typedef
  getAllMembers() {
     return this.httpClient.get<Member[]>(`${this.path}/membres`, {headers: this.headers}).toPromise();
  }

  getMemberById(id: string): Promise<Member> {
    return this.httpClient.get<Member>(`${this.path}/membres/${id}`, {headers: this.headers}).toPromise();
  }

  /**
   * create a new member or update an old member.
   * a new member doesn't have an id
   */
  saveMemberEtudiant(member: any): Promise<Member> {
   member.type = 'etudiant';
    if (!!member.id) {
      return this.updateMemberEtudiant(member.id, member);
    } else {
      return this.createMemberEtudiant(member);
    }
  }
  saveMemberEns(member: any): Promise<Member> {
    member.type = 'ens';
    if (!!member.id) {
      return this.updateMemberEns(member.id, member);
    } else {
      return this.createMemberEns(member);
    }
  }

  createMemberEtudiant(member: any): Promise<Member> {
    return this.httpClient.post<Member>(`${this.path}/membres/etudiant`, member, {headers: this.headers}).toPromise();
  }

  updateMemberEtudiant(id: string, member: any): Promise<Member> {
    return this.httpClient.put<Member>(`${this.path}/membres/etudiant/${id}`, member, {headers: this.headers}).toPromise();
  }

  createMemberEns(member: any): Promise<Member> {
    return this.httpClient.post<Member>(`${this.path}/membres/enseignant`, member, {headers: this.headers}).toPromise();
  }

  updateMemberEns(id: string, member: any): Promise<Member> {
    return this.httpClient.put<Member>(`${this.path}/membres/enseignant/${id}`, member, {headers: this.headers}).toPromise();
  }


  removeMemberById(id: string): Promise<void> {
    return this.httpClient.delete<void>(`${this.path}/membres/${id}` , {headers: this.headers}).toPromise();
  }
  getMemberByEmail(email: string): Promise<Member> {
    return this.httpClient.get<Member>(`${this.path}/membres/searchEmail/${email}` , {headers: this.headers}).toPromise();

  }
  getFullMember(id: number): Promise<any>{
    return this.httpClient.get<any>(`${this.path}/fullmember/${id}` , {headers: this.headers}).toPromise();



  }


}
