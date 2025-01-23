const fs = require(fs);

function typecheck(ex,varible,par) {
  if (ex !== typeof varible) throw `${par} is exspected to be a ${ex} got ${typeof varible}`
}

export class todo {
  constructor(name,author,type="json",path=`TODO/todo_${name}.json`,startdate=Date.now(),newFile=false) {
    typecheck("string", name ,"name")
    typecheck("string", author ,"author")
    typecheck("number", startdate ,"startdate")
    typecheck("string", type ,"type")
    this.name = name;
    this.author = author;
    this.startdate = startdate; 
    this.type = type
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
    typecheck("string", id ,"id")
    typecheck("string", name ,"name")
    typecheck("string", duedate ,"duedate")
    typecheck("string", startdate ,"startdate")
    this.fileData.Todos.push({data:item,id:id,name:name,startdate:startdate,duedate:duedate,priority:priority})
  }
  
  deleteItem(id) {
    typecheck("string", id ,"id")
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

  returnByPriority(priority) {
    var listtep = []
    this.fileData.Todos.forEach((todo)=>{
      if (todo.priority !== "") {
        if (todo.priority === priority) {
          listtep.push(todo)
        }
      }
    })
    return listtep
  }

  sortByDate(startDate,endDate) {
    typecheck("string", startDate ,"startDate")
    typecheck("string", endDate ,"endDate")
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
  
  generateTodoFile(location,type,higharcy) {
    var genstr;
    typecheck("string", location ,"location")
    typecheck("string", type ,"type")
    typecheck("object", higharcy ,"higharcy")
    if (type === "md") {
      genstr = ``
      higharcy.forEach((pri) => {
        genstr += "========================\n"
        genstr += "##"+pri
        genstr += "\n========================\n"
        var tempTodos = returnByPriority(pri)
        tempTodos.forEach((todo) => {
          genstr += todo.name+":"+todo.item+"\n\n"
        })
      })
    }
    if (fs.existsSync(`${location}.${type}`)) {
      console.log(`${location}.${type} exsists already are you sure you want to over write it`);
      var input = prompt("yes/no: ");
      if (input === "yes") {
        fs.writeFile(`${location}.${type}`, genstr, function (err) {
        if (err) {
            return console.error(err);
        }
      }
    } else {
      fs.open(`${location}.${type}`, "r+", function (err, fd) {
        if (err) throw err
        console.log("a new TODO file has been created");
      });
      fs.writeFile(`${location}.${type}`, genstr, function (err) {
      if (err) {
          return console.error(err);
      }
        console.log(genstr)
    })
    }

  }
}
