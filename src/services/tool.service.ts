import {Injectable} from '@angular/core';
import {GLOBAL} from '../app/app-config';
import {HttpClient} from '@angular/common/http';
import { Tool } from 'src/models/tool.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ToolService {
  private path = `${environment.gatewayEndpoint}/outil-service`;
  // @ts-ignore
  public placeholderTools: Tool[] = GLOBAL._DB.tools;

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getAllTools(): Promise<Tool[]> {
     return this.httpClient.get<Tool[]>(`${this.path}/outils`).toPromise();
  }

  getToolById(id: string): Promise<Tool> {
    return this.httpClient.get<Tool>(`${this.path}/outils/${id}`).toPromise();
  }

  /**
   * create a new tool or update an old tool.
   * a new tool doesn't have an id
   */
  saveTool(tool: any): Promise<Tool> {
    if (!!tool.id) {
      return this.updateTool(tool.id, tool);
    } else {
      return this.createTool(tool);
    }
  }

  createTool(tool: any): Promise<Tool> {
    return this.httpClient.post<Tool>(`${this.path}/outils`, tool).toPromise();
  }

  updateTool(id: string, tool: any): Promise<Tool> {
    return this.httpClient.put<Tool>(`${this.path}/outils/${id}`, tool).toPromise();
  }


  removeToolById(id: string): Promise<void> {
    return this.httpClient.delete<void>(`${this.path}/outils/${id}`).toPromise();
  }


}