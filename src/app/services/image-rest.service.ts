import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Image{
  uri: string,
  name: string,
  contentType: string,
  content: string
}

@Injectable({
  providedIn: 'root'
})
export class ImageRestService {

  private PATH = 'https://wsblearn-api.azurewebsites.net/api/image'

  constructor(
    private http: HttpClient
  ) { }

  getImage():Observable<HttpResponse<Array<Image>>>{
    return this.http.get<Array<Image>>(this.PATH + `/get`,{
      observe: 'response',
      responseType: 'json'
    })
  }

  postImage(
    file: File, 
    ){
      let formData = new FormData()
      formData.append('file', file)
    return this.http.post(this.PATH + `/upload`,
    formData
    ,{
      observe: 'response',
      responseType: 'json'
    }
    )
  }
}
