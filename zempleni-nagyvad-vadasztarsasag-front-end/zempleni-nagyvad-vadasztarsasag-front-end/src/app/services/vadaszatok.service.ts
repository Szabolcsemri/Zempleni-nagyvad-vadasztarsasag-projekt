import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
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
}