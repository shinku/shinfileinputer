# 🚀 IT IS A JS MODULE USED IN WEB BROWER

select or access a local file without uploading file or files to remote.
with this api,you can access one or some local files ,and get formate of ```base64/arraybuffer/text``` of files you have selected

HOW TO INSTALL
```javascript
yarn add shinfileinputer

OR

yarn add git+https://github.com/shinku/shinfileinputer.git
```
HOW TO USE

```typescript
import shinfileinputer,{OUTOUTTYPE} from "shinfileinputer";
const inputer = new shinfileinputer();
inputer.start("*",[OUTOUTTYPE.BASE64]).then(res=>{
    console.log({res});
    //you will get a array of base64, 
}
```
FUNCTIONS
```typescript
construncor(ismultiple:Boolean=false){
    //
}
//const inputer = new shinfileinput();
```
params | type |  ps|  
-|-|-
ismultiple | boolean | choose multiple files or just single file.default is false |

```typescript
start(accepts:string,outputoption:Array<string>):Promise<T>
```
params | type |  ps|  
-|-|-
accepts | string | accepts of a input,such as ```"\*"``` or ```"\*.jppg|*.png"```|
outputoption | Array | default is ```["base64"]``` or ```[OUTOUTTYPE.BASE64]```|
```typescript
setMultiple(val:Boolean):shinfileinput
```
you wann to change single file choosen to multiple
```typescript

inputer.setMultiple(true).start("*“).then(......)
```



OUTOUTTYPE has three types.
+ BASE64
+ TEXT
+ BUFFER
means you will get different kinds of format of these files;

```typescript
import shinfileinput,{OUTOUTTYPE} from "shinfileinputer";
const inputer = new shinfileinputer();
inputer.start("*",[OUTOUTTYPE.BASE64]).then(res=>{
    console.log({res});
    //[{file:File,datas:[{data:xxxxxxx,type:"base64"}]}]
    //get base64content and also you will get the file
}
....
inputer.start("*",[OUTOUTTYPE.BASE64,OUTOUTTYPE.BUFFER]).then(res=>{
    console.log({res});
    //  //[{file:File,datas:[{data:xxxxxxx,type:"base64"},{data:xxxxxxx,type:"arraybuffer"}]}]
    //get base64content and also you will get the file
}

```

EXAMPLE:
choose a image from local and put it into a Image Element

```javascript
import shinfileinput,{OUTOUTTYPE} from "shinfileinputer";
const inputer = new shinfileinput();
inputer.start("image/gif, image/jpeg",[OUTOUTTYPE.BASE64]).then(res=>{
    //console.log({res});
    let {datas} = res[0];
    const image = new Image();
    image.src = datas[0]['data'];
    document.body.appendChild(image);
}

```
