import {Component, OnInit, Input} from "@angular/core";
import {TagsService} from "../tags.service";

@Component({
  selector: 'app-custom-tags-input',
  templateUrl: './custom-tags-input.component.html',
  styleUrls: ['./custom-tags-input.component.css'],

})

export class CustomTagsInputComponent implements OnInit {

  @Input() tagList;
  @Input() displayProperty;
  @Input() onTagAdded: Function;
  @Input() onTagRemoved: Function;
  @Input() readonlyIndex: number = -1;

  newTag: string;
  selectedIndex: number = -1;
  regexPattern = /^[a-zA-Z0-9_-]+([='-.a-zA-Z0-9_]+)*@([a-zA-Z0-9](-?[a-zA-Z0-9])*\.)+[a-zA-Z]{2,}$/;
  errorMessage: string = '';


  constructor(private _tagService: TagsService) {
  }

  ngOnInit() {

  }

  addNewTag = () => {
    let obj = {};
    if (!this.newTag || !this.newTag.trim()) return;

    if (!this.isValid(this.newTag)) {
      this.errorMessage = 'Error';
    }
    else {
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
    return this.regexPattern.test(tag);

  }


  removeTag = (index) => {
    let tag = this.tagList[index];
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
    if (this.newTag && this.newTag.trim()) return;
    switch (event.keyCode) {

      case KEYS.comma:
      case KEYS.semicolon:
      case KEYS.space:

        this.addNewTag();

        break;

      case KEYS.delete:
      case KEYS.backspace:

        if (this.selectedIndex > -1 && this.selectedIndex != this.readonlyIndex) {
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
    if (this.selectedIndex == -1) {
      this.selectedIndex = this.tagList.length - 1;
      return;
    }
    ;
    if (this.selectedIndex == this.readonlyIndex) {

      if (this.tagList.length == 1) {
        this.selectedIndex = -1;
        return;
      }
      this.selectedIndex = (this.readonlyIndex == 0) ? this.tagList.length - 1 : --this.selectedIndex;
      return;

    }


  };


  moveRight = () => {

    this.selectedIndex++;

    if (this.selectedIndex == this.tagList.length) {
      this.selectedIndex = 0;
    }

    if (this.selectedIndex == this.readonlyIndex) this.selectedIndex++;


  }


}
