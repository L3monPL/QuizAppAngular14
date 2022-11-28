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

  getImagesList(containerName: string):Observable<HttpResponse<Array<Image>>>{
    return this.http.get<Array<Image>>(this.PATH + `/${containerName}`,{
      observe: 'response',
      responseType: 'json'
    })
  }

  postImage(
    file: File, 
    fileName: string,
    containerName: string
    ){
      let formData = new FormData()
      formData.append('file', file, fileName)
    return this.http.post(this.PATH + `/${containerName}`,
    formData
    ,{
      observe: 'response',
      responseType: 'json'
    }
    )
  }

  deleteImage(
    filename: string, 
    containerName: string
    ):Observable<HttpResponse<Image>>{
    return this.http.delete<Image>(this.PATH + `/${containerName}/filename?filename=${filename}`,{
      observe: 'response',
      responseType: 'text' as 'json'
    })
  }
}
