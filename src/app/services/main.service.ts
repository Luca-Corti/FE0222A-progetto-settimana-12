import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http:HttpClient) { }
  moviesSubject= new BehaviorSubject<null | Movie[]> (null)
  movies$= this.moviesSubject.asObservable()
  favsSubject = new BehaviorSubject<null | any>(null)
  favs$ = this.favsSubject.asObservable()
  getAllMovies() {
    return this.http.get<Movie[]>('http://localhost:4201/movies-popular').pipe(
      tap((data) => {
        this.moviesSubject.next(data);
      })
    );
  }

  getAllFavorites() {
    return this.http.get('http://localhost:4201/favorites').pipe(
      tap((data) => {
        this.favsSubject.next(data);
      })
    );
  }
  like(movieId:number, userId:number){
    let fav =  {"movieId": movieId, "userId":userId}
    return this.http.post("http://localhost:4201/favorites", fav)
  }
  dislike(id:number){
    return this.http.delete(`http://localhost:4201/favorites/${id}`)
  }

}
