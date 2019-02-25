import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { type } from 'os';
import { text } from '@angular/core/src/render3/instructions';
 
@Injectable()
export class AlertService {
    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;
    mensaje : any;
    constructor(private router: Router) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.subject.next();
                }
            }
        });
    }
 
    success(message: string, keepAfterNavigationChange = false) {
        
        this.mensaje=message;
        console.log("success-------"+message);
        
        this.subject.next({ type: 'success', text: this.mensaje });
    }
 
    error(message: string, keepAfterNavigationChange = false) {
        
        this.mensaje=message;
        
        this.subject.next({ type: 'error', text: this.mensaje });
    }
 
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
    
}