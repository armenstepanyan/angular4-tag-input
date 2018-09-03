import {Component, OnInit, Input, ViewChild, Renderer, AfterViewInit, ElementRef} from '@angular/core';
import {TagsService} from '../tags.service';

@Component({
    selector: 'app-custom-tags-input',
    templateUrl: './custom-tags-input.component.html',
    styleUrls: ['./custom-tags-input.component.css'],

})

export class CustomTagsInputComponent implements OnInit, AfterViewInit {

    @Input() tagList;
    @Input() displayProperty;
    @Input() onTagAdded: Function;
    @Input() onTagRemoved: Function;
    @Input() readonlyIndex: number = -1;
    @Input() regex;

    @ViewChild('input') vc: ElementRef;

    newTag: string;
    selectedIndex: number = -1;
    errorMessage: string;


    constructor(private _tagService: TagsService, private renderer: Renderer) {
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.vc.nativeElement, 'focus');

    }

    onSelectedIndexChange(val: number) {
        this.selectedIndex = -1;
    }

    addNewTag = () => {
        const obj = {};
        if (!this.newTag || !this.newTag.trim()) {
            return
        }

        if (!this.isValid(this.newTag)) {
            this.errorMessage = 'Error';
        } else {
            this.errorMessage = '';
            obj[this.displayProperty] = this.newTag;
            this.tagList.push(obj);

            if (this.onTagAdded) {
                this.onTagAdded(obj);
            }

            this.newTag = '';
        }


    }

    isValid = (tag) => {
        return this.regex ? this.regex.test(tag) : true;

    }


    removeTag = (index) => {
        const tag = this.tagList[index];
        this.tagList.splice(index, 1);
        if (this.onTagRemoved) {
            this.onTagRemoved(tag)
        }
        this.selectedIndex = -1;
    }

    onTagEdit = (tagValue: any, index: number) => {

        if (!this.isValid(tagValue)) {
            this.errorMessage = 'Error';
            return false;
        } else {
            this.tagList[index][this.displayProperty] = tagValue;
            this.errorMessage = '';
            return true;
        }


    }


    onKeyDown = (event) => {
        const KEYS = this._tagService.getHotKeys();
        this.errorMessage = '';
        if (this.newTag && this.newTag.trim()) {
            return
        }
        ;
        switch (event.keyCode) {

            case KEYS.comma:
            case KEYS.semicolon:
            case KEYS.space:

                this.addNewTag();

                break;

            case KEYS.delete:
            case KEYS.backspace:

                if (this.selectedIndex > -1 && this.selectedIndex !== this.readonlyIndex) {
                    this.deletedSelectedTag();
                } else {
                    this.selectedIndex = this.tagList.length - 1;
                }


                break;

            case KEYS.up:
                this.selectedIndex = -1;
                break;

            case KEYS.down:
                this.selectedIndex = -1;
                break;

            case KEYS.left:
                this.moveLeft();
                break;

            case KEYS.right:
                this.moveRight();
                break;

        }


    }


    deletedSelectedTag = () => {
        this.removeTag(this.selectedIndex);
        this.selectedIndex = -1;
    }

    moveLeft = () => {

        if (this.selectedIndex < 0) {
            this.selectedIndex = this.tagList.length - 1;
            return;
        }
        this.selectedIndex--;
        if (this.selectedIndex === -1) {
            this.selectedIndex = this.tagList.length - 1;
            return;
        }

        if (this.selectedIndex === this.readonlyIndex) {

            if (this.tagList.length === 1) {
                this.selectedIndex = -1;
                return;
            }
            this.selectedIndex = (this.readonlyIndex === 0) ? this.tagList.length - 1 : --this.selectedIndex;
            return;

        }


    };


    moveRight = () => {

        this.selectedIndex++;

        if (this.selectedIndex === this.tagList.length) {
            this.selectedIndex = 0;
        }

        if (this.selectedIndex === this.readonlyIndex) {
            this.selectedIndex++
        }
        ;


    }


}
