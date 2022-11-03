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

  getImagesList():Observable<HttpResponse<Array<Image>>>{
    return this.http.get<Array<Image>>(this.PATH + `/get`,{
      observe: 'response',
      responseType: 'json'
    })
  }

  postImage(
    file: File, 
    fileName: string
    ){
      let formData = new FormData()
      formData.append('file', file, fileName)
    return this.http.post(this.PATH + `/upload`,
    formData
    ,{
      observe: 'response',
      responseType: 'json'
    }
    )
  }
}
