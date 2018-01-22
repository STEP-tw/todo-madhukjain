let request = function(handler,req,onComplete){
  let res_headers = {};
  let res_contents = "";
  let res={
    end:()=>{
      res.finished = true;
      let result = {
        statusCode:res.statusCode||200,
        headers:res_headers,
        body:res_contents
      };
      onComplete(result);
    },
    redirect:(location)=>{
      res_headers['location']=location;
      res.statusCode=302;
      res.end();
    },
    setHeader:(key,value)=> res_headers[key] = value,
    write:(text)=>res_contents+=text
  };
  handler(req,res);
}
module.exports = request;
