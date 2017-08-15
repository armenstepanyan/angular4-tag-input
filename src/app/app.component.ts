import {Component} from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
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


  onTagAdded = (tag) => {
    console.log(tag)
  }

  onTagRemoved = (tag) => {
    console.log(tag)
  }



}
