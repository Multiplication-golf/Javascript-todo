const fs = require(fs);
export class todo(name) {
  constructor(name,author,type="JSON",path=`TODO/todo_${name}.json`,startdate=Date.now(),newFile=false) {
    this.name = name;
    this.author = author;
    this.startdate = startdate;
    this.path = `TODO/todo_${name}.json`
    if (!newFile) {
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
    fs.writeFile(this.path, {Todos:[],author:this.author,name:this.name,startdate:this.startdate}, options, callback)
    this.fileData = {Todos:[],author:this.author,name:this.name,startdate:this.startdate};
  }
  
  addItem(item,id,name="",startdate="",duedate="") {
    this.fileData.Todos.push({data:item,id:id,name:name,startdate:startdate,duedate:duedate})
  }
  
  deleteItem(id) {
    var deleteItem = this.fileData.Todos.find((item_) => 
      item_.id === id
    )
    if (deleteItem === undfinded) console.log(`No TODOs with the id ${id} found`);
    this.fileData.Todos = this.fileData.Todos.splice(this.fileData.Todos.indexOf(deleteItem),1);
  }
  
  flush() {
    fs.writeFile(this.path, this.fileData, function (err) {
      if (err) {
          return console.error(err);
      }
    }
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
  
}
