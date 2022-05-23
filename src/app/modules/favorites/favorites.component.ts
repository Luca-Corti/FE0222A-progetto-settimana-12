import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/movie';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor(private router:ActivatedRoute, private srv:MainService) { }
  id!:number
  favs:any
  movies:any
  likedMovies:any
  loading:boolean=true;

   fetchFavs(){
     this.srv.getAllFavorites().toPromise().then(res => this.favs=res)
  }
   fetchMovies(){
     this.srv.getAllMovies().toPromise().then(res => this.movies=res)
  }
  ngOnInit(): void {
    this.id = this.router.snapshot.params['id']
     //recupero movies
     this.srv.movies$.subscribe(val=>this.movies=val)

     //recupero favoriti
     this.srv.favs$.subscribe(val=>this.favs=val)

     //trovo i mi piace
     this.likedMovies = this.movies.filter((movie:any) =>{
      return this.favs.find((fav:any)=> {
       return fav.movieId == movie.id && fav.userId == this.id
     })
   })


  }

}
