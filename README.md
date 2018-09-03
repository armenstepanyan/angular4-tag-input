# custom-tags-input

Custom tags-input component angular2+

 
### Installation ###
* git clone https://github.com/armenstepanyan/angular4-tag-input.git
* npm install

### Run ###
`ng serve --open`


### Avaible keys ###

* Left, Right arrows to select item
* Delete, BackSpace to delete selected item
* Double click on item for editing

# Usage
```sh
<ul>
  <li *ngFor="let tag of tags">
    {{ tag.email }}
  </li>
</ul>

<hr/>

<div style="width: 700px;">

  <app-custom-tags-input
              *ngIf="tags"
              [tagList]="tags"
              displayProperty = "email"
              [onTagAdded] = "onTagAdded"
              [onTagRemoved] = "onTagRemoved"
              [readonlyIndex] = "0"
              [regex]="regex"
  >

  </app-custom-tags-input>
</div>
```

  - tags           - tag array to display
  - readonlyIndex   - disabled tag index, default -1
  - displayProperty - tag object key (e.g. {id: 1, email: 'test@gmail.com'} )
  - onTagRemoved    - callback function on tag remove
  - onTagAdded      - callback function after tag added
  - regex           - reqular expression to validate new added tags by pattern, empty - means add without validation

#app.component

 ```code
 export class AppComponent {
 
 
 
   tags = [
     {
       id: 1,
       email: 'aaa@gmail.com'
     },
     {
       id: 2,
       email: 'bbb@gmail.com'
     }
   ];
 
   regex = /^[a-zA-Z0-9_-]+([='-.a-zA-Z0-9_]+)*@([a-zA-Z0-9](-?[a-zA-Z0-9])*\.)+[a-zA-Z]{2,}$/;
 
 
   onTagAdded = (tag) => {
     console.log(tag)
   }
 
   onTagRemoved = (tag) => {
     console.log(tag)
   }
 
 
 }

 ``` 
 