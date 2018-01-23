class FsSimulator {
  constructor(files={}) {
    this.files=files;
  }
  addFile(file){
    this.files[file.name]=file.content;
    return this;
  }
  existsSync(path){
    return this.files[path]?true:false;
  }
  readFileSync(path){
    return this.files[path];
  }
}
module.exports=new FsSimulator();
