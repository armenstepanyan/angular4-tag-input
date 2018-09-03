import {Component, OnInit, Input, Output, ViewChild, Renderer, AfterViewInit, ElementRef, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-tag-item',
    templateUrl: './tag-item.component.html',
    styleUrls: ['./tag-item.component.css']
})
export class TagItemComponent implements OnInit, AfterViewInit {

    @Input() tag;
    @Input() index;
    @Input() removeCallback: Function;
    @Input() tagEditCallback: Function;
    @Input() displayProperty;
    @Input() readonlyIndex: number;

    @Output() onSelectedIndexChange = new EventEmitter<number>();

    @ViewChild('editInput') editInput: ElementRef;

    isEditable = false;
    currentTag: any;
    hasError = false;

    constructor() {
    }

    ngOnInit() {
        this.currentTag = this.tag[this.displayProperty];

    }

    ngAfterViewInit() {
    }

    removeTag(index: number): void {
        this.removeCallback(index);
    }

    setEditable = () => {
        if (this.index === this.readonlyIndex) {
            return
        }
        this.isEditable = true;
        setTimeout(() => {
            this.editInput.nativeElement.querySelector('input').focus();
        }, 10);
        this.onSelectedIndexChange.emit(-1);
    }

    editTag = () => {
        const isValid = this.tagEditCallback(this.currentTag, this.index);
        if (isValid) {
            this.isEditable = false;
            this.hasError = false;
        } else {
            this.hasError = true;
        }
    }


}
