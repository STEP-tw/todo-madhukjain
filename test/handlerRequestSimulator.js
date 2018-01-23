const request = function(handler,req,onComplete){
  const res_headers = {};
  let res_contents = "";
  const res={
    end:() => {
      res.finished = true;
      const result = {
        statusCode:res.statusCode||200,
        headers:res_headers,
        body:res_contents
      };
      onComplete(result);
    },
    redirect:(location) => {
      res_headers['location']=location;
      res.statusCode=302;
      res.end();
    },
    setHeader:(key,value) => res_headers[key] = value,
    write:(text) => res_contents+=text
  };
  handler(req,res);
};
module.exports = request;
