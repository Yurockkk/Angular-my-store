import { Directive, ElementRef, Renderer2, HostListener, HostBinding } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective{
    
    @HostBinding('class.open') isOpen: boolean = false;

    @HostListener('click') toggleOplen(){
        this.isOpen = !this.isOpen;
    }
    constructor(private elementRef: ElementRef){}
    
}