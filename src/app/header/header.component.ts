import { Component, Output, EventEmitter, ElementRef, ViewChild } from "@angular/core";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html"
})

export class HeaderComponent{
    @Output() userSelected = new EventEmitter<string>();

    onUserClicked(feature: string){
        console.log(feature);        
       this.userSelected.emit(feature);
    }
}