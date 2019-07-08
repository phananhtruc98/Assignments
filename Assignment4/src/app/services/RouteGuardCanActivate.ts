import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { NoteService } from './note.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RouteGuardCanActivate implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
    const id = +route.paramMap.get('id');
    return this._noteService.getNote(id).pipe(
      map(res => {
        if (res) {
          return true;
        }
        return false;
      })
    );
  }

  constructor(
    private _noteService: NoteService,
    private _router: Router,
    private _route: ActivatedRouteSnapshot,
    private routeActivate: ActivatedRoute

  ) {

  }
  // canActivate(next: ActivatedRoute, state: RouterStateSnapshot): Observable<boolean> {
  //   // return this._noteService.getNote(+this._route.paramMap.get('id')).subscribe(e => {
  //   //   if (e) {
  //   //     return true;
  //   //   }
  //   // }).catch(() => {
  //   //   this.router.navigate(['/login']);
  //   //   return Observable.of(false);
  //   // });
  //   debugger
  //   return this._noteService.getNote(+this._route.paramMap.get('id')).pipe(map((note) => {
  //     if (note) {
  //       console.log(+this.routeActivate.snapshot.paramMap.get('id'));
  //       return true;
  //     }
  //     this._router.navigate(['notfound']);
  //     return false;
  //   }));
  }



  // checkExistNode(id: number ): boolean
  // {
  //   const noteExists = this._noteService.getNote(id).subscribe(val=>{console.log(val)})
  // }

