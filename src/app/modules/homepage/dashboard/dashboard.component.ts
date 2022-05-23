import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userId!:number
  movies:any
  favs:any


  like(movieId:number){
    console.log("MI PIACE " , movieId)
    this.srv.like(movieId,this.userId).subscribe((data)=>{
      this.srv.getAllFavorites().toPromise().then((data)=> {
        this.favs= data;
      })
    })
  }
  dislike(movieId:number){
    console.log("NON MI PIACE", movieId)
    let id=this.favs.find((ele:any)=>ele.movieId==movieId && ele.userId==this.userId).id
    console.log(id)
    this.srv.dislike(id).subscribe((data)=> {
      this.srv.getAllFavorites().toPromise().then((data)=>{
        this.favs=data
      })
    })
  }
  showLikeButton(movieId:number){
   let id= this.favs.find((movie:any)=>movie.movieId==movieId && movie.userId==this.userId)
   //qui al caricamento della pagina mi da un errore Cannot read properties del find ma
   //è un finto errore dovuto al delay di 1 sec suppongo
   if(id){
    return true
   }else {return false}
  }


  async fetchMovies(){
    await this.srv.getAllMovies().toPromise().then()
  }


  async fetchFavs(){
    await this.srv.getAllFavorites().toPromise().then()
  }

  constructor(private srv:MainService) { }


  ngOnInit(): void {
     //recupero id utente
     let json = localStorage.getItem("accessToken");
     if(!json){ return}
     this.userId = JSON.parse(json).user.id
     //recupero movies
     this.fetchMovies()
     this.srv.movies$.subscribe((films:Movie[]|null)=>{this.movies = films})
     //recupero favoriti
     this.fetchFavs()
     this.srv.favs$.subscribe((favs:any)=>{this.favs = favs})

  }

}
