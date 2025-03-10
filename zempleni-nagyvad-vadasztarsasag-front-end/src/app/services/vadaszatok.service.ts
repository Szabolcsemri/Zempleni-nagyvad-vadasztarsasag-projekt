import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class vadaszatservice {
    private apiURL = "http://localhost:5000/vadaszatok";
    constructor(private http: HttpClient) {}

    getfoglalhatovadaszatok(): Observable<any> {
        return this.http.get<any>(this.apiURL);
    }

    foglalVadaszat(helyszinId: number, vadfajId: number, kezdoDatum: string, zaroDatum: string): Observable<any> {
      const token = localStorage.getItem("token"); 
      if (!token) {
          throw new Error("Nincs bejelentkezett felhasználó.");
      }
      
      const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);


      const foglalas = {
          helyszin_id: helyszinId,
          vadfaj_id: vadfajId,
          kezdete: kezdoDatum,
          vege: zaroDatum
      };

      return this.http.post<any>(this.apiURL, foglalas, { headers });
  }
  foglalasAllapot(vadaszatId: number): Observable<{ csatlakozott: boolean }> {
    const token = localStorage.getItem("token");
    if (!token){
      return new Observable(observer => observer.next({ csatlakozott: false }));
    }
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.http.get<{ csatlakozott: boolean }>(`${this.apiURL}/${vadaszatId}/csatlakozas`, { headers });
  }

  csatlakozas(vadaszatId: number): Observable<any> {
    const token = localStorage.getItem("token");
    if (!token){
      throw new Error("Nincs bejelentkezett felhasználó.");
    }
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.http.post<any>(`${this.apiURL}/${vadaszatId}/csatlakozas`, {}, { headers });
  }
  
  lecsatlakozas(vadaszatId: number): Observable<any> {
    const token = localStorage.getItem("token");
    if (!token){
      throw new Error("Nincs bejelentkezett felhasználó.");
    }
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.http.delete(`${this.apiURL}/${vadaszatId}/csatlakozas`, { headers });
  }
  vadaszatTorlesAdmin(vadaszatId: number): Observable<any>{
    const token = localStorage.getItem("token");
    if (!token){
      throw new Error("Nincs bejelentkezett felhasználó.");
    }
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.http.delete(`${this.apiURL}/${vadaszatId}`, { headers });
  }
}
