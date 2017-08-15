import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tag-item',
  templateUrl: './tag-item.component.html',
  styleUrls: ['./tag-item.component.css']
})
export class TagItemComponent implements OnInit {

  @Input() tag;
  @Input() index;
  @Input() removeCallback: Function;
  @Input() tagEditCallback: Function;
  @Input() displayProperty;
  @Input() readonlyIndex: number;

  isEditable: boolean = false;
  currentTag: any;
  hasError: boolean = false;

  constructor() { }

  ngOnInit() {
    this.currentTag = this.tag[this.displayProperty];

  }

  removeTag(index: number): void{
    this.removeCallback(index);
  }

  setEditable = () => {
    if(this.index == this.readonlyIndex) return;
    this.isEditable = true;
  }

  editTag = () => {
      let isValid = this.tagEditCallback(this.currentTag, this.index);
      if(isValid){
        this.isEditable = false;
        this.hasError = false;
      }else{
        this.hasError = true;
      }
  }



}
