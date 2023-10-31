import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../store/models/user';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly BASE_URL: string = environment.BASE_URL;
  private readonly SEED: string = environment.SEED;

  constructor(private http: HttpClient) { }
  private headers = new HttpHeaders().set('Accept-Encoding', 'gzip, deflate, br');

  getUsers(offset: number, limit: number): Observable<User[]> {
    return this.http.get<{ results: any[] }>(`${this.BASE_URL}?seed=${this.SEED}&results=${limit}&page=${offset + 1}`, { headers: this.headers })
      .pipe(
        map(response =>
          response.results.map(user => ({
            id: user.login.uuid,
            firstName: user.name.first,
            lastName: user.name.last,
            phone: user.phone,
            imgURLThumbnail: user.picture.thumbnail,
            imgURLMedium: user.picture.medium,
            imgURLLarge: user.picture.large,
          }))
        )
      );
  }

  getTotalUsersCount(): Observable<number> {
    return this.http.get<{ info: { results: number } }>(
      `${this.BASE_URL}?seed=${this.SEED}&results=0`
    ).pipe(
      map(response => 2000)
    );
  }
}

