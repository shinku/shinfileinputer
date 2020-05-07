# 🚀 IT IS A JS MODULE USED IN WEB BROWER

select or access a local file without uploading file or files to remote.
with this api,you can access a or some local files ,and get formate of ```base64/arraybuffer/text``` of these files;

HOW TO INSTALL
```
yarn add shinfileinput
```
HOW TO USE

```
import shinfileinput,{OUTOUTTYPE} from "shinfileinput";
const inputer = new shinfileinput();
inputer.start("*",[OUTOUTTYPE.BASE64]).then(res=>{
    console.log({res});
    //you will get a array,
}
```
FUNCTIONS
```
construncor(ismultiple:Boolean=false){
    //
}
//const inputer = new shinfileinput();
```
params | type |  ps|  
-|-|-
ismultiple | boolean | choose multiple files or just single file.default is false |

```javascript
start(accepts:string,outputoption:Array<string>):Promise<T>
```
params | type |  ps|  
-|-|-
accepts | string | accepts of a input,such as ```"\*"``` or ```"\*.jppg|*.png"```|
outputoption | Array | default is ```["base64"]``` or ```[OUTOUTTYPE.BASE64]```|
```javascript
setMultiple(val:Boolean):shinfileinput
```
if you want to change Multiple to single
```
inputer.setMultiple(false).start("*“).then(......)
```



OUTOUTTYPE has three types.
+ BASE64
+ TEXT
+ BUFFRR
means you will get different kinds of content of these files;

```javascript
import shinfileinput,{OUTOUTTYPE} from "shinfileinput";
const inputer = new shinfileinput();
inputer.start("*",[OUTOUTTYPE.BASE64]).then(res=>{
    console.log({res});
    //[{data:"....",type:"base64"},......]
    //get base64content
}
....
inputer.start("*",[OUTOUTTYPE.BASE64,OUTOUTTYPE.BUFFER]).then(res=>{
    console.log({res});
    //[[{data:"....",type:"base64"},{data:"....",type:"arraybuffer"}}],......]
    //get base64 content and ArrayBuffer content
}

```


