const fs = require(fs);
export class todo {
  constructor(name,author,type="json",path=`TODO/todo_${name}.json`,startdate=Date.now(),newFile=false) {
    this.name = name;
    this.author = author;
    this.startdate = startdate; 
    this.type = json
    this.path = `TODO/todo_${name}.${type}`
    if (newFile) {
      fs.readFile("users.json", function (err, data) {
        if (err) throw err;
        data = JSON.parse(data);
        this.fileData = data;
      });
    } else {
      this.fileData = {Todos:[],author:this.author,name:this.name,startdate:this.startdate};
    }
  }
  
  startUp() {
    fs.open(this.path, "r+", function (err, fd) {
      if (err) throw err
      console.log("a new TODO file has been created");
    });
    fs.writeFile(this.path, {Todos:[],author:this.author,name:this.name,startdate:this.startdate})
    this.fileData = {Todos:[],author:this.author,name:this.name,startdate:this.startdate};
  }
  
  addItem(item,id,name="",startdate="",duedate="",priority="low") {
    this.fileData.Todos.push({data:item,id:id,name:name,startdate:startdate,duedate:duedate,priority:priority})
  }
  
  deleteItem(id) {
    var deleteItem = this.fileData.Todos.find((item_) => 
      item_.id === id
    )
    if (deleteItem === undefined) console.log(`No TODOs with the id ${id} found`);
    this.fileData.Todos = this.fileData.Todos.splice(this.fileData.Todos.indexOf(deleteItem),1);
  }
  
  flush() {
    fs.writeFile(this.path, this.fileData, function (err) {
      if (err) {
          return console.error(err);
      }
    })
  }
  
  getFullTodos() {
    console.log(this.fileData.Todos)
  }
  
  getInfo() {
    console.log(this.name)
    console.log(this.author)
    console.log(this.startdate)
    console.log(this.path)
  }

  getOverdueTodos() {
    this.fileData.Todos.forEach((todo)=>{
      if (todo.duedate !== "") {
        if (todo.duedate < Date.now()) {
          console.log(`${todo} , is ${(Date.now() - todo.duedate)/6000} minutes late`)
        }
      }
    })
  }
  
  sortByPriority(priority) {
    this.fileData.Todos.forEach((todo)=>{
      if (todo.priority !== "") {
        if (todo.priority === priority) {
          console.log(`${todo}`)
        }
      }
    })
  }

  sortByDate(startDate,endDate) {
    let myDate = startDate.split("/");
    var newDate = new Date( myDate[2], myDate[1] - 1, myDate[0]);
    let myDate = endDate.split("/");
    var newDate2 = new Date( myDate2[2], myDate2[1] - 1, myDate2[0]);
    this.fileData.Todos.forEach((todo)=> {
      if (newDate < todo.startdate && todo.startdate < newDate2) {
        console.log(`${todo}`)
      }
    })
  }
}
